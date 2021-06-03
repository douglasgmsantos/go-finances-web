import styled, { css }  from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

interface ColorSquareProps {
  color: string;
}

export const ColorSquare = styled.div<ColorSquareProps>`
  padding: 5px;
  width: 15px;
  height: 15px;
  border-radius: 5px;
  background: ${p => p.color};
`;

export const BlockPickerCover = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
`;

export const BlockPickerContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 100%;
  margin-top: 20px;
  left: 0;
`;

export const Container = styled.div<ContainerProps>`
  background: ${p => p.theme.title === 'light' ? p.theme.colors.white : p.theme.colors.dark};
  border: 2px solid ${p => p.theme.title === 'light' ? p.theme.colors.grey : p.theme.colors.orange};
  border-radius: 10px;
  padding: 16px;
  color: ${p => p.theme.title === 'light' ? p.theme.colors.grey : p.theme.colors.orange};
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  & + div {
    margin-top: 8px;
  }

  ${p =>
    p.isErrored &&
    css` border-color: ${p => p.theme.colors.red}; `}


  input {
    border: 0;
    flex: 1;
    background: transparent;
    color: ${p => p.theme.title === 'light' ? p.theme.colors.grey : p.theme.colors.orange};
    &::placeholder {
      color: ${p => p.theme.title === 'light' ? p.theme.colors.grey : p.theme.colors.orange};
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  > ${ColorSquare} {
    margin-right: 16px;
  }
`;


export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  color: ${p => p.theme.colors.red};
  svg {
    margin: 0;
  }
  span {
    background: ${p => p.theme.colors.red};
    color: ${p => p.theme.colors.white};
    &::before {
      border-color: ${p => p.theme.colors.red} transparent;
    }
  }
`;
