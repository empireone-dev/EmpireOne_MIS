<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuideQuestion extends Model
{
    use HasFactory;
    protected $table = 'guideq';
    public $timestamps = false;
    protected $fillable = [
        'guideqs',
        'site',
    ];
}
