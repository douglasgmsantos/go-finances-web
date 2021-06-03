import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useCallback,
  useState,
} from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { rgba } from 'polished';

import { BlockPicker } from 'react-color';
import { useField } from '@unform/core';

import { useTheme } from '../../hooks/theme';

import {
  Container,
  ColorSquare,
  BlockPickerContainer,
  BlockPickerCover,
  Error,
} from './styles';

interface IInputColor extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerClassName?: string;
}

const InputColor: React.FC<IInputColor> = ({
  name,
  containerClassName,
  ...rest
}) => {
  const { theme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedColor, setSelectedColor] = useState('#000');
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current ?.value);
  }, []);

  const handleColorChange = useCallback(
    (color: any) => {
      setSelectedColor(color.hex);
      if (inputRef.current) inputRef.current.value = color.hex;
    },
    [inputRef],
  );

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      className={containerClassName}
      isErrored={!!Boolean(error)}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      <ColorSquare color={selectedColor} />

      <input
        onFocus={handleInputFocus}
        defaultValue={defaultValue}
        {...rest}
        ref={inputRef}
      />

      {isFocused && (
        <BlockPickerContainer>
          <BlockPickerCover onClick={handleInputBlur} />
          <BlockPicker
            color={inputRef.current ?.value}
            onChange={handleColorChange}
            styles={{
              default: {
                body: {
                  backgroundColor: theme.colors.background,
                },
                input: {
                  boxShadow: `${rgba(theme.colors.primary,
                    1,
                  )} 0px 0px 0px 1px inset`,
                  color: theme.colors.dark,
                },
              },
            }}
          />
        </BlockPickerContainer>
      )}

      {error && (
        <Error title={error}>
          <FiAlertCircle size={20} />
        </Error>
      )}
    </Container>
  );
};

export default InputColor;
