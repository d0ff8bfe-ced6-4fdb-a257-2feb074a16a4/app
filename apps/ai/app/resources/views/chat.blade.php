<x-app-layout>
    <div class="flex w-screen h-screen bg-gray-100">
        <div class="w-1/4 bg-white shadow-lg p-2 m-4 rounded-xl pb-12">
            <div class="w-full flex">
                <a href="{{ route('dashboard') }}" class="w-full px-4 py-2 bg-black text-white font-bold rounded-md justify-center flex space-x-4 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                    </svg>
                    <span>На главную</span>
                </a>
            </div>
            <div class="h-[95%] overflow-y-auto">
                <livewire:chat-list />
            </div>
            <livewire:create-new-chat />
        </div>
        <div class="w-full flex items-center justify-center h-full">
            <h4 class="font-bold text-black">Выберите чат</h4>
        </div>
    </div>
</x-app-layout>
