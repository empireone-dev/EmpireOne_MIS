<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payroll101 extends Model
{
    use HasFactory;

    protected $fillable = [
        'emp_id',
        'emp_name',
        'signature',
        'acknowledged_at',
    ];
}
