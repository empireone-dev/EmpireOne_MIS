<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnboardingDoc extends Model
{
    use HasFactory;
    protected $table = 'onboarding_docs';
    protected $fillable = [
        'doc_name',
        'doc_content',
        'site',
    ];
}
