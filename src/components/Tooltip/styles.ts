import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  span {
    z-index: 1000;
    width: auto;
    min-width: 150px;
    background: ${p => p.theme.title === 'light' ? p.theme.colors.orange : p.theme.colors.white};
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    color: ${p => p.theme.title === 'light' ? p.theme.colors.white : p.theme.colors.orange};
    &::before {
      content: '';
      border-style: solid;
      border-color: ${p => p.theme.title === 'light' ? p.theme.colors.orange : p.theme.colors.white} transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
