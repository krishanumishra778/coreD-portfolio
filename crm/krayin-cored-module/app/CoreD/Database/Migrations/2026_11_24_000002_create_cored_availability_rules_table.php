<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cored_availability_rules', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('weekday');           // 0=Sunday .. 6=Saturday
            $table->time('start_time');
            $table->time('end_time');
            $table->unsignedSmallInteger('slot_minutes')->default(30);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_demo')->default(false);       // demo rows are replaced once the owner confirms hours
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cored_availability_rules');
    }
};
