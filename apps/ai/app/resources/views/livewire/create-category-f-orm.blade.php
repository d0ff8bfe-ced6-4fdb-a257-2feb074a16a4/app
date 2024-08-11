<form wire:submit.prevent="create" class="space-y-4">
    <div class="w-full">
        <div class="relative">
            <input wire:model="name" required type="text" class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Название"/>
            @error('name') <span class="text-red-500">{{ $message }}</span> @enderror
        </div>
    </div>

    <button type="submit" class="flex items-center justify-center bg-black text-white rounded-md py-4 w-full">
        Отправить
    </button>
</form>
