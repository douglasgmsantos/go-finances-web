import React from 'react';

import { useTransaction } from '../../hooks/useTransaction';
import { useTheme } from '../../hooks/theme';

import formatValue from '../../utils/formatValue';

import { CardContainer, Card } from './styles';

const Summary: React.FC = () => {
  const { transactions } = useTransaction();
  const { theme } = useTheme();

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type == "income") {
      acc.deposits += parseFloat(transaction.value);
      acc.total += parseFloat(transaction.value);
    } else {
      acc.withdraws -= parseFloat(transaction.value);
      acc.total -= parseFloat(transaction.value);
    }

    return acc;
  }, {
      deposits: 0,
      withdraws: 0,
      total: 0
    })

  return (
    <>
      <CardContainer>
        <Card>
          <header>
            <p>Entradas</p>
            <img src="/income.svg" alt="Income" />
          </header>
          <h1 data-testid="balance-income">{formatValue(Number(summary.deposits))}</h1>
        </Card>
        <Card>
          <header>
            <p>Saídas</p>
            <img src="/outcome.svg" alt="Outcome" />
          </header>
          <h1 data-testid="balance-outcome">{formatValue(Number(summary.withdraws))}</h1>
        </Card>
        <Card total>
          <header>
            <p>Total</p>
            <img src="/total.svg" alt="Total" />
          </header>
          <h1 data-testid="balance-total">{formatValue(Number(summary.total))}</h1>
        </Card>
      </CardContainer>
    </>
  )
}

export default Summary;