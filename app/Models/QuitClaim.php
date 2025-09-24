<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuitClaim extends Model
{
    use HasFactory;
    protected $table = 'quit_claims';
    public $timestamps = false;
    protected $fillable = [
        'app_id',
        'emp_id',
        'file',
        'status',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, "emp_id", "emp_id");
    }
}
