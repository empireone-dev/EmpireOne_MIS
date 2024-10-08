<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class JobPosition extends Model
{
    use HasFactory;
    protected $table = 'job_position';
    public $timestamps = false;
    protected $fillable = [
        'jPosition',
        'salary',
        'status',
        'site',
        'ref_id',
    ];

    public function outsourcing_erf(): HasOne
    {
        return $this->hasOne(OutSourcingErf::class, "ref_id", "ref_id");
    }
}
