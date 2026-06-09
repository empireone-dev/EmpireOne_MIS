<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyFormFolder extends Model
{
    use HasFactory;

    protected $table = 'company_form_folders';

    protected $fillable = [
        'name',
        'description',
    ];

    public function forms()
    {
        return $this->hasMany(CompanyForm::class, 'folder_id');
    }
}
