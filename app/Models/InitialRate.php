<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InitialRate extends Model
{
    use HasFactory;
    protected $table = 'applicant_initial';
    public $timestamps = false;
    protected $fillable = [
        'app_id',
        'interdate',
        'intertime',
        'glink',
        'tscore',
        'tnotes',
        'pscore',
        'pnotes',
        'cscore',
        'cnotes',
        'ocomment',
        'oresult',
        'oavg',
        'otherqs',
        'interviewer',
        'conducted',
    ];
}
