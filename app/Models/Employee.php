<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Employee extends Model
{
    use HasFactory;
    protected $table = 'employee';
    public $timestamps = false;
    protected $fillable = [
        'app_id',
        'emp_id',
        'position',
        'dept',
        'account',
        'sup_id',
        'hired',
        'due',
        'eogs',
        'status',
    ];

    public function applicant(): HasOne
    {
        return $this->hasOne(Applicant::class,"app_id","emp_id");
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class,"sup_id","id");
    }
    public function attrition(): BelongsTo
    {
        return $this->belongsTo(Attrition::class,"emp_id","emp_id");
    }
    
}
