<?php

namespace App\Livewire;

use App\Models\Chats;
use Livewire\Component;

class CreateNewChat extends Component
{
    public function render()
    {
        return view('livewire.create-new-chat');
    }


    public function create()
    {
        $chat = new Chats();
        $chat->save();

        $this->redirectRoute('chat.view', $chat->id);
    }
}
