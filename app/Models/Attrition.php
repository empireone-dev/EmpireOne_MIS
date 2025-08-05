<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Attrition extends Model
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
        'hired',
        'status',
        'estatus',
        'reas',
        'eogs',
        'separation',
        'exitc',
        'created',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "sup_id", "id");
    }

    public function applicant(): BelongsTo
    {
        return $this->belongsTo(Applicant::class, "app_id", "app_id");
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, "emp_id", "emp_id");
    }
}
