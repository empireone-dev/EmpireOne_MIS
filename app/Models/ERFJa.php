<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ERFJa extends Model
{
    use HasFactory;
    protected $table = 'erf_ja';
    public $timestamps = false;
    protected $fillable = [
        'jobTitle',
        'erf_id',
        'ref_id',
        'content',
        'site'
    ];
}
