<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExitRateInt extends Model
{
    use HasFactory;
    protected $table = 'ext_rate_int';
    public $timestamps = false;
    protected $fillable = [
        'int_id',
        'app_id',
        'emp_id',
        'job1',
        'job2',
        'job3',
        'job4',
        'job5',
        'job6',
        'job7',
        'sup1',
        'sup2',
        'sup3',
        'sup4',
        'sup5',
        'sup6',
        'sup7',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "int_id", "id");
    }
}
