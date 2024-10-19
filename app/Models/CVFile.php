<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CVFile extends Model
{
    use HasFactory;
    protected $table = 'cv_file';
    public $timestamps = false;
    protected $fillable = [
        'app_id',
        'file',
    ];
}
