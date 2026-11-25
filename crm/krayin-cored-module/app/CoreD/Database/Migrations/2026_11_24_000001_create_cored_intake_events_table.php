<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cored_intake_events', function (Blueprint $table) {
            $table->id();
            $table->string('request_id', 64)->unique();      // client idempotency key
            $table->string('kind', 24);                       // contact | quote | faq_chatbot | booking
            $table->string('source_name', 80);
            $table->char('email_hash', 64)->index();          // sha256(lower(email)) - no raw email duplicated here
            $table->unsignedInteger('person_id')->nullable();
            $table->unsignedInteger('lead_id')->nullable();
            $table->boolean('is_duplicate')->default(false);
            $table->json('payload')->nullable();             // sanitized submission (no Turnstile token, no honeypot)
            $table->timestamp('consent_at')->nullable();
            $table->string('consent_version', 32)->nullable();
            $table->timestamp('notified_at')->nullable();
            $table->string('notify_error', 40)->nullable();
            $table->timestamp('submitted_at')->nullable();   // original submission time (differs from created_at for imports)
            $table->boolean('is_import')->default(false);
            $table->timestamps();
            $table->index(['email_hash', 'kind', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cored_intake_events');
    }
};
