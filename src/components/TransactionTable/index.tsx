import React, { useEffect, useContext, useState, useCallback } from 'react';

import ReactLoading from 'react-loading';

import { FiPlus } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';

import * as Icons from 'react-icons/fa';

import { useTheme } from '../../hooks/theme';
import { TransactionsContext } from '../../hooks/useTransaction';

import Tooltip from '../Tooltip';
import { Paginate } from '../Paginate';

import TransactionFilter from '../TransactionFilter';
import ModalAddNewTransaction from '../ModalAddNewTransaction';

import {
  TableContainer,
  MessageContainer,
  BtnAddNewTransaction,
  BtnDeleteTransaction,
  IconContainer,
  BtnAddNewTransactionLine
} from './styles';


const TransactionTable: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = useCallback(() => setOpenModal(openModal ? false : true), [openModal]);

  const { theme } = useTheme();
  const {
    pageTransaction,
    setPageTransaction,
    isLoading,
    loadTransactions,
    transactions,
    totalTransactions,
    deleteTransaction: onDeleteTransaction
  } = useContext(TransactionsContext);

  useEffect(() => {
    loadTransactions();
  }, [pageTransaction])

  const handleDeleteTransaction = async (id: string) => {
    await onDeleteTransaction(id);
  }

  return (
    <>
      <TransactionFilter />
      {!Boolean(totalTransactions) && (
        <MessageContainer>
          <BtnAddNewTransactionLine onClick={() => toggleModal()}>
            <Tooltip title={"Nova transação"}>
              Adicione um transação para começar.
            </Tooltip>
          </BtnAddNewTransactionLine>

        </MessageContainer>
      )}
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
                      <BtnAddNewTransaction onClick={() => toggleModal()}>
                        <Tooltip title={"Nova transação"}>
                          <FiPlus />
                        </Tooltip>
                      </BtnAddNewTransaction>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(transaction => {
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
                        <td>{transaction.dt_reference_format}</td>
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
                <Paginate
                  page={pageTransaction}
                  pageCount={totalTransactions / 5}
                  pageChange={setPageTransaction}
                />
              </div>
            </TableContainer>))
      }
      <ModalAddNewTransaction
        isOpen={openModal}
        setIsOpen={toggleModal}
      />
    </>
  );
}

export default TransactionTable;