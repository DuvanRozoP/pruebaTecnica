import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import type { useFetchResponse, FetchOptions } from '@type/hooks/use-fetch';
import type { AxiosResponse } from 'axios';

const useFetch = <T>(
  url: string,
  options: FetchOptions = {},
): useFetchResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);

      try {
        const response: AxiosResponse<T> = await axios.get(url, options);
        setData(response.data);
        setError(null);
        setIsLoading(false);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) setError(error.message);
        else setError('Error desconocido');
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const memoizedData = useMemo(() => data, [data]);

  return { data: memoizedData, isLoading, error };
};

export default useFetch;
