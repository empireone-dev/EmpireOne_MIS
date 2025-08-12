<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnboardingDocEditLogs extends Model
{
    use HasFactory;
    protected $table = 'onboarding_doc_edit_logs';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'emp_id',
        'doc_id',
        'name',
    ];
}
