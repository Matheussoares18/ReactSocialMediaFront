import { AxiosResponse } from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import api from '../Services/api';

interface UseQueryReturnType<RequestReturnType = any> {
  isError: boolean;
  isLoading: boolean;
  data?: RequestReturnType;
  refetch?: () => Promise<RequestReturnType | null>;
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
  const [data, setData] = useState<RequestReturnType>();

  /* const makeRequest = useCallback(
    async (path: string, params: Params[]) => {
      setLoading(true);
      try {
        const result = await api.get<any, AxiosResponse<RequestReturnType>>(
          path,
          {
            params: {
              ...params.map((param) => ({
                [param.name]: [param.value],
              })),
            },
          }
        );
        onComplete(result.data);
        setData(result.data);
        setLoading(false);

        return result.data;
      } catch (error: unknown) {
        setError(true);
        setLoading(false);
        onError(error);
        return null;
      }
    },
    [onComplete, onError]
  ); */

  useEffect(() => {
    /*  async function doRequest() {
      await makeRequest(path, params);
    }
    doRequest(); */

    api
      .get<any, AxiosResponse<RequestReturnType>>(path, {
        params: {
          ...params?.map((param) => ({
            [param.name]: [param.value],
          })),
        },
      })
      .then((res) => {
        onComplete(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        onError(err);
      });
  }, [params, path /* , makeRequest */]);

  /* async function refetch(): Promise<RequestReturnType | null> {
    return await makeRequest(path, params);
  } */

  return {
    isError,
    isLoading,
    data,
    /*  refetch, */
  };
}
