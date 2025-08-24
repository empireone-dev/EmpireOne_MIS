<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class EmployeeAttrition extends Model
{
    use HasFactory;
    protected $table = 'emp_attrition';
    public $timestamps = false;
    protected $fillable = [
        'app_id',
        'emp_id',
        'position',
        'dept',
        'account',
        'sup_id',
        'eogs',
        'hired',
        'status',
        'estatus',
        'reas',
        'separation',
        'exitc',
    ];

    public function applicant(): HasOne
    {
        return $this->hasOne(Applicant::class, "app_id", "app_id");
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, "emp_id", "emp_id");
    }

    public function quit_claim(): HasOne
    {
        return $this->hasOne(QuitClaim::class, "emp_id", "emp_id");
    }
}
