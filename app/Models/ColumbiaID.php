<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColombiaID extends Model
{
    use HasFactory;
    protected $fillable = [
        'app_id',
        'govt_id',
        'id_number',
    ];
}
