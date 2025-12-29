import { useQuery } from '@tanstack/react-query';
import { Api } from '@/lib/axios';

export default function useDictionaryQuery({ word } : { word : string; }) {
     const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ['dictionary', word],
        queryFn: async () => {
            const response = await Api.get(`/dictionary/${word}`);
            return response.data.result;
        },
        enabled: !!word,
        retry: false,
        staleTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
    });

    return { data, isLoading, isError, isFetching }
}
