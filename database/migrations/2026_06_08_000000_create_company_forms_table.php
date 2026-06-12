<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('company_forms', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();

            $table->string('file_name');
            $table->string('file_type')->nullable();
            $table->unsignedBigInteger('file_size')->nullable();

            $table->binary('file_data')->nullable();

            $table->string('uploaded_by')->nullable();
            $table->unsignedBigInteger('folder_id')->nullable();

            $table->timestamps();
        });

        // Upgrade to LONGBLOB to support files larger than 65KB
        DB::statement('ALTER TABLE company_forms MODIFY file_data LONGBLOB NULL');
    }

    public function down(): void
    {
        Schema::dropIfExists('company_forms');
    }
};