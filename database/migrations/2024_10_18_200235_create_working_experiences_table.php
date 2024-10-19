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
        Schema::create('working_experiences', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('app_id')->nullable();
            $table->string('company')->nullable();
            $table->string('position')->nullable();
            $table->string('started_at')->nullable();
            $table->string('end_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('working_experiences');
    }
};
