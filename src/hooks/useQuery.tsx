import { AxiosResponse } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import api from '../Services/api';

export type RefetchType<RequestReturnType = any> = (
  newPath: string,
  newParams?: Params[],
  changeState?: boolean
) => Promise<RequestReturnType | null>;
interface UseQueryReturnType<RequestReturnType = any> {
  isError: boolean;
  isLoading: boolean;
  data: RequestReturnType | null;
  refetch: RefetchType<RequestReturnType>;
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
    async (pathParam: string, params?: Params[], changeState = true) => {
      try {
        if (changeState) {
          setLoading(true);
        }
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
        if (changeState) {
          setLoading(false);
        }

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
    newParams?: Params[],
    changeState: boolean = true
  ): Promise<RequestReturnType | null> {
    const result = await makeRequest(newPath, newParams, changeState);
    setData(result);
    return result;
  }

  return {
    isError,
    isLoading,
    data,
    refetch,
  };
}
