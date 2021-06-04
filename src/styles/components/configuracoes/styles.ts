import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 36px;
  line-height: 54px;
  color: ${p => p.theme.title === 'light' ? p.theme.colors.dark : p.theme.colors.orange};
  text-align: left;
`;

export const BtnAddNewSetting = styled.button`
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

interface ISquare {
  background: string;
}

export const SquareContainer = styled.div`
  display: flex;
  align-items:center;
`;

export const Square = styled.div<ISquare>`
  padding: 5px;
  width: 15px;
  height: 15px;
  border-radius: 5px;
  margin: 0 5px;
  background-color: ${props => props.background};
`;

export const BtnDeleteCategory = styled.button`
  background: transparent;
  border: none;

  svg {
    color: ${p => p.theme.title === 'light' ? p.theme.colors.primary : p.theme.colors.white};
  }
`;

export const TableContainer = styled.section`
  margin-top: 64px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
      color: ${p => p.theme.title === 'light' ? p.theme.colors.dark : p.theme.colors.orange};
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: ${p => p.theme.title === 'light' ? p.theme.colors.white : p.theme.colors.orange};
      font-size: 16px;
      font-weight: normal;
      color: ${p => p.theme.colors.dark};

      &.title {
        color: ${p => p.theme.colors.grey};
      }

      &.income {
        color: ${p => p.theme.colors.grey};
      }

      &.outcome {
        color: ${p => p.theme.colors.grey};
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;
