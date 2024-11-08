<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Department extends Model
{
    use HasFactory;
    protected $table = 'department';
    public $timestamps = false;
    protected $fillable = [
        'dept',
        'depthead',
        'site'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "id", "depthead");
    }
}
