<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OnboardingAck extends Model
{
    use HasFactory;
    protected $table = 'onboarding_app';
    public $timestamps = false;
    protected $fillable = [
        'app_id',
        'doc_name',
        'doc_id',
        'status',
        // 'site',
    ];

    public function onboardingDoc(): BelongsTo
    {
        return $this->belongsTo(OnboardingDoc::class, "doc_id", "id");
    }

    public function eSignature(): BelongsTo
    {
        return $this->belongsTo(ESignature::class, "app_id", "app_id")->with('applicant');
    }
}
