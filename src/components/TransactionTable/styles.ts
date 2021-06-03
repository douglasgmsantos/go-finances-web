import styled from 'styled-components';


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

export const TableContainer = styled.div`
  margin-top: 20px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    thead{

      tr {

        th {
          font-weight: normal;
          padding: 20px 32px;
          text-align: left;
          font-size: 16px;
          line-height: 24px;

        }
      }
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
