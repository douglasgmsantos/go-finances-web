import React, { useContext } from 'react';

import { TransactionsContext } from '../../hooks/useTransaction';

import formatValue from '../../utils/formatValue';

import { CardContainer, Card } from './styles';

const Summary: React.FC = () => {
  const { summary } = useContext(TransactionsContext);
  return (
    <>
      <CardContainer>
        <Card>
          <header>
            <p>Entradas</p>
            <img src="/income.svg" alt="Income" />
          </header>
          <h1 data-testid="balance-income">{summary.incomeFormatted}</h1>
        </Card>
        <Card>
          <header>
            <p>Saídas</p>
            <img src="/outcome.svg" alt="Outcome" />
          </header>
          <h1 data-testid="balance-outcome">{summary.outcomeFormatted}</h1>
        </Card>
        <Card total>
          <header>
            <p>Total</p>
            <img src="/total.svg" alt="Total" />
          </header>
          <h1 data-testid="balance-total">{summary.totalFormatted}</h1>
        </Card>
      </CardContainer>
    </>
  )
}

export default Summary;