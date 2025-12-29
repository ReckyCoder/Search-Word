'use client';

import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { LowerCaseWord } from "@/lib/LowerCaseWord";
import useDictionaryQuery from "@/queries/useDictionaryQuery";
import { useFavorite } from "@/store/favorites/useFavorite";
import { Modal } from "./Modal";
import Dictionary from "./Dictionary";

export default function Form() {

    const favorites = useFavorite((state) => state.favorites);
    const toggleFavorite = useFavorite((state) => state.toggleFavorite);

    const [wordAux, setWordAux] = useState("");
    const [word, setWord] = useState("");

    const [isOpen, setIsOpen] = useState(false)
    
    const { data, isLoading, isError, isFetching } = useDictionaryQuery({word});

    const searchWord = async (e: React.FormEvent) => {
        e.preventDefault();

        setWord(LowerCaseWord(wordAux) || "");
    }

    const setWordRequestFavorite = (word: string) => {
        setWordAux(word);
        setWord(word);
    }

    const dictionaryState =
        isLoading || isFetching
        ? { status: 'loading' }
        : isError
        ? { status: 'error', message: "Word not found" }
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
                <button onClick={() => setIsOpen(!isOpen)} type="button" className="flex bg-indigo-600 rounded gap-x-2 px-2 py-1 cursor-pointer">
                    <p className="text-white">Favorites</p>
                    <StarIcon className="w-6 text-amber-300"/>
                </button>
            )
            :
            (
                <p>Not favorites words yet</p>
            )
            }
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} favorites={favorites} toggleFavorite={toggleFavorite} setWordRequestFavorite={setWordRequestFavorite}/>
            <Dictionary dictionaryEntry={dictionaryState}/>
        </>
    )
}
