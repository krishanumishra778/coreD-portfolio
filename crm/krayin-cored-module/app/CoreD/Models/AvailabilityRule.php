<?php

namespace App\CoreD\Models;

use Illuminate\Database\Eloquent\Model;

class AvailabilityRule extends Model
{
    protected $table = 'cored_availability_rules';

    protected $guarded = [];

    protected $casts = ['is_active' => 'boolean', 'is_demo' => 'boolean'];
}
