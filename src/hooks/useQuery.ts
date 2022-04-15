import axios, { AxiosError, AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from 'Services/api';

interface Params {
  name: string;
  value: unknown;
}

export type RefetchType<RequestReturnType = unknown> = (
  newPath: string,
  newParams?: Params[],
  changeState?: boolean
) => Promise<RequestReturnType | null>;
interface UseQueryReturnType<RequestReturnType = unknown> {
  hasError: boolean;
  isLoading: boolean;
  data: RequestReturnType | null;
  refetch: RefetchType<RequestReturnType>;
}

interface UseQueryProps<T> {
  path: string;
  params?: Params[];
  enabled?: boolean;
  onComplete?: (result: T) => void;
  onError?: (error: AxiosError) => void;
}

export function useQuery<RequestReturnType = unknown>({
  path,
  params,
  onComplete,
  onError,
  enabled = true,
}: UseQueryProps<RequestReturnType>): UseQueryReturnType<RequestReturnType> {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<RequestReturnType | null>(null);

  const makeRequest = useCallback(
    async (pathParam: string, paramsFunc?: Params[], changeState = true) => {
      try {
        if (changeState) {
          setLoading(true);
        }
        const result = await api.get<unknown, AxiosResponse<RequestReturnType>>(
          pathParam,
          {
            params: {
              ...paramsFunc?.map((param) => ({
                [param.name]: [param.value],
              })),
            },
          }
        );
        if (onComplete) {
          onComplete(result.data);
        }
        if (changeState) {
          setLoading(false);
        }

        return result.data;
      } catch (error) {
        setHasError(true);
        setLoading(false);
        if (error instanceof Error && error.message === 'Network Error') {
          toast.error('Falha ao realizar operação, serviço indisponível', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return null;
        }
        if (onError && axios.isAxiosError(error)) {
          onError(error);
          return null;
        }
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
    if (enabled) {
      doRequest();
    }
  }, [params, path, makeRequest, enabled]);

  async function refetch(
    newPath: string,
    newParams?: Params[],
    changeState = true
  ): Promise<RequestReturnType | null> {
    const result = await makeRequest(newPath, newParams, changeState);
    setData(result);
    return result;
  }

  return {
    hasError,
    isLoading,
    data,
    refetch,
  };
}
