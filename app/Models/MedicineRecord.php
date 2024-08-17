<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicineRecord extends Model
{
    use HasFactory;
    protected $table = 'medicine_records';
    public $timestamps = false;
    protected $fillable = [
        'medicine',
        'med_type',
        'med_desc',
        'site',
    ];
}
