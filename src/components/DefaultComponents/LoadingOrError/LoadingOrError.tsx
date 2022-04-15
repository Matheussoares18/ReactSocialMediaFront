/* eslint-disable react/jsx-no-useless-fragment */
import React, { ReactNode, useEffect, useState } from 'react';

enum States {
  DEFAULT = 'default',
  LOADING = 'loading',
  ERROR = 'error',
}

interface LoadingOrErrorProps {
  error: {
    hasError: boolean;
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
    const isloading = loading.isLoading && !error.hasError;
    const hasErrorLocal = !loading.isLoading && error.hasError;

    if (isloading) {
      setState(States.LOADING);
    } else if (hasErrorLocal) {
      setState(States.ERROR);
    } else {
      setState(States.DEFAULT);
    }
  }, [error.hasError, loading.isLoading]);
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
