<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnboardingAck extends Model
{
    use HasFactory;
    protected $table = 'onboarding_app';
    public $timestamps = false;
    protected $fillable = [
        'app_id',
        'doc_name',
        'status',
        // 'site',
    ];
}
