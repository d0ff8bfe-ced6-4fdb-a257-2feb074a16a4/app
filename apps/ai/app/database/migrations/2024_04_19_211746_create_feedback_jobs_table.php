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
        Schema::create('feedback_jobs', function (Blueprint $table) {
            $table->id();

            $table->integer('rate');
            $table->text('text');
            $table->bigInteger('user_id');
            $table->bigInteger('place_id');
            $table->boolean('is_processed')->default(false);
            $table->boolean('is_sended')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedback_jobs');
    }
};
