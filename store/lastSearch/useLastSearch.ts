import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type LastSearchProps = {
    lastSearch: string[]
    addSearch: (searchInput: string) => void;
    cleanHistoric: () => void;
}

export const useLastSearch = create<LastSearchProps>()(
    devtools(
        persist(
            (
                (set) => (
                    {
                        lastSearch: [],
                        addSearch: (searchInput: string) => 
                            set((prevState) => {
                                const wordMatch = prevState.lastSearch.find(search => search === searchInput);
                                if(wordMatch){
                                    const deleteMatchWord = prevState.lastSearch.filter(search => search !== wordMatch);
                                    return { lastSearch: [...deleteMatchWord, searchInput].slice(-5) }
                                } else {
                                    return { lastSearch: [...prevState.lastSearch, searchInput].slice(-5) }
                                }
                            }),
                        cleanHistoric: () => 
                            set(() => ({ 
                                lastSearch: [] 
                            })),
                    }
                )
            ), 
            {
                name: 'last-searchs-storage'
            }
        )
    )
)