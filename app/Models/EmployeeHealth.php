<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeHealth extends Model
{
    use HasFactory;
    protected $table = 'emp_health_data';
    public $timestamps = false;
    protected $fillable = [
        'emp_id',
        'comp',
        'temp',
        'bp',
        'sugar',
        'oxygen',
        'injury',
        'recommend',
        'med_give',
        'site',
        'date'
    ];
}
