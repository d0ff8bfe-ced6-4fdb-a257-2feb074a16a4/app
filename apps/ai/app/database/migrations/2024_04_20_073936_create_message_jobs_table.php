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
        Schema::create('message_jobs', function (Blueprint $table) {
            $table->id();

            $table->bigInteger('message_id');
            $table->text('request');
            $table->text('response')->nullable();
            $table->boolean('is_send_to_processing')->default(false);
            $table->boolean('is_done')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('message_jobs');
    }
};
