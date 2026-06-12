<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyForm extends Model
{
    use HasFactory;

    protected $table = 'company_forms';

    // protected $fillable = [
    //     'title',
    //     'description',
    //     'file_path',
    //     'file_name',
    //     'uploaded_by',
    //     'folder_id',
    // ];

      protected $fillable = [
        'title',
        'description',
        'file_type',
        'file_size',
        'file_data',
        'file_name',
        'uploaded_by',
        'folder_id',
    ];

    protected $hidden = ['file_data'];

    public function folder()
    {
        return $this->belongsTo(CompanyFormFolder::class, 'folder_id');
    }
}
