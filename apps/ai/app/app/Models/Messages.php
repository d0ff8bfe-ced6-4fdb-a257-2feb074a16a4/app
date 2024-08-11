<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{
    use HasFactory;

    protected $fillable = [
        'chat_id',
        'text',
        'actor',
        'is_send_to_processing',
        'is_done',
    ];
}
