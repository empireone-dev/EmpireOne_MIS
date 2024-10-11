<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ERFJd extends Model
{
    use HasFactory;
    protected $table = 'erf_jd';
    public $timestamps = false;
    protected $fillable = [
        'jobTitle',
        'erf_id',
        'ref_id',
        'content',
        'site'
    ];
}
