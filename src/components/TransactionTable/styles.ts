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

export const BtnAddNewTransactionLine = styled(BtnAddNewTransaction)`
  width: auto;
  padding: 1rem;
`


export const MessageContainer = styled.div`
  text-align: center;
  padding: 100px;
  display: flex;
  justify-content: center;
`;

export const IconContainer = styled.section`
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
`;

export const TableContainer = styled.div`
  margin-top: 10px;

  .container-paginate{
    display: flex;
    justify-content:center;
    margin: 10px;

    .pagination {
      display: flex;

      li + li {
        margin-left: 5px;
      }

      li {
        cursor: pointer;
        list-style: none;

        a {
          padding: 8px;
          border-radius: 6px;
          background: ${p => p.theme.colors.orange};
          color: ${p => p.theme.colors.white};
        }

        &.active {
          cursor: not-allowed;
          a {
            background: ${p => p.theme.colors.white};
            color: ${p => p.theme.colors.orange};
          }
        }

        &.disabled { 
          cursor:not-allowed;
        }

        &.disabled, &:hover {
          a {
            filter: brightness(0.9);
          }
        }
      }

    }

  }


  table {
    width: 100%;
    border-spacing: 0 8px;

    thead{

      tr {
        th {
          background: ${p => p.theme.title === 'light' ? p.theme.colors.white : p.theme.colors.orange};
          padding: 20px 32px;
          font-size: 16px;
          font-weight: normal;
          color: ${p => p.theme.colors.dark};

          font-weight: normal;
          padding: 10px 32px;
          text-align: left;
          font-size: 16px;
          line-height: 24px;

           &:first-child {
            border-radius: 8px 0 0 8px;
          }

          &:last-child {
            border-radius: 0 8px 8px 0;
          }

        }
      }
    }


    tbody {

      tr {

        td {
          padding: 15px 32px;
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
