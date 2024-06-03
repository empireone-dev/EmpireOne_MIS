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
        Schema::create('job_offers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('app_id')->unique();
            $table->string('jobPos')->nullable();
            $table->string('salary')->nullable();
            $table->string('allowance')->nullable();
            $table->string('typea')->nullable();
            $table->string('department')->nullable();
            $table->string('account')->nullable();
            $table->string('status')->nullable();
            $table->string('reas')->nullable();
            $table->string('dcs')->nullable();
            $table->string('tcs')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_offers');
    }
};
