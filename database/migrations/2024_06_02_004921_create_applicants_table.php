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
        Schema::create('applicants', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('app_id')->unique();
            $table->string('fname')->nullable();
            $table->string('mname')->nullable();
            $table->string('lname')->nullable();
            $table->string('suffix')->nullable();
            $table->string('dob')->nullable();
            $table->string('caddress')->nullable();
            $table->string('paddress')->nullable();
            $table->string('age')->nullable();
            $table->string('marital')->nullable();
            $table->string('gender')->nullable();
            $table->string('religion')->nullable();
            $table->string('nationality')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('mmname')->nullable();
            $table->string('ffname')->nullable();
            $table->string('educ')->nullable();
            $table->string('courset')->nullable();
            $table->string('sss')->nullable();
            $table->string('tin')->nullable();
            $table->string('philh')->nullable();
            $table->string('pagibig')->nullable();
            $table->string('ename')->nullable();
            $table->string('eaddress')->nullable();
            $table->string('relationship')->nullable();
            $table->string('ephone')->nullable();
            $table->string('status')->nullable();
            $table->string('call_status')->nullable();
            $table->string('site')->nullable();
            $table->string('submitted')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicants');
    }
};
