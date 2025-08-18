<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UploadExitClearance extends Model
{
    use HasFactory;
    protected $table = 'upload_exit_clearances';
    public $timestamps = false;
    protected $fillable = [
        'app_id',
        'emp_id',
        'file',
    ];

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, "emp_id", "emp_id");
    }
}
