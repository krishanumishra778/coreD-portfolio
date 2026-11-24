<?php

namespace App\CoreD\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

/** Notification e-mail (replaces the Formspree inbox notification). Never blocks or fails an intake. */
class IntakeNotifier
{
    /** @return string|null null on success, otherwise a short reason code */
    public function send(string $sourceName, array $d, int $leadId, string $status, string $summary): ?string
    {
        $to = config('cored.notify_to');
        if (! $to) {
            return 'disabled';
        }
        try {
            $url = rtrim((string) config('app.url'), '/').'/'.trim((string) config('app.admin_path'), '/').'/leads/view/'.$leadId;
            $body = ($status === 'duplicate' ? "Repeat submission from the same e-mail address (added to the existing lead).\n\n" : '')
                .$summary."\n\nOpen in the CRM: ".$url."\n";
            Mail::raw($body, function ($m) use ($to, $d, $sourceName) {
                $m->to($to)->replyTo($d['email'], $d['name'])->subject('[CoreD CRM] '.$sourceName.': '.mb_substr($d['name'], 0, 60));
            });

            return null;
        } catch (\Throwable $e) {
            Log::warning('cored.intake.notify_failed', ['lead_id' => $leadId, 'error' => class_basename($e)]);

            return 'send_failed';
        }
    }
}
