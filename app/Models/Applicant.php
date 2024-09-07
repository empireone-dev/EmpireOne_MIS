<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Applicant extends Model
{
    use HasFactory;
    protected $table = 'applicant';
    public $timestamps = false;
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

    public function initial(): HasOne
    {
        return $this->hasOne(InitialRate::class,"app_id","app_id");
    }
    public function final(): HasOne
    {
        return $this->hasOne(FinalRate::class,"app_id","app_id");
    }
}
