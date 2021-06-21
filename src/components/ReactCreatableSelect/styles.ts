import styled, { css } from 'styled-components';
import { tint } from 'polished';
import Tooltip from '../Tooltip';

interface SelectContainerProps {
  hasError: boolean;
}

export const Container = styled.div<SelectContainerProps>`
  font-weight: normal;
  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.hasError &&
    css`
      .react-select__control {
        border: 2px solid ${props.theme.colors.red};
        &:hover {
          border: 2px solid ${tint(0.1, props.theme.colors.red)};
        }
      }
    `}
`;
