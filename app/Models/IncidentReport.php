<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncidentReport extends Model
{
    use HasFactory;
    protected $table = 'incident_report';
    public $timestamps = false;
    protected $fillable = [
        'app_id',
        'emp_id',
        'nte_id',
        'doi',
        'dot',
        'incdetails',
        'incsummary',
        'incact',
        'filedby',
        'fileid',
        'nda_id',
        'site',
        'created',
    ];
}
