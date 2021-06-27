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

