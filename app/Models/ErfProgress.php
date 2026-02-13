<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ErfProgress extends Model
{
    use HasFactory;
    protected $fillable = [
        'ref_id',
        'status',
        'remarks',
        'approved_by',
        'date_time',
    ];
}
