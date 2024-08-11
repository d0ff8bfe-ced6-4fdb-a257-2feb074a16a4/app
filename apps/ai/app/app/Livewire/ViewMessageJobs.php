<?php

namespace App\Livewire;

use App\Models\MessageJobs;
use Livewire\Component;

class ViewMessageJobs extends Component
{
    public $message_id;

    public function mount(int $message_id)
    {
        $this->message_id = $message_id;
    }


    public function render()
    {
        $jobs = MessageJobs::where('message_id', $this->message_id)->get();
        return view('livewire.view-message-jobs', compact('jobs'));
    }
}
