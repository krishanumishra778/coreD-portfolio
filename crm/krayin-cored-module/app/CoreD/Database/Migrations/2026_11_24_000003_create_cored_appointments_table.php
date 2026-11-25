<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cored_appointments', function (Blueprint $table) {
            $table->id();
            $table->string('request_id', 64)->unique();
            $table->unsignedInteger('person_id')->nullable()->index();
            $table->unsignedInteger('lead_id')->nullable();
            $table->unsignedInteger('activity_id')->nullable();
            $table->dateTime('starts_at');                    // UTC
            $table->dateTime('ends_at');                      // UTC
            $table->string('timezone', 64);
            $table->string('service', 120);
            $table->string('channel', 24);
            $table->text('message')->nullable();
            $table->string('status', 16)->default('requested'); // requested | confirmed | cancelled
            $table->string('meet_url', 255)->nullable();        // only set after Calendar integration is verified
            // Unique while the slot is held; NULL when cancelled, so a freed slot can be re-booked.
            $table->string('active_slot', 32)->nullable()->unique();
            $table->boolean('is_demo')->default(false);
            $table->timestamps();
            $table->index(['status', 'starts_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cored_appointments');
    }
};
