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
        Schema::create('out_sourcing_erves', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unique();
            $table->bigInteger('ref_id')->nullable();
            $table->string('jobTitle')->nullable();
            $table->string('personnel')->nullable();
            $table->string('dateNeed')->nullable();
            $table->string('positionStatus')->nullable();
            $table->string('department')->nullable();
            $table->string('sourcingMethod')->nullable();
            $table->string('justification')->nullable();
            $table->string('budgetCost')->nullable();
            $table->string('submitted')->nullable();
            $table->string('status')->nullable();
            $table->string('site')->nullable();
            $table->string('decided')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('out_sourcing_erves');
    }
};
