<?php

namespace App\Livewire;

use App\Models\Messages;
use Livewire\Attributes\On;
use Livewire\Component;

class ViewMessages extends Component
{
    public $text;
    public $chat_id;

    public $message_loyality = "Придумай стратегию программы лояльности по привлечению клиентов туристического приложения. Базовая информация о приложении: Вы также можете узнать актуальную информацию о мероприятиях, сможете подобрать и забронировать экскурсии. А если вы предпочитаете прогулки, в нашем приложении есть пешие маршруты по городу и его окрестностям. Вы сможете исследовать достопримечательности Анапы любым удобным вам способом, будь то на автомобиле, пешком или на велосипеде. При ответе используй HTML таблицы и инфографики.";
    public $message_loyality_research = "Придумай стратегию программы лояльности по привлечению клиентов туристического приложения. Базовая информация о приложении: Вы также можете узнать актуальную информацию о мероприятиях, сможете подобрать и забронировать экскурсии. А если вы предпочитаете прогулки, в нашем приложении есть пешие маршруты по городу и его окрестностям. Вы сможете исследовать достопримечательности Анапы любым удобным вам способом, будь то на автомобиле, пешком или на велосипеде. При ответе используй HTML: Верни layout где слева большая card shadow колонка содержит таблицу из 10 идей лояльности, а слева 2 shadow колонки посвященные маркетинговому анализу и рекомендации по составлению плана программы лояльности.";


    public function chat_id(int $chat_id)
    {
        $this->chat_id = $chat_id;
    }


    public function render()
    {
        $messages = Messages::where('chat_id', $this->chat_id)->get();
        return view('livewire.view-messages', compact('messages'));
    }

    public function create()
    {
        $this->validate([
            'text' => 'required',
        ], [
            'text.required' => 'Необходимо ввести текст сообщения',
        ]);

        Messages::create([
            'chat_id' => $this->chat_id,
            'text' => $this->text,
        ]);
        $this->text = "";
    }

    public function newProgramLoyality()
    {
        Messages::create([
            'chat_id' => $this->chat_id,
            'text' => "message_loyality",
        ]);
        $this->text = "";
    }

    public function newProgramLoyalityReseearch()
    {
        Messages::create([
            'chat_id' => $this->chat_id,
            'text' => "message_loyality_research",
        ]);
        $this->text = "";
    }
}
