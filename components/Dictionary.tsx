'use client';

import Link from "next/link";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import type { DictionaryProps } from "@/types/Dictionary";
import AudioWord from "./AudioWord";
import { useFavorite } from "@/store/favorites/useFavorite";
import { StarIcon as NotFavorite } from "@heroicons/react/24/outline";
import { StarIcon as Favorite } from "@heroicons/react/24/solid";
import { LinkIcon } from "@heroicons/react/24/outline";
import { returnFirstLetterCapitalized } from "@/lib/FirstLetterCapital";

export default function Dictionary({ dictionaryEntry }:DictionaryProps) {

    const [activeAudio, setActiveAudio] = useState<string | null>(null);

    const toggleFavorite = useFavorite((state) => state.toggleFavorite);
    const isFavorite = useFavorite((state) => state.isFavorite(dictionaryEntry.data?.word))

    const renderTypeOfEntry = () => {
        switch (dictionaryEntry.status) {
            case "idle":
                return <div className="flex flex-col gap-y-2">
                    <h2 className="text-3xl">Start looking for a word.</h2>
                    <p>If you want a extend description, we have a lot information about you search.</p>
                </div>
            case "loading":
                return <ClipLoader color="#4f39f6" className="mx-auto"/>
            case "success":
                return (
                    <>
                        <div className="flex items-center gap-x-2">
                            <h1 className="text-left text-5xl font-bold">{dictionaryEntry.data?.word}</h1>
                            {isFavorite ? 
                            (
                                <Favorite onClick={() => toggleFavorite(dictionaryEntry.data!.word)} className="w-8 text-amber-300 cursor-pointer hover:text-amber-400 transition-all hover:scale-105"/>
                            ) 
                            : 
                            (
                                <NotFavorite onClick={() => toggleFavorite(dictionaryEntry.data!.word)} className="w-8 text-amber-300 cursor-pointer hover:text-amber-400 transition-all hover:scale-105"/>
                            )
                            }
                        </div>
                        <div className="flex items-center gap-x-3">
                            <h2 className="text-left text-xl text-indigo-500 dark:text-indigo-300 font-bold">Phonetics</h2>
                            <div className="dark:bg-white bg-black/50 w-full h-0.5"></div>
                        </div>
                        {
                            dictionaryEntry.data?.phonetics.map((phonetic, index) => (
                                <div className="flex" key={`${phonetic.text} - ${index} ?? ${phonetic.audio}`}>
                                    {phonetic.text ? 
                                    (
                                        <AudioWord 
                                            phonetic={phonetic} 
                                            isActive={activeAudio === phonetic.audio}
                                            onPlay={() => setActiveAudio(phonetic.audio ?? null)}
                                        />
                                    ) : 
                                    (
                                        null
                                    )
                                    }  
                                </div>
                            ))
                        }
                        {
                            dictionaryEntry.data?.meanings.map((meaning, index) => (
                                <div className="flex flex-col" key={`${meaning.partOfSpeech} - ${index}`}>
                                    {meaning.partOfSpeech ? 
                                    (
                                        <div className="flex justify-between w-full gap-x-3">
                                            <div className="flex flex-col gap-x-2 w-full">
                                                <div className="flex items-center gap-x-3 my-4">
                                                    <h2 className="text-xl text-indigo-500 dark:text-indigo-300 font-bold">{returnFirstLetterCapitalized(meaning.partOfSpeech)}</h2>
                                                    <div className="dark:bg-white bg-black/50 w-full h-0.5"></div>
                                                </div>
                                                <div className="flex flex-col gap-y-5">
                                                    {meaning.definitions.map((def, defIndex) => (
                                                        <div className="text-left" key={`${def.definition} - ${defIndex}`}>
                                                            <p className="before:content-['•'] before:text-indigo-500"> {def.definition}</p>
                                                            {def.synonims?.map((synonym) => (
                                                                <p className="text-slate-300" key={synonym}>Synonym: <span className="bg-blue-500 text-white">{synonym}</span></p>
                                                            ))}
                                                            {def.antonyms?.map((antonym) => (
                                                                <p className="text-slate-300" key={antonym}>Antonym: <span className="bg-blue-500 text-white">{antonym}</span></p>
                                                            ))}
                                                            {def.example && <p className="font-thin mt-1 skew-x-4">- "{def.example}"</p>}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : 
                                    (
                                        null
                                    )
                                    }  
                                    {
                                        meaning.synonyms.length > 0 ? (
                                            <div className="flex flex-col sm:flex-row items-start gap-y-3 gap-x-2 mt-2">
                                                <h2 className="text-slate-600 dark:text-slate-400">Synonims</h2>
                                                <div className="flex flex-wrap gap-x-2 gap-y-2">
                                                    {
                                                        meaning.synonyms.map((synonym) => (
                                                            <p className="bg-indigo-600 text-white rounded-2xl px-2" key={synonym}>{synonym}</p>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-start sm:flex-row gap-x-2 mt-5">
                                                <h2 className="text-slate-600 dark:text-slate-400">Synonims</h2>
                                                <p className="text-red-600">No synonyms available.</p>
                                            </div>
                                        )
                                    }
                                    {
                                        meaning.antonyms.length > 0 ? (
                                            <div className="flex gap-x-2 mt-2">
                                                <h2 className="text-slate-600 dark:text-slate-400">Antonyms</h2>
                                                {
                                                    meaning.antonyms.map((antonym) => (
                                                        <p className="bg-purple-600 text-white px-2 rounded-2xl" key={antonym}>{antonym}</p>
                                                    ))
                                                }
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-start sm:flex-row gap-x-2 mt-1">
                                                <h2 className="text-slate-600 dark:text-slate-400">Antonyms</h2>
                                                <p className="text-red-600">No antonyms available.</p>
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                        {
                            <>
                                <div className="flex items-center gap-x-3">
                                    <h2 className="text-left text-xl text-indigo-500 dark:text-indigo-300 font-bold">Source/s</h2>
                                    <div className="dark:bg-white bg-black/50 w-full h-0.5"></div>
                                </div>
                                {
                                    dictionaryEntry.data?.sourceUrls.map((url, index) => (
                                        <Link href={url} target="_blank" className="flex flex-wrap gap-x-2 gap-y-2 group" key={url}>
                                            <p className="text-indigo-400 group-hover:text-indigo-500 transition-color text-start break-all">{url}</p>
                                            <LinkIcon className="w-4 text-indigo-400 group-hover:text-indigo-500"/>
                                        </Link>
                                    ))
                                }
                            </>
                        }
                    </>
                )
            case "error":
                return <p>{dictionaryEntry.message}</p>
        }
    }
    
    return (
        <div className="w-full flex flex-col gap-y-3">
            {renderTypeOfEntry()}
        </div>
    )
}
