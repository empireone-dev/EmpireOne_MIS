<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UploadMemo extends Model
{
    use HasFactory;
    protected $table = 'emp_memo';
    protected $fillable = [
        'memo_title',
        'memo_desc',
        'site',
    ];
}
