<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OutSourcingErf extends Model
{
    use HasFactory;
    protected $table = 'outsourcing_erf';
    protected $fillable = [
        'user_id',
        'ref_id',
        'jobTitle',
        'jobType',
        'personnel',
        'dateNeed',
        'positionStatus',
        'department',
        'sourcingMethod',
        'justification',
        'budgetCost',
        'submitted',
        'status',
        'site',
        'decided',
    ];
}
