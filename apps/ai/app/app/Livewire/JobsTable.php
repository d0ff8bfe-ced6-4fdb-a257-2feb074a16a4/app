<?php

namespace App\Livewire;

use App\Models\FeedbackJobs;
use Livewire\Component;

class JobsTable extends Component
{
    public function render()
    {
        $jobs = FeedbackJobs::orderBy('is_processed', 'asc')->get();
        return view('livewire.jobs-table', compact('jobs'));
    }
}
