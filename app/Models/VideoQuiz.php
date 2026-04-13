<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class VideoQuiz extends Model
{
    use HasFactory;
    protected $table = 'video_quiz';
    public $timestamps = false;
    protected $fillable = [
        'emp_id',
        'name',
        'email',
        'type'
    ];

    public function employees(): HasOne
    {
        return $this->hasOne(Employee::class, 'emp_id', 'emp_id')->with('applicant');
    }
    
}
