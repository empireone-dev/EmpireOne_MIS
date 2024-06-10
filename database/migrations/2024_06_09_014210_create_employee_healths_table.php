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
        Schema::create('employee_healths', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('emp_id')->unique();
            $table->string('comp')->nullable();
            $table->string('temp')->nullable();
            $table->string('bp')->nullable();
            $table->string('sugar')->nullable();
            $table->string('oxygen')->nullable();
            $table->string('injury')->nullable();
            $table->string('recommend')->nullable();
            $table->string('med_give')->nullable();
            $table->string('site')->nullable();
            $table->string('date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_healths');
    }
};
