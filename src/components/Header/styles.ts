import styled from 'styled-components';
import Link from 'next/link';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: ${p => p.theme.colors.primary};
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      display:flex;
      align-items:center;

      a {
        color: ${p => p.theme.title === 'light' ? p.theme.colors.white : p.theme.colors.dark};
        text-decoration: none;
        font-size: 16px;
        transition: opacity 0.2s;
        padding: 8px;
        border-radius: 8px;

        &.active {
          background: ${p => p.theme.title === 'light' ? p.theme.colors.orange : p.theme.colors.dark};
          color: ${p => p.theme.title === 'light' ? p.theme.colors.white : p.theme.colors.orange};
        }

        & + a {
          margin-left: 32px;
        }

        &:hover {
          background: ${p => p.theme.title === 'light' ? p.theme.colors.orange : p.theme.colors.dark};
          color: ${p => p.theme.title === 'light' ? p.theme.colors.white : p.theme.colors.orange};
        }
      }
    }
  }
`;

export const Logout = styled.button`
  display: flex;
  align-items: center;
  background: ${p => p.theme.title === 'light' ? p.theme.colors.orange : p.theme.colors.dark};
  padding: 4px 8px;
  border-radius: 8px;
  margin-left: 32px;
  border: none;

  color: ${p => p.theme.title === 'light' ? p.theme.colors.white : p.theme.colors.orange} !important;
  svg {
    color: ${p => p.theme.title === 'light' ? p.theme.colors.white : p.theme.colors.orange};
  }
`;
