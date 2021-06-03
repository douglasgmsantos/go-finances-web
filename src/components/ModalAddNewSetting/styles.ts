import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
    background: ${p => p.theme.colors.background};
    border-radius: 13px;
    padding: 10px;
`;

export const Title = styled.div`
  padding: 15px 0;
  font-size: 24px;
  color: ${p => p.theme.colors.orange};
`;

export const SubmitContainer = styled.div`
    display: flex;
    flex-direction: row-reverse;
`;

interface IBtnForm {
  themeReverse?: boolean;
}

export const BtnForm = styled.button<IBtnForm>`
  margin: 15px 2px;
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;
  height: 60px;
  background: ${p => p.theme.colors.orange};
  color: ${p => p.theme.colors.white};
  border: none;
  border-radius: 5px;
  text-transform: uppercase;

  :disabled{
    cursor: initial;
  }

  &:hover, :focus , :disabled{
    color: ${p => lighten(0.08, p.theme.colors.white)};
    background: ${p => lighten(0.08, p.theme.colors.orange)};
  }
`;


