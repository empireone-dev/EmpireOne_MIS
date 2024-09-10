<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinalRate extends Model
{
    use HasFactory;
    protected $table = 'applicant_final';
    public $timestamps = false;
    protected $fillable = [
        'app_id',
        'interdate',
        'intertime',
        'glink',
        'cscore',
        'cnotes',
        'wscore',
        'wnotes',
        'ocomment',
        'oresult',
        'oavg',
        'interviewer',
        'conducted',
    ];
}
