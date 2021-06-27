import React, { useContext } from 'react';

import { TransactionsContext } from '../../hooks/useTransaction';
import {FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaDollarSign} from 'react-icons/fa';

import { CardContainer, Card } from './styles';

const Summary: React.FC = () => {
  const { summary } = useContext(TransactionsContext);
  return (
    <>
      <CardContainer>
        <Card>
          <header>
            <p>Entradas</p>
            <FaRegArrowAltCircleUp className="income" size={32}/>
          </header>
          <h1>{summary.incomeFormatted}</h1>
        </Card>
        <Card>
          <header>
            <p>Saídas</p>
            <FaRegArrowAltCircleDown className="outcome" size={32}/>
          </header>
          <h1>{summary.outcomeFormatted}</h1>
        </Card>
        <Card total>
          <header>
            <p>Total</p>
            <FaDollarSign size={32} />
          </header>
          <h1>{summary.totalFormatted}</h1>
        </Card>
      </CardContainer>
    </>
  )
}

export default Summary;