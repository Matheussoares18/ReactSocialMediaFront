/* eslint-disable react/jsx-no-useless-fragment */
import React, { ReactNode, useEffect, useState } from 'react';

enum States {
  DEFAULT = 'default',
  LOADING = 'loading',
  ERROR = 'error',
}

interface LoadingOrErrorProps {
  error: {
    isError: boolean;
    component: JSX.Element;
  };
  loading: {
    isLoading: boolean;
    component: JSX.Element;
  };
  children: ReactNode | undefined;
}

export function LoadingOrError({
  error,
  loading,
  children,
}: LoadingOrErrorProps): JSX.Element {
  const [state, setState] = useState<States>(States.LOADING);

  useEffect(() => {
    const isloading = loading.isLoading && !error.isError;
    const iserror = !loading.isLoading && error.isError;

    if (isloading) {
      setState(States.LOADING);
    } else if (iserror) {
      setState(States.ERROR);
    } else {
      setState(States.DEFAULT);
    }
  }, [error, loading]);
  return (
    <>
      {
        {
          [States.DEFAULT]: children,
          [States.LOADING]: loading.component,
          [States.ERROR]: error.component,
        }[state]
      }
    </>
  );
}
