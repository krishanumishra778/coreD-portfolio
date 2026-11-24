<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cored_cloud_partners', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 80)->unique();
            $table->string('name', 120);
            $table->string('status', 16)->default('draft');     // draft | published
            $table->string('tagline', 255)->nullable();
            $table->text('summary')->nullable();
            $table->string('website_url', 255)->nullable();
            $table->string('affiliate_url', 500)->nullable();   // null until the owner supplies a tracked link
            $table->json('details')->nullable();                // capabilities, pros, cons, steps, metrics[{label,value,verified}]
            $table->json('tags')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(100);
            $table->boolean('is_demo')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->index(['status', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cored_cloud_partners');
    }
};
