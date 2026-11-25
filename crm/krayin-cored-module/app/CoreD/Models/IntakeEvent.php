<?php

namespace App\CoreD\Models;

use Illuminate\Database\Eloquent\Model;

class IntakeEvent extends Model
{
    protected $table = 'cored_intake_events';

    protected $guarded = [];

    protected $casts = ['is_duplicate' => 'boolean', 'is_import' => 'boolean', 'payload' => 'array', 'consent_at' => 'datetime', 'notified_at' => 'datetime', 'submitted_at' => 'datetime'];
}
