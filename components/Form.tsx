'use client';

import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { LowerCaseWord } from "@/lib/LowerCaseWord";
import useDictionaryQuery from "@/queries/useDictionaryQuery";
import { useFavorite } from "@/store/favorites/useFavorite";
import { Modal } from "./Modal";
import Dictionary from "./Dictionary";
import { useLastSearch } from "@/store/lastSearch/useLastSearch";
import { returnFirstLetterCapitalized } from "@/lib/FirstLetterCapital";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import  type { ModalMode } from "@/types/Dictionary";
;

export default function Form() {

    const favorites = useFavorite((state) => state.favorites);
    const toggleFavorite = useFavorite((state) => state.toggleFavorite);

    const lastSearches = useLastSearch((state) => state.lastSearch);
    const addSearch = useLastSearch((state) => state.addSearch);

    const [wordAux, setWordAux] = useState("");
    const [word, setWord] = useState("");

    const [isOpen, setIsOpen] = useState(false)
    const [modalMode, setModalMode] = useState<ModalMode>(null);
    
    const { data, isLoading, isError, isFetching } = useDictionaryQuery({word});

    const searchWord = async (e: React.FormEvent) => {
        e.preventDefault();

        setWord(LowerCaseWord(wordAux) || "");
    }

    const setWordRequestFavorite = (word: string) => {
        const lowerWord = LowerCaseWord(word) || "";
        setWordAux(lowerWord);
        setWord(lowerWord);
        addSearch(lowerWord);
    }

    
    const dictionaryState =
    isLoading || isFetching
    ? { status: 'loading' }
    : isError
    ? { status: 'error', message: word }
    : data
    ? { status: 'success', data }
    : { status: 'idle' };

    return (
        <>
            <form className="flex flex-row gap-y-10 gap-x-4 w-full" onSubmit={searchWord}>
                <div className="flex gap-x-3 justify-center items-center w-full">
                    <input 
                        type="text" 
                        placeholder="Write a word"
                        value={wordAux}
                        onChange={e => setWordAux(e.target.value)}
                        className="bg-blue-200/50 dark:bg-blue-300/50 placeholder:text-black dark:placeholder:text-white rounded-2xl py-1 px-4 w-full"
                        minLength={1}
                    />
                    <button 
                        className="bg-indigo-600 rounded w-min px-3 py-1 cursor-pointer text-white" 
                        type="submit"
                    >
                        Find
                    </button>
                </div>
            </form>
            {favorites.length ? 
            (
                <button onClick={(e) => {
                        e.stopPropagation();
                        setModalMode("favorites")
                        setIsOpen(!isOpen)}
                    } type="button" className="flex bg-indigo-600 rounded gap-x-2 px-2 py-1 cursor-pointer">
                    <p className="text-white">Favorites</p>
                    <StarIcon className="w-6 text-amber-300"/>
                </button>
            )
            :
            (
                <p>Not favorites words yet</p>
            )
            }
            {lastSearches.length ? 
            (
                
                <div className="flex items-start gap-x-2 w-full">
                    <ArrowPathIcon onClick={() => {
                            setModalMode("lastSearches")
                            setIsOpen(!isOpen)}
                        } className="w-6 text-indigo-600 hover:scale-105 hover:rotate-90 transition-all cursor-pointer"/>
                    <h3 className="border-indigo-600 bg-indigo-300 dark:border-indigo-600 dark:bg-transparent border-1 rounded px-2">Historic</h3>:
                    <div className="flex gap-x-1">
                        {lastSearches.map((search, index) => (
                            <div className="flex gap-x-1" key={`${search}`}>
                                <button 
                                className="cursor-pointer hover:bg-indigo-300 transition-all rounded px-1" 
                                type="button"  
                                onClick={() => setWordRequestFavorite(search)}>
                                    {returnFirstLetterCapitalized(search)}
                                </button>
                                {index !== lastSearches.length - 1 ? 
                                (
                                    <p>,</p>
                                ) 
                                : 
                                (
                                    null
                                )
                                }
                            </div>
                        ))}
                    </div>
                </div>

            ) 
            : 
            (
                <p>You're not searching words now ...</p>
            )
            }
            <Dictionary dictionaryEntry={dictionaryState} addSearch={addSearch}/>
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalMode={modalMode}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                setWordRequestFavorite={setWordRequestFavorite}
                lastSearches={lastSearches}
            />
        </>
    )
}
