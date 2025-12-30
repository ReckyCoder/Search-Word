import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type DictionaryErrorProps = {
    word: string | undefined;
}

export function DictionaryError({word} : DictionaryErrorProps) {

    console.log(word);
    return (
        <div className="
            flex flex-col items-center justify-center
            text-center
            gap-3
            p-6
            rounded-xl
            bg-indigo-100/50 dark:bg-indigo-900/30
            text-indigo-700 dark:text-indigo-300
            animate-fade-in
            ">
            <MagnifyingGlassIcon className="w-12 h-12 opacity-70" />

            <h3 className="text-lg font-semibold">
                Word not found
            </h3>

                <p className="text-sm opacity-80">
                    We couldn't find "<span className="font-medium">{word}</span>"
                </p>

            <p className="text-sm opacity-80 max-w-xs">
                Check the spelling or try searching for another word.
            </p>
        </div>
    );
}