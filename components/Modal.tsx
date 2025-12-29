import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { StarIcon, XMarkIcon } from '@heroicons/react/24/solid'
import type { Dispatch, SetStateAction } from 'react'
import { returnFirstLetterCapitalized } from '@/lib/FirstLetterCapital'

type ModalProps = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    favorites: string[],
    toggleFavorite: (wordFavorite: string) => void;
    setWordRequestFavorite: (word: string) => void;
}

export function Modal({isOpen, setIsOpen, favorites, toggleFavorite, setWordRequestFavorite} : ModalProps) {

    return (
        
        <Dialog open={isOpen} onClose={setIsOpen} className="relative z-10">
            <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                    <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-amber-500/10 sm:mx-0 sm:size-10">
                            <StarIcon aria-hidden="true" className="size-6 text-amber-400" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <DialogTitle as="h3" className="text-base font-semibold text-white">
                            Favorites words
                            </DialogTitle>
                            <div className="mt-2">
                                {favorites.length ? 
                                (
                                    <div className='flex gap-x-2'>
                                        {favorites.map((favorite) => (
                                            <div key={favorite} className="
                                            group 
                                            inline-flex 
                                            px-1 
                                            items-center 
                                            gap-x-1 
                                            rounded-md 
                                            text-indigo-400 
                                            hover:text-indigo-300 
                                            bg-indigo-400/10 
                                            hover:bg-indigo-300/50
                                            has-[.icon:hover]:bg-indigo-400/10 
                                            has-[.icon:hover]:text-indigo-400
                                            transition-colors
                                            ">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setWordRequestFavorite(favorite);
                                                        setIsOpen(false);
                                                    }}
                                                    className="ps-2 py-1 font-medium"
                                                    >
                                                    {returnFirstLetterCapitalized(favorite)}
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleFavorite(favorite);
                                                    }}
                                                    className="icon p-1 rounded hover:bg-indigo-600/50 cursor-pointer hover:text-indigo-300"
                                                    >
                                                    <XMarkIcon className="w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) :
                                (
                                    <p className='text-slate-400'>Not favorites words yet</p>
                                )
                                }
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-400 sm:ml-3 sm:w-auto"
                        >
                        Cancel
                        </button>
                    </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    
    )
}