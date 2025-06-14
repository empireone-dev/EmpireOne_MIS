<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VideoQuiz extends Model
{
    use HasFactory;
    protected $table = 'video_quiz';
    public $timestamps = false;
    protected $fillable = [
        'emp_id',
        'name',
        'email',
        'type'
    ];
}
