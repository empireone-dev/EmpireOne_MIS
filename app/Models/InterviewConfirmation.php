<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class InterviewConfirmation extends Model
{
    use HasFactory;
    protected $table = 'interview_confirmations';
    public $timestamps = false;
    protected $fillable = [
        'app_id',
        'initial',
        'final',
    ];

    public function applicant(): HasOne
    {
        return $this->hasOne(Applicant::class, "app_id", "app_id");
    }
}
