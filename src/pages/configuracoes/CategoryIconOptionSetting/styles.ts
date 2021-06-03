import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  svg {
    transition: color 0.2s ease;
    vertical-align: middle;
    color: ${props => props.theme.title === 'light' ? props.theme.colors.primary : props.theme.colors.orange};

    &:hover {
      cursor: pointer;
      color: ${props => props.theme.title === 'light' ? props.theme.colors.orange : props.theme.colors.white};
    }
  }
`;
