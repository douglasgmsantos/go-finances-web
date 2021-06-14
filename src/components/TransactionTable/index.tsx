import React, { useEffect, useContext, useState } from 'react';
import ReactPaginate from 'react-paginate';

import ReactLoading from 'react-loading';

import { useMutation } from 'react-query';

import { FiPlus } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';

import * as Icons from 'react-icons/fa';

import { useTheme } from '../../hooks/theme';
import { TransactionsContext } from '../../hooks/useTransaction';

import Tooltip from '../Tooltip';

import { queryClient } from "../../services/queryClient";


import {
  TableContainer,
  MessageContainer,
  BtnAddNewTransaction,
  BtnDeleteTransaction,
  IconContainer
} from './styles';



const TransactionTable: React.FC = () => {
  const [page, setPage] = useState(0);

  const { theme } = useTheme();
  const { loadTransactions, totalTransactions, deleteTransaction: onDeleteTransaction } = useContext(TransactionsContext);

  const { data, isLoading, error, refetch } = loadTransactions(page);

  const deleteTransaction = useMutation(async (id: string) => {
    await onDeleteTransaction(id);
    return true;
  }, {
      onSuccess: () => {
        queryClient.invalidateQueries("transactions");
        setPage(0);
        refetch();
      }
    });

  const handleDeleteTransaction = async (id: string) => {
    await deleteTransaction.mutateAsync(id);
  }


  return (
    <>
      {!Boolean(totalTransactions) && <MessageContainer>Não há dados cadastros</MessageContainer>}
      {Boolean(totalTransactions) && (
        isLoading ? (
          <MessageContainer>
            <ReactLoading
              type="spin"
              color={theme.colors.orange}
              width={25}
              height={25}
            />

          </MessageContainer>
        ) : error ? (
          <MessageContainer>Falha ao obter dados dos usuários</MessageContainer>
        ) : (
              <TableContainer>
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
                    {data && data.map(transaction => {
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
                            <BtnDeleteTransaction onClick={() => handleDeleteTransaction(transaction.id)}>
                              <FaTrashAlt size={25} />
                            </BtnDeleteTransaction>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>

                </table>
                <div className="container-paginate">
                  <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(totalTransactions / 5)}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={({ selected }) => {
                      setPage(selected + 1)
                    }}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                  />
                </div>
              </TableContainer>))
      }
    </>
  );
}

export default TransactionTable;