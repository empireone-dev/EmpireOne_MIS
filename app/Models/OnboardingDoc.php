<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnboardingDoc extends Model
{
    use HasFactory;
    protected $table = 'onboarding_docs';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'doc_name',
        'doc_content',
        'site',
    ];

    public function editLogs()
    {
        return $this->hasMany(OnboardingDocEditLogs::class, 'doc_id', 'id')->orderBy('id', 'desc');
    }
}
