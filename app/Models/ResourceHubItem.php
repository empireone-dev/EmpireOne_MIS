<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResourceHubItem extends Model
{
    use HasFactory;

    protected $table = 'resource_hub_items';

    protected $fillable = [
        'name',
        'description',
        'url',
        'category',
        'color',
    ];
}
