import styled from 'styled-components';

export const Container = styled.div`
  margin: 1rem 0;
  width: 100%;
  height: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, auto));
  grid-gap: 0.5rem;
  margin-bottom: 1rem;

  select, input , button{
    max-width: 30rem;
    width: auto;
    height: 4rem;
    padding: 0.5rem 3rem 0.5rem 2rem;
    border-radius: 0.50rem;
    border: 0;
    color: ${p => p.theme.colors.dark};
    background: ${p => p.theme.colors.white};
    font-size: ${p => p.theme.fontSizes.default};
  }
  button {
    color:${p => p.theme.colors.white};
    background: ${p => p.theme.colors.purple};
    transition: filter 0.2s;
    &:hover{
      filter: brightness(0.9);
    }
  }
`;