import { Spinner } from 'components/DefaultComponents/Spinner/Spinner';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading: boolean;
}

export function Button({
  children,
  loading = false,
  type = 'button',
  style,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      {...rest}
      style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
