<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Applicant extends Model
{
    use HasFactory;
    protected $table = 'applicant';
    protected $fillable = [
        'app_id',
        'fname',
        'mname',
        'lname',
        'suffix',
        'dob',
        'caddress',
        'paddress',
        'age',
        'marital',
        'gender',
        'religion',
        'nationality',
        'email',
        'phone',
        'mmname',
        'ffname',
        'educ',
        'courset',
        'sss',
        'tin',
        'philh',
        'pagibig',
        'ename',
        'eaddress',
        'relationship',
        'ephone',
        'status',
        'site',
        'submitted',
    ];
}
