<?php

namespace App\CoreD\Console;

use App\CoreD\Models\IntakeEvent;
use App\CoreD\Services\FormspreeImport;
use App\CoreD\Services\IntakeService;
use Illuminate\Console\Command;

/**
 * Historical Formspree import. DRY RUN BY DEFAULT: reads the export, classifies rows and prints a report; nothing is written to the CRM.
 * A real import needs both --confirm-import and CORED_IMPORT_APPROVED=yes (set only after the owner approves the dry-run report).
 * It never deletes or modifies anything in Formspree or in existing CRM records.
 */
class ImportFormspreeCommand extends Command
{
    protected $signature = 'cored:import-formspree {file : Formspree export (CSV or JSON)} {--confirm-import : write the importable rows to the CRM}';

    protected $description = 'Dry-run (default) or import of a Formspree export into the CRM, keeping original dates and sources.';

    public function handle(IntakeService $intake): int
    {
        $file = $this->argument('file');
        if (! is_file($file) || ! is_readable($file)) {
            $this->error('File not found or unreadable.');

            return self::FAILURE;
        }
        try {
            $rows = FormspreeImport::parse((string) file_get_contents($file), $file);
        } catch (\Throwable $e) {
            $this->error('Could not parse the export: '.$e->getMessage());

            return self::FAILURE;
        }
        ['report' => $report, 'importable' => $importable] = FormspreeImport::analyse($rows);

        // Existing CRM contacts / previously imported rows (read-only lookups)
        $existing = 0;
        $already = 0;
        foreach ($importable as $n) {
            $existing += $this->personExists($n['payload']['email']) ? 1 : 0;
            $already += IntakeEvent::where('request_id', $n['payload']['request_id'])->exists() ? 1 : 0;
        }
        $report['already_in_crm_by_request_id'] = $already;
        $report['importable_emails_matching_existing_crm_contacts'] = $existing;
        $report['mode'] = $this->option('confirm-import') ? 'IMPORT' : 'DRY RUN (nothing written)';

        $dir = storage_path('app/cored');
        @mkdir($dir, 0700, true);
        $path = $dir.'/formspree-import-report-'.date('Ymd-His').'.json';
        file_put_contents($path, json_encode($report, JSON_PRETTY_PRINT));
        $c = $report['counts'];
        $this->line("Mode: {$report['mode']}");
        $this->line("Rows: {$c['total']}  importable: {$c['importable']}  duplicates: {$c['duplicate']}  spam: {$c['spam']}  QA/test: {$c['qa_test']}  invalid: {$c['invalid']}  without date: {$c['no_date']}");
        $this->line("Date range: {$report['first_submission']}  ->  {$report['last_submission']}");
        foreach ($report['importable_by_source'] as $label => $count) {
            $this->line("  $label: $count");
        }
        $this->line("Unique e-mails: {$report['unique_emails_importable']}; already in CRM by request id: $already; e-mails matching existing CRM contacts: $existing");
        $this->line("Report (no personal data, row numbers only): $path");

        if (! $this->option('confirm-import')) {
            $this->info('Dry run only. Nothing was written.');

            return self::SUCCESS;
        }
        if (env('CORED_IMPORT_APPROVED') !== 'yes') {
            $this->error('Refused: CORED_IMPORT_APPROVED=yes is not set. Import only after the dry-run report is approved.');

            return self::FAILURE;
        }
        $made = 0;
        foreach ($importable as $n) {
            $res = $intake->record($n['kind'], $n['payload'], ['submitted_at' => $n['submitted_at'] ?? now(), 'is_import' => true, 'notify' => false, 'window_dedupe' => false]);
            $made += $res['status'] === 'created' ? 1 : 0;
        }
        $this->info("Imported: $made new lead(s) (others were replays). Formspree data was not touched.");

        return self::SUCCESS;
    }

    private function personExists(string $email): bool
    {
        return \Webkul\Contact\Models\Person::query()->whereRaw('LOWER(CAST(emails AS CHAR)) LIKE ?', ['%'.addcslashes($email, '%_\\').'%'])->exists();
    }
}
