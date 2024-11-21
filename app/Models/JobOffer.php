<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class JobOffer extends Model
{
    use HasFactory;
    protected $table = 'joboffer';
    public $timestamps = false;
    protected $fillable = [
        'app_id',
        'jobPos',
        'salary',
        'allowance',
        'typea',
        'department',
        'account',
        'status',
        'reas',
        'dcs',
        'tcs',
    ];

    public function applicant(): HasOne
    {
        return $this->hasOne(Applicant::class,"app_id","app_id");
    }
    public function employee(): HasOne
    {
        return $this->hasOne(Employee::class,"app_id","app_id");
    }
}
