import React, { useEffect, useContext } from 'react';

import { FiPlus } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import * as Icons from 'react-icons/fa';

import { TransactionsContext } from '../../hooks/useTransaction';
import { useTheme } from '../../hooks/theme';

import Tooltip from '../Tooltip';

import {
  TableContainer,
  MessageEmpty,
  BtnAddNewTransaction,
  BtnDeleteTransaction,
  IconContainer
} from './styles';


const TransactionTable: React.FC = () => {
  const { theme } = useTheme();
  const { transactions, deleteTransaction, loadTransactions } = useContext(TransactionsContext);

  useEffect(() => {
    loadTransactions();
  }, [])

  return (
    <>
      {!Boolean(transactions.length) ? <MessageEmpty>Não há dados cadastros</MessageEmpty>
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
              {transactions && transactions.map(transaction => {
                const [, iconName] = transaction.category.icon ? transaction.category.icon.split('/') : ["", "FaMoneyBillAlt"];
                const Icon = (Icons as any)[iconName];
                return (
                  <tr key={transaction.id}>
                    <td className={transaction.type}>{transaction.title}</td>
                    <td className={transaction.type}>{transaction.type === "outcome" ? "-" : ""} {transaction.value_format}</td>
                    <td className="icon" >
                      <IconContainer>
                        <Icon size={25} color={theme.title === 'light' ? transaction.category.background_color_light : transaction.category.background_color_dark} /> {transaction.category.title}
                      </IconContainer>
                    </td>
                    <td>{transaction.created_at}</td>
                    <td>
                      <BtnDeleteTransaction onClick={() => deleteTransaction(transaction.id)}>
                        <FaTrashAlt size={25} />
                      </BtnDeleteTransaction>
                    </td>
                  </tr>
                )
              })}
            </tbody>

          </table>
        </TableContainer>}
    </>
  );
}

export default TransactionTable;