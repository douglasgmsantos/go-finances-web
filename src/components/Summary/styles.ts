import styled from 'styled-components';


export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: -150px;
`;

interface ICard {
  total?: boolean;
}

export const Card = styled.div<ICard>`
  padding: 22px 32px;
  border-radius: 5px;
  background: ${p => (!p.total ? p.theme.colors.card_bg : p.theme.colors.orange)};
  color: ${p => (!p.total ? p.theme.colors.card_text : p.theme.colors.white)};
  border: 1px solid ${p => (!p.total ? p.theme.colors.card_bg : p.theme.title === 'light' ? p.theme.colors.primary : p.theme.colors.dark)};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }
`;