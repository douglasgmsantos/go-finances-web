import { createContext, useState, useEffect, ReactNode, useContext } from "react";

import { Omit } from "yargs";

import api from "../services/api";

import { useToast } from "./toast";

import formatValue from "../utils/formatValue";
import formatDate from "../utils/formatDate";

interface ITransaction {
  id?: string;
  title?: string;
  type?: 'income' | 'outcome';
  value?: string;
  value_format?: string;
  category?: {
    title?: string;
    background_color_light?: string;
    background_color_dark?: string;
    icon?: string;
  };
  created_at?: string;
}


type ICreateTransaction = Omit<ITransaction, 'id' | 'createdAt'>

interface ITransactionProvider {
  children: ReactNode
}

interface ITransactionContext {
  transactions: ITransaction[];
  createNewTransaction(transaction: ICreateTransaction): Promise<void>;
  deleteTransaction(id: string): Promise<void>;
  loadTransactions(): Promise<void>;
}

const TransactionsContext = createContext<ITransactionContext>({} as ITransactionContext);

export const TransactionProvider = ({ children }: ITransactionProvider) => {
  const { addToast } = useToast();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    api.get('/transactions')
      .then(response => {
        setTransactions(response.data.result.transactions.map(transaction => {
          transaction.value_format = formatValue(Number(transaction.value))
          transaction.created_at = formatDate(transaction.created_at)
          transaction.category.background_color_light = transaction.category.background_color_light || "#000"
          transaction.category.background_color_dark = transaction.category.background_color_dark || "#FFF"
          return transaction
        }));
      })
  }

  const createNewTransaction = async (transactionCreate: ICreateTransaction) => {
    await api.post("/transactions", {
      ...transactionCreate,
      createdAt: new Date()
    })
      .then(response => {
        const { transaction } = response.data;
        setTransactions([...transactions, transaction])
      })

  }

  const deleteTransaction = async (id: string) => {
    try {
      const { data: { success, message } } = await api.delete(`/transactions/${id}`);
      if (!success)
        throw new Error(message);

      await loadTransactions();
      addToast({
        type: 'info',
        title: 'Atenção',
        description: 'Transação excluída com sucesso.'
      });

    } catch (err) {
      if (err instanceof Error)
        addToast({
          type: 'error',
          title: 'Atenção',
          description: err.message
        });
    }

  };

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createNewTransaction,
      deleteTransaction,
      loadTransactions
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransaction = () => {
  const context = useContext(TransactionsContext);

  return context;
}