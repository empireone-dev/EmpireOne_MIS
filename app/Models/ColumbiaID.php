<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColumbiaID extends Model
{
    use HasFactory;
    protected $fillable = [
        'app_id',
        'govt_id',
        'id_number',
    ];
}
