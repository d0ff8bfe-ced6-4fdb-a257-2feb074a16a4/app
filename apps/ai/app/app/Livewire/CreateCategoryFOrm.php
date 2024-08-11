<?php

namespace App\Livewire;

use App\Models\OrganizationCategory;
use Livewire\Component;

class CreateCategoryFOrm extends Component
{
    public $name;

    public function create()
    {
        OrganizationCategory::create([
            'name' => $this->name,
        ]);
        $this->reset();
    }


    public function render()
    {
        return view('livewire.create-category-f-orm');
    }
}
