import styled, { css } from 'styled-components';
import { tint } from 'polished';

interface SelectContainerProps {
  hasError: boolean;
}

export const Container = styled.div<SelectContainerProps>`
  font-weight: normal;
  margin-bottom: 0.5rem;
  
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
