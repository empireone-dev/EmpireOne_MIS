<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreEmploymentFile extends Model
{
    use HasFactory;
    protected $table = '201_file';
    public $timestamps = false;
    protected $fillable = [
        'app_id',
        'reqs_img',
        'reqs',
        'status',
        'reas',
        'created'
    ];
}
