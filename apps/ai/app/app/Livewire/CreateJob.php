<?php

namespace App\Livewire;

use App\Models\FeedbackJobs;
use Livewire\Component;

class CreateJob extends Component
{
    public $rate = 0;
    public $text;
    public function render()
    {
        return view('livewire.create-job');
    }

    public function setRate(int $rate)
    {
        $this->rate = $rate;
        $this->render();
    }

    public function create() {
        FeedbackJobs::create([
            'rate' => $this->rate + 1,
            'text' => $this->text,
            'user_id' => 1,
            'place_id' => 1,
        ]);

        $this->text = null;
        $this->rate = 0;
    }
}
