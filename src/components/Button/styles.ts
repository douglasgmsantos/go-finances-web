import styled from 'styled-components';
import { lighten } from "polished";

export const Container = styled.button`
  width: 100%;
  margin: 0 2px;
  padding: 15px;
  border-radius: 10px;
  height: 60px;
  border: none;
  border-radius: 5px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${p => p.theme.colors.orange};
  color: ${p => p.theme.colors.white};

  svg {
    color: ${p => p.theme.colors.white};
  }

  :disabled{
    cursor: initial;
  }

  &:hover, :focus , :disabled{
    color: ${p => lighten(0.08, p.theme.colors.white)};
    background: ${p => lighten(0.08, p.theme.colors.orange)};
  }

  &.btn-secondary{
    background: ${p => p.theme.colors.purple};
    color: ${p => p.theme.colors.white};

    svg {
      color: ${p => p.theme.colors.white};
    }

    :disabled{
      cursor: initial;
    }

    &:hover, :focus , :disabled{
      color: ${p => lighten(0.08, p.theme.colors.white)};
      background: ${p => lighten(0.08, p.theme.colors.purple)};
    }
  }

`;
