import { AxiosResponse } from 'axios';
import { useState } from 'react';
import api from '../Services/api';

interface UseMutationProps<FunctionReturn = any> {
  path: string;
  requestType: RequestHttpType;
  onComplete?: (result: FunctionReturn) => void;
  onError?: (error: Error) => void;
}
export enum RequestHttpType {
  post = 'post',
  put = 'put',
  patch = 'patch',
  delete = 'delete',
}

interface UseMutationReturn<FunctionRequest = any, FunctionResponse = any> {
  request: (variables: FunctionRequest) => Promise<FunctionResponse | null>;
  hasError: boolean;
  isLoading: boolean;
}

export function useMutation<FunctionRequest = any, FunctionReturn = any>({
  path,
  requestType,
  onComplete,
  onError,
}: UseMutationProps<FunctionReturn>): UseMutationReturn<
  FunctionRequest,
  FunctionReturn
> {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hasError, setError] = useState<boolean>(false);
  async function request(
    params: FunctionRequest
  ): Promise<FunctionReturn | null> {
    try {
      setError(false);
      setLoading(true);
      const result = await api[requestType]<
        FunctionRequest,
        AxiosResponse<FunctionReturn>
      >(path, { ...params });
      if (onComplete) {
        onComplete(result.data);
      }
      setLoading(false);
      return result.data;
    } catch (error: any) {
      setError(true);
      if (onError) {
        onError(error);
      }
      return null;
    }
  }

  return {
    request,
    hasError,
    isLoading,
  };
}
