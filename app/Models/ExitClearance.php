<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExitClearance extends Model
{
    use HasFactory;
    protected $table = 'ext_clr';
    public $timestamps = false;
    protected $fillable = [
        'app_id',
        'emp_id',
        'sup_ack',
        'sup_date',
        'sup_pay',
        'dept_ack',
        'dept_date',
        'dept_pay',
        'hr_ack',
        'hr_date',
        'hr_pay',
        'it_ack',
        'it_date',
        'it_pay',
        'assets',
        'ackeys',
        'devices',
        'equipments',
        'ext_inter',
        'ext_status',
        'conductor'
    ];
}
