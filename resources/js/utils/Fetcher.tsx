import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useFetch = (url: string) => {
    const { data, error, isLoading } = useSWR(url, fetcher, {
        refreshInterval: 0,
        revalidateOnFocus: false,
    });

    return {
        data,
        error,
        isLoading,
    };
};

export default useFetch;
