import { AxiosResponse } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import api from '../Services/api';

interface UseQueryReturnType<RequestReturnType = any> {
  isError: boolean;
  isLoading: boolean;
  data: RequestReturnType | null;
  refetch: (
    newPath: string,
    newParams?: Params[]
  ) => Promise<RequestReturnType | null>;
}
interface Params {
  name: string;
  value: unknown;
}

interface UseQueryProps<T> {
  path: string;
  params?: Params[];
  onComplete?: (result: T) => void;
  onError?: (error: unknown) => void;
}

export function useQuery<RequestReturnType = any>({
  path,
  params,
  onComplete = () => {
    return;
  },
  onError = () => {
    return;
  },
}: UseQueryProps<RequestReturnType>): UseQueryReturnType<RequestReturnType> {
  const [isError, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<RequestReturnType | null>(null);

  const makeRequest = useCallback(
    async (pathParam: string, params?: Params[]) => {
      try {
        setLoading(true);
        const result = await api.get<any, AxiosResponse<RequestReturnType>>(
          pathParam,
          {
            params: {
              ...params?.map((param) => ({
                [param.name]: [param.value],
              })),
            },
          }
        );
        onComplete(result.data);
        setLoading(false);

        return result.data;
      } catch (error) {
        setError(true);
        setLoading(false);
        onError(error);
        return null;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    async function doRequest() {
      const result = await makeRequest(path, params);

      setData(result);
    }
    doRequest();
  }, [params, path, makeRequest]);

  async function refetch(
    newPath: string,
    newParams?: Params[]
  ): Promise<RequestReturnType | null> {
    return await makeRequest(newPath, newParams);
  }

  return {
    isError,
    isLoading,
    data,
    refetch,
  };
}
