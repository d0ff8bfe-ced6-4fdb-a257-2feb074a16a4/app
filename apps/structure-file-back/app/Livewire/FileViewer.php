<?php

namespace App\Livewire;

use Livewire\Component;

class FileViewer extends Component
{
    public $objUrl;

    public function mount($url)
    {
        $this->objUrl = $url;
    }

    public function render()
    {
        return view('livewire.file-viewer');
    }
}
