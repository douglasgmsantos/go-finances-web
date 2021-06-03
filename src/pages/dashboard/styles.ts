import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const BtnDeleteTransaction = styled.button`
  background: transparent;
  border: none;

  svg {
    color: ${p => p.theme.title === 'light' ? p.theme.colors.primary : p.theme.colors.white};
  }
`;

export const BtnAddNewTransaction = styled.button`
  display: flex;
  align-items:center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: 1px solid ${p => p.theme.colors.primary};
  background: ${p => p.theme.colors.primary};
  color: #FFF;
`;



export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: -150px;
`;

export const Card = styled.div<CardProps>`
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

export const MessageEmpty = styled.div`
  text-align: center;
  padding: 100px;
`;

export const IconContainer = styled.section`
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
`;

export const TableContainer = styled.section`
  margin-top: 20px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: ${p => p.theme.title === 'light' ? p.theme.colors.dark : p.theme.colors.orange};
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    tbody {

      tr {

        td {
          padding: 20px 32px;
          background: ${p => p.theme.title === 'light' ? p.theme.colors.white : p.theme.colors.orange};
          font-size: 16px;
          font-weight: normal;
          color: ${p => p.theme.colors.dark};

          &.title {
            font-weight: bold;
            color: ${p => p.theme.colors.dark};
          }

          &.icon {

          }

          &.income {
            color: ${p => p.theme.colors.green};
          }

          &.outcome {
            color: ${p => p.theme.colors.red};
          }

          &:first-child {
            color: ${p => p.theme.colors.dark};

            &.income {
              font-weight: bold;
              border-left: 3px solid ${p => p.theme.colors.green};
            }

            &.outcome {
              font-weight: bold;
              border-left: 3px solid ${p => p.theme.colors.red};
            }

            border-left: 3px solid red;
            border-radius: 8px 0 0 8px;
          }

          &:last-child {
            border-radius: 0 8px 8px 0;
          }

        }

      }
    }

  }
`;
