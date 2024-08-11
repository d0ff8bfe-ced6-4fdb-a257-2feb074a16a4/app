<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedbackJobs extends Model
{
    use HasFactory;

    protected $fillable = [
        'rate',
        'text',
        'user_id',
        'place_id',
        'is_processed',
        'is_sended',
    ];
}
