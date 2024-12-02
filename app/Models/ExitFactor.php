<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExitFactor extends Model
{
    use HasFactory;
    protected $table = 'ext_factor';
    public $timestamps = false;
    protected $fillable = [
        'app_id',
        'factors',
    ];
}
