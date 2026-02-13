<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class OutSourcingErf extends Model
{
    use HasFactory;
    protected $table = 'outsourcing_erf';
    public $timestamps = false;
    protected $fillable = [
        'user_id',
        'ref_id',
        'jobTitle',
        'jobType',
        'personnel',
        'dateNeed',
        'positionStatus',
        'department',
        'account',
        'sourcingMethod',
        'justification',
        'budgetCost',
        'submitted',
        'status',
        'site',
        'reason',
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class, "id", "user_id");
    }

    public function ja(): HasOne
    {
        return $this->hasOne(ERFJa::class, "ref_id", "ref_id");
    }
    public function jd(): HasOne
    {
        return $this->hasOne(ERFJd::class, "ref_id", "ref_id");
    }
}
