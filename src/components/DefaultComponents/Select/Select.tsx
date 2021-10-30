import { forwardRef, InputHTMLAttributes, useEffect, useState } from 'react';
import { ReactComponent as ExpandMore } from '../../../assets/expand_more.svg';
import {
  Container,
  Item,
  ItemsList,
  SelectContainer,
  SelectDimmer,
} from './styles';

interface SelectItem {
  label: string;
  value: string;
}

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  label: string;
  options?: SelectItem[];
  maxWidth?: string;
  hasError?: boolean;
  errorMessage?: string;
}

const Select: React.ForwardRefRenderFunction<HTMLInputElement, SelectProps> = (
  { placeholder, options, maxWidth, label, errorMessage, hasError, ...rest },
  ref
) => {
  const [selectedItem, setSelectedItem] = useState<SelectItem>({
    label: 'M',
    value: 'M',
  });
  const [test, setTest] = useState<string>('M');
  const [optionsIsVisible, setOptionsVisible] = useState<boolean>(false);

  useEffect(() => {
    setTest(selectedItem.value);
  }, [selectedItem]);

  return (
    <Container
      hasError={hasError}
      maxWidth={maxWidth}
      onClick={() => setOptionsVisible(!optionsIsVisible)}
    >
      <label htmlFor=""> {label} </label>
      <SelectContainer hasError={hasError}>
        <input
          value={test}
          ref={ref}
          onBlur={rest.onBlur}
          onChange={rest.onChange}
          autoComplete="off"
          name={rest.name}
          {...rest}
        />

        <ExpandMore className="expand-more" />
      </SelectContainer>
      {hasError && (
        <div className="error-message-container">
          <span>{errorMessage}</span>
        </div>
      )}
      {optionsIsVisible && (
        <>
          <ItemsList>
            <div className="content">
              {options?.map((item) => (
                <Item onClick={() => setSelectedItem(item)}>
                  <span>{item.label}</span>
                </Item>
              ))}
            </div>
          </ItemsList>
          <SelectDimmer onClick={() => setOptionsVisible(false)} />
        </>
      )}
    </Container>
  );
};

export default forwardRef(Select);
