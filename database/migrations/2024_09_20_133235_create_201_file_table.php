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
        Schema::create('201_file', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('jo_id')->unique();
            $table->bigInteger('app_id')->unique();
            $table->string('reqs')->nullable();
            $table->string('reqs_img')->nullable();
            $table->string('status')->nullable();
            $table->string('reas')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('201_file');
    }
};
