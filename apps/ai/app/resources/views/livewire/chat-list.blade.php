<div class="w-full flex flex-col space-y-4 mt-4">
    @foreach($chats as $chat)
        <a href="{{ route('chat.view', $chat->id) }}" class="w-full px-4 py-2 bg-blue-100 text-gray-600 font-bold rounded-md ring-1 ring-blue-200 hover:bg-blue-200 hover:ring-blue-300">
            {{ $chat->chat_name }}
        </a>
    @endforeach
</div>
