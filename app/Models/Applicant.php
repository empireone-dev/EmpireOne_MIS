<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Applicant extends Model
{
    use HasFactory;
    protected $table = 'applicant';
    public $timestamps = false;
    protected $fillable = [
        'app_id',
        'fname',
        'mname',
        'lname',
        'suffix',
        'dob',
        'caddress',
        'paddress',
        'age',
        'marital',
        'gender',
        'religion',
        'nationality',
        'email',
        'phone',
        'mmname',
        'ffname',
        'educ',
        'courset',
        'sss',
        'tin',
        'philh',
        'pagibig',
        'ename',
        'eaddress',
        'relationship',
        'ephone',
        'status',
        'site',
        'submitted',
    ];

    public function initial(): HasOne
    {
        return $this->hasOne(InitialRate::class, "app_id", "app_id");
    }
    public function final(): HasOne
    {
        return $this->hasOne(FinalRate::class, "app_id", "app_id");
    }
    public function joboffer(): HasMany
    {
        return $this->hasMany(JobOffer::class, "app_id", "app_id");
    }
    public function requirements(): HasMany
    {
        return $this->hasMany(PreEmploymentFile::class, "app_id", "app_id");
    }
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, "app_id", "app_id")->with('user');
    }   
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function cvfile(): HasOne
    {
        return $this->hasOne(CVFile::class, "app_id", "app_id");
    }
    public function guideqs(): HasMany
    {
        return $this->hasMany(GuideQuestions::class, "app_id", "app_id");
    }
}
