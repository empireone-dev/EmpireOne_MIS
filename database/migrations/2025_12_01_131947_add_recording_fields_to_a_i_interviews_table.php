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
        Schema::table('a_i_interviews', function (Blueprint $table) {
            $table->integer('duration')->nullable()->after('file'); // Duration in seconds
            $table->string('file_size')->nullable()->after('duration'); // File size in bytes
            $table->string('file_type')->nullable()->after('file_size'); // MIME type
            $table->timestamp('interview_date')->nullable()->after('file_type'); // When interview was conducted
            $table->json('metadata')->nullable()->after('interview_date'); // Additional recording metadata
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('a_i_interviews', function (Blueprint $table) {
            $table->dropColumn(['duration', 'file_size', 'file_type', 'interview_date', 'metadata']);
        });
    }
};
