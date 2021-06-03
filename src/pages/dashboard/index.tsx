import React, { useState, useEffect, useCallback } from 'react';
import * as Icons from 'react-icons/fi';

import { FiPlus } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';

import api from '../../services/api';

import { useTheme } from '../../hooks/theme';
import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';
import Tooltip from '../../components/Tooltip';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import {
  Container,
  CardContainer,
  Card,
  TableContainer,
  MessageEmpty,
  BtnAddNewTransaction,
  BtnDeleteTransaction,
  IconContainer
} from './styles';


interface Transaction {
  id: string | null;
  title: string | null;
  value: number | null;
  formattedValue: string | null;
  formattedDate: string | null;
  type: 'income' | 'outcome';
  category: {
    title: string | null;
    background_color_light: string | null;
    background_color_dark: string | null;
    icon: string | null;
  };
  created_at: Date | null;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const { addToast } = useToast();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);


  const loadTransactions = useCallback(async () => {
    try {
      const { data: { success, message, result } } = await api.get(`/transactions`);
      if (!success)
        throw new Error(message);

      setBalance(result.balance);
      setTransactions(result.transactions);

    } catch (err) {
      if (err instanceof Error)
        addToast({
          type: 'error',
          title: 'Atenção',
          description: err.message
        });
    }
  }, [addToast])

  const handleDeleteTransaction = useCallback(async (id: string) => {
    try {
      const { data: { success, message } } = await api.delete(`/transactions/${id}`);
      if (!success)
        throw new Error(message);

      addToast({
        type: 'info',
        title: 'Atenção',
        description: 'Transação excluída com sucesso.'
      });

      loadTransactions();
    } catch (err) {
      if (err instanceof Error)
        addToast({
          type: 'error',
          title: 'Atenção',
          description: err.message
        });
    }

  }, [addToast, loadTransactions]);

  useEffect(() => {
    loadTransactions()
  }, [addToast, loadTransactions]);


  return (<>
    <Header />
    <Container>
      <CardContainer>
        <Card>
          <header>
            <p>Entradas</p>
            <img src="/income.svg" alt="Income" />
          </header>
          <h1 data-testid="balance-income">{Boolean(balance.income) ? formatValue(Number(balance.income)) : ''}</h1>
        </Card>
        <Card>
          <header>
            <p>Saídas</p>
            <img src="/outcome.svg" alt="Outcome" />
          </header>
          <h1 data-testid="balance-outcome">{Boolean(balance.outcome) ? formatValue(Number(balance.outcome)) : ''}</h1>
        </Card>
        <Card total>
          <header>
            <p>Total</p>
            <img src="/total.svg" alt="Total" />
          </header>
          <h1 data-testid="balance-total">{Boolean(balance.total) ? formatValue(Number(balance.total)) : ''}</h1>
        </Card>
      </CardContainer>

      {!Boolean(transactions.length) ?
        <MessageEmpty>Não há dados cadastros</MessageEmpty>
        : <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
                <th>
                  <BtnAddNewTransaction onClick={() => { }}>
                    <Tooltip title={"Nova transação"}>
                      <FiPlus />
                    </Tooltip>
                  </BtnAddNewTransaction>
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => {
                const [, iconName] = transaction.category.icon ? transaction.category.icon.split('/') : ["", ""];
                const Icon = (Icons as any)[iconName];

                return (
                  <tr key={transaction.id}>
                    <td className={transaction.type}>{transaction.title}</td>
                    <td className={transaction.type}>{transaction.type === "outcome" ? "-" : ""} {formatValue(Number(transaction.value))}</td>
                    <td className="icon" >
                      <IconContainer>
                        <Icon size={25} color={theme.title === 'light' ? transaction.category.background_color_light : transaction.category.background_color_dark} /> {transaction.category.title}
                      </IconContainer>
                    </td>
                    <td>{formatDate(transaction.created_at)}</td>
                    <td>
                      <BtnDeleteTransaction onClick={() => handleDeleteTransaction(transaction.id)}>
                        <FaTrashAlt size={25} />
                      </BtnDeleteTransaction>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </TableContainer>}

    </Container>
  </>);
};

export default Dashboard;
