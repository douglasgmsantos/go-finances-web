import { tint } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  padding: 1rem;
  width: 95%;
  cursor: pointer;

  svg {
    color: ${p => p.theme.colors.orange};
  }

  :hover{
    background:${ p=> tint(0.9, p.theme.colors.orange)};
  }
`;
