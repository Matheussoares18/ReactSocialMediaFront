import React, { forwardRef, InputHTMLAttributes } from 'react';
import { CustomInput, InputContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hasError: boolean;
  errorMessage?: string;
  maxWidth?: string;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, hasError, errorMessage, maxWidth, ...rest },
  ref
) => {
  return (
    <InputContainer hasError={hasError} maxWidth={maxWidth}>
      <label htmlFor=""> {label} </label>
      <CustomInput
        {...rest}
        hasError={hasError}
        onBlur={rest.onBlur}
        ref={ref}
        onChange={rest.onChange}
      />
      {hasError && (
        <div className="error-message-container">
          <span>{errorMessage}</span>
        </div>
      )}
    </InputContainer>
  );
};

export default forwardRef(Input);
