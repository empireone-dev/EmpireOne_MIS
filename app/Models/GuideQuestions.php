<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuideQuestions extends Model
{
    use HasFactory;
    protected $table = 'guideqss';
    public $timestamps = false;
    protected $fillable = [
        'int_id',
        'app_id',
        'guideqs',
        'answer',
    ];
}
