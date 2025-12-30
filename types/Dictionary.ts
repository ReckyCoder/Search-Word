export type Entry = {
  word: string
  phonetics: {
    text?: string
    audio?: string
  }[]
  meanings: {
    partOfSpeech: string
    definitions: {
      definition: string
      synonims?: string[]
      antonyms?: string[]
      example?: string
    }[]
    synonyms: string[]
    antonyms: string[]
  }[]
  sourceUrls: string[]
}

export type DictionaryProps = {
   dictionaryEntry: {
        status: string;
        message?: undefined;
        data?: undefined;
    } | {
        status: string;
        message: string;
        data?: undefined;
    } | {
        status: string;
        data: Entry;
        message?: undefined;
    }
}

export type ModalMode = "favorites" | "lastSearches" | null