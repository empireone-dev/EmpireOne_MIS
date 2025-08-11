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
        Schema::create('onboarding_doc_edit_logs', function (Blueprint $table) {
            $table->id();
            $table->string('emp_id')->nullable();
            $table->string('name')->nullable();
            $table->string('doc_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('onboarding_doc_edit_logs');
    }
};
