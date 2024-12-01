<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExitInterview extends Model
{
    use HasFactory;
    protected $table = 'ext_int';
    public $timestamps = false;
    protected $fillable = [
        'app_id',
        'emp_id',
        'mreas',
        'facts',
        'factsOther',
        'wish',
        'suggest',
        'apprec',
        'ext_stat'
    ];
}
