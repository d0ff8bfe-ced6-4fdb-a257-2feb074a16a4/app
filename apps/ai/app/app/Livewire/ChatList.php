<?php

namespace App\Livewire;

use App\Models\Chats;
use Livewire\Component;
use Livewire\Attributes\On;

class ChatList extends Component
{
    public function render()
    {
        $chats = Chats::get();
        return view('livewire.chat-list', compact('chats'));
    }
}
