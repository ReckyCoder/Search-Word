import { useEffect, useRef } from "react";
import { AudioPlayer, type AudioPlayerRef } from "react-audio-play";
import { returnAudioTextForNative } from "@/lib/audioOrigin";
import type { Entry } from "@/types/Dictionary";

type AudioWordProps = {
    phonetic: Entry['phonetics'][number];
    isActive?: boolean
    onPlay: () => void;
}

export default function AudioWord({phonetic, isActive, onPlay} : AudioWordProps) {

    const audioRef = useRef<AudioPlayerRef | undefined>(null);

    useEffect(() => {
        if(!isActive) audioRef.current?.pause();
    }, [isActive]);

    const handleAudio = () => {
        onPlay();
        audioRef.current?.play();
    }

    return (
        <div className="flex flex-col gap-y-3 sm:flex-row justify-between w-full gap-x-3">
            <div className="flex gap-x-2 text-purple-400 group">
                {phonetic.audio ? 
                (
                    <button 
                    type="button" 
                    className="transition-colors hover:text-purple-500 cursor-pointer"
                    onClick={() => handleAudio()}
                    >
                        {phonetic.text} {returnAudioTextForNative(phonetic.audio)}
                    </button>
                ) : 
                (
                    <p>{phonetic.text} <span className="text-black dark:text-white font-thin">Without Sound 😔</span></p>
                )
                }
            </div>
            {phonetic.audio && 
                
                <AudioPlayer 
                    onPlay={onPlay}
                    ref={audioRef}
                    src={phonetic.audio}
                    color="white"
                    sliderColor="#c27aff"
                    style={{
                        backgroundColor: "#4f39f6",
                        padding: "0px 20px",
                        borderRadius: "10px",
                        width: "100%",
                        maxWidth: "300px",
                        height: "35px",
                    }}
                    className="audio-style"
                />
            }   
        </div>
    )
}
