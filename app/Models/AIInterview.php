<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AIInterview extends Model
{
    use HasFactory;
    protected $table = 'a_i_interviews';
    public $timestamps = true; 
    protected $fillable = [
        'app_id',
        'file',
        'duration',
        'file_size',
        'file_type',
        'interview_date',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'array',
        'interview_date' => 'datetime',
    ];
}
