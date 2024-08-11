<div class="h-screen" wire:poll.750ms>
    <div class="h-[87%] overflow-y-auto text-white">
        @if($messages)
            @foreach($messages as $message)
                <div class="w-full py-8 @if($message->actor == "user") bg-gray-300 @elseif($message->actor == "ai") bg-white @endif">
                    <div class="w-2/3 mx-auto flex items-start space-x-4">
                        <div class="flex w-1/5 items-center justify-center h-auto w-1/5 rounded-md mr-8 bg-black">
                            <h4 class="text-2xl font-bold text-gray-600">{{ $message->actor }}</h4>
                        </div>

                        <div class="w-4/5">
                            @if(($message->is_send_to_processing && $message->is_done) || $message->actor == "ai")

                                <div class="text-black">
                                    @if($message->actor == "user")
                                        @if("message_loyality" == $message->text)
                                            <div class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 dark:bg-neutral-800 dark:border-neutral-700" role="alert">
                                                <div class="flex">
                                                    <div class="flex-shrink-0">
                                                        <svg class="flex-shrink-0 size-4 text-blue-600 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                            <circle cx="12" cy="12" r="10"></circle>
                                                            <path d="M12 16v-4"></path>
                                                            <path d="M12 8h.01"></path>
                                                        </svg>
                                                    </div>
                                                    <div class="ms-3">
                                                        <h3 class="text-gray-800 font-semibold">
                                                            Создать идею программы лояльности
                                                        </h3>
                                                        <p class="mt-2 text-sm text-gray-700">
                                                            Это может занять немного времени, наш AI изучает текущие данные для составления наилучшей системы лояльности.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        @elseif("message_loyality_research" == $message->text)
                                            <div class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 dark:bg-neutral-800 dark:border-neutral-700" role="alert">
                                                <div class="flex">
                                                    <div class="flex-shrink-0">
                                                        <svg class="flex-shrink-0 size-4 text-blue-600 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                            <circle cx="12" cy="12" r="10"></circle>
                                                            <path d="M12 16v-4"></path>
                                                            <path d="M12 8h.01"></path>
                                                        </svg>
                                                    </div>
                                                    <div class="ms-3">
                                                        <h3 class="text-gray-800 font-semibold">
                                                            Создать иследование для программы лояльности
                                                        </h3>
                                                        <p class="mt-2 text-sm text-gray-700">
                                                            Это может занять немного времени, наш AI изучает текущие данные для составления наилучшей системы лояльности.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        @else
                                            {{ $message->text }}
                                        @endif
                                    @else
                                        {!! $message->text !!}
                                    @endif
                                </div>

                            @elseif(!$message->is_send_to_processing || !$message->is_done)

                                <img src="{{ asset('squers.gif') }}" class="w-56 mx-auto rounded-full" alt="">

                            @endif

                            <livewire:view-message-jobs :message_id="$message->id" />
                        </div>

                    </div>
                </div>
            @endforeach
        @endif
    </div>
    @if($chat_id)
        <div class="mx-auto w-1/3">
            <div class="w-full flex space-x-2">
                <button wire:click="newProgramLoyality" type="button" class="bg-white rounded-md px-4 py-2 ring-1 text-gray-700">Загрузить документы</button>
                <button wire:click="newProgramLoyalityReseearch" type="button" class="bg-white rounded-md px-4 py-2 ring-1 text-gray-700">Найти документ</button>
                <button wire:click="newProgramLoyalityReseearch" type="button" class="bg-white rounded-md px-4 py-2 ring-1 text-gray-700">Предоставить досутп по ссылке</button>
            </div>

            <nav class="bg-white mx-auto w-full mt-4 dark:bg-gray-700 border-b border-gray-100 dark:border-gray-600 my-0 px-4 rounded-2xl drop-shadow-lg">
        
                <form wire:submit.prevent="create" class="flex justify-between h-16 items-center">
        
        
                    <div class="shrink-0 flex items-center">
                        <button type='button' class="h-8 w-8 flex text-gray-700 hover:text-gray-500 items-center justify-center bg-transparent hover:bg-blue-50 ring-0 hover:ring-1 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                            </svg>
                        </button>
                    </div>
            
            
                    <div class="max-w-xl mx-1 w-full flex items-center justify-center">
                        <textarea
                            class="px-4 py-2 resize-none rounded-lg border-transparent flex-1 appearance-none w-full bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:border-transparent"
                            rows="1"
                            wire:model="text" 
                            placeholder="Сообщение..."
                        ></textarea>
                    </div>
            
            
                    <div class="flex space-x-2">
                        {{-- { --}}
                        {{-- message.length > 0 ? ( --}}
                            <button type="submit" class="h-8 w-8 flex text-gray-700 hover:text-gray-500 items-center justify-center bg-transparent hover:bg-blue-50 ring-0 hover:ring-1 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                            </button>
                        {{-- ) : --}}
                            {{-- <button type={'button'} class="h-8 w-8 flex text-gray-700 hover:text-gray-500 items-center justify-center bg-transparent hover:bg-blue-50 ring-0 hover:ring-1 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                            </svg>
                            </button> --}}
                        {{-- } --}}
                    </div>
        
        
                </form>
            </nav>
            @error('text') <span class="text-red-500">{{ $message }}</span> @enderror
        </div>
    @endif
</div>
