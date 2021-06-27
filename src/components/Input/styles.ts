import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${p => p.theme.colors.white};
  border-radius: 10px;
  border: 2px solid ${p => p.theme.colors.purple_light};
  color:${p => p.theme.colors.purple};
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css` border-color: ${p => p.theme.colors.red}; `}

  ${props =>
    props.isFocused &&
    css`
      color: ${p => p.theme.colors.orange};
      border-color: ${p => p.theme.colors.orange};
    `}

  ${props =>
    props.isFilled &&
    css`
      color: ${p => p.theme.colors.orange};
    `}

  input {
    color: ${p => p.theme.colors.grey};
    flex: 1;
    background: transparent;
    border: 0;
    &::placeholder {
      color: ${p => p.theme.colors.grey};
    }

    ${props =>
    props.isFocused &&
    css`
          color: ${p => p.theme.colors.orange};
        `}
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
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
