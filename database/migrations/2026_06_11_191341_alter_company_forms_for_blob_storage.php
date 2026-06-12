<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('company_forms', function (Blueprint $table) {
            if (!Schema::hasColumn('company_forms', 'file_type')) {
                $table->string('file_type')->nullable()->after('file_name');
            }
            if (!Schema::hasColumn('company_forms', 'file_size')) {
                $table->unsignedBigInteger('file_size')->nullable()->after('file_type');
            }
            if (!Schema::hasColumn('company_forms', 'file_data')) {
                $table->binary('file_data')->nullable()->after('file_size');
            }
            if (Schema::hasColumn('company_forms', 'file_path')) {
                $table->dropColumn('file_path');
            }
        });
    }

    public function down(): void
    {
        Schema::table('company_forms', function (Blueprint $table) {
            $table->string('file_path')->nullable();

            $table->dropColumn([
                'file_type',
                'file_size',
                'file_data'
            ]);
        });
    }
};
