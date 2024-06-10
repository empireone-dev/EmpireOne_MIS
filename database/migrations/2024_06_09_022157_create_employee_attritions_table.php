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
        Schema::create('employee_attritions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('app_id')->unique();
            $table->bigInteger('emp_id')->unique();
            $table->string('position')->nullable();
            $table->string('dept')->nullable();
            $table->string('account')->nullable();
            $table->bigInteger('sup_id')->nullable();
            $table->string('eogs')->nullable();
            $table->string('hired')->nullable();
            $table->string('status')->nullable();
            $table->string('estatus')->nullable();
            $table->string('reas')->nullable();
            $table->string('separation')->nullable();
            $table->string('exitc')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_attritions');
    }
};
