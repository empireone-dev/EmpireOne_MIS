<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ESignature extends Model
{
    use HasFactory;
    protected $fillable = [
        'app_id',
        'signature',
    ];

    public function applicant(): BelongsTo
    {
        return $this->belongsTo(Applicant::class, "app_id", "app_id");
    }
}
