<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeEngagement extends Model
{
    use HasFactory;
    protected $table = 'engagement';
    public $timestamps = false;
    protected $fillable = [
        'EventName',
        'EventDesc',
        'DOE',
        'TOE',
        'Status',
        'site',
    ];
}
