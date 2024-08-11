<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageJobs extends Model
{
    use HasFactory;

    protected $fillable = [
        'message_id',
        'request',
        'response',
        'is_send_to_processing',
        'is_done',
    ];
}
