<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hmo_acknowledges', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('emp_id');
            $table->string('emp_name');
            $table->text('signature');
            $table->timestamp('acknowledged_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hmo_acknowledges');
    }
};
