<div class="bg-transparent rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
    <div class="px-4 py-8 sm:px-10">
        <div class="mt-6">
            <form wire:submit.prevent="create">
                <div class="w-full space-y-6">
                    <div class="w-full flex items-center justify-center space-x-2">
                        @for($i = 0; $i < 5; $i++)
                            <button type="button" wire:click="setRate({{$i}})">
                            @if($rate >= $i)
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-amber-400">
                                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                                </svg>
                            @else
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-gray-400">
                                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                                </svg>
                            @endif
                            </button>
                        @endfor
                    </div>
                    <div class="w-full">
                        <div class="relative">
                            <input wire:model="text" required type="text" class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Введите отзыв"/>
                            @error('text') <span class="text-red-500">{{ $message }}</span> @enderror
                        </div>
                    </div>

                    <div>
                        <span class="block w-full rounded-md shadow-sm">
                            <button type="submit" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                                Отправить
                            </button>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
