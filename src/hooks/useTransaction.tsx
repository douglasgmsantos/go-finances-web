import { createContext, useState, ReactNode, useContext } from "react";

import { Omit } from "yargs";

import { api } from "../services/apiClient";

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

interface ISummary {
  outcome: number;
  income: number;
  total: number;
  outcomeFormatted: string;
  incomeFormatted: string;
  totalFormatted: string;
}


type ICreateTransaction = Omit<ITransaction, 'id' | 'createdAt'>

interface ITransactionProvider {
  children: ReactNode
}

interface ITransactionContext {
  isLoading: boolean;
  summary: ISummary;
  totalTransactions: number;
  transactions: ITransaction[];
  pageTransaction: number;
  setPageTransaction(page: number): void;
  createNewTransaction(transaction: ICreateTransaction): Promise<void>;
  deleteTransaction(id: string): Promise<void>;
  loadTransactions(): void;
}

const TransactionsContext = createContext<ITransactionContext>({} as ITransactionContext);

const TransactionProvider = ({ children }: ITransactionProvider) => {
  const [take, setTake] = useState(5);
  const [page, setPage] = useState(1);
  const { addToast } = useToast();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [summary, setSummary] = useState({ income: 0, outcome: 0, total: 0 } as ISummary);
  const [isLoading, setIsLoading] = useState(false);

  const [totalTransactions, setTotalTransactions] = useState(0);

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/transactions', {
        params: {
          page,
          take
        }
      });

      if (!response.data.success)
        return;

      const transactions = response.data.result.transactions.map(transaction => {
        transaction.value_format = formatValue(Number(transaction.value))
        transaction.created_at = formatDate(transaction.created_at)
        transaction.category.background_color_light = transaction.category.background_color_light || "#000"
        transaction.category.background_color_dark = transaction.category.background_color_dark || "#FFF"
        return transaction
      });

      let balance = response.data.result.balance;
      let total = response.data.result.total;

      balance.outcomeFormatted = formatValue(balance.outcome);
      balance.incomeFormatted = formatValue(balance.income);
      balance.totalFormatted = formatValue(balance.total);

      const newPage = Math.ceil(total / take);


      setPage(newPage < page ? newPage : page);
      setTransactions(transactions);
      setTotalTransactions(total);
      setSummary(balance);

    } catch (err) {
      setPage(1);
      return []
    } finally {
      setIsLoading(false);
    }
  }

  const createNewTransaction = async (transactionCreate: ICreateTransaction) => {
    await api.post("/transactions", {
      ...transactionCreate,
      createdAt: new Date()
    })
      .then(response => {
        loadTransactions();
      })

  }

  const deleteTransaction = async (id: string) => {
    try {
      const { data: { success, message } } = await api.delete(`/transactions/${id}`);
      if (!success)
        throw new Error(message);

      loadTransactions();
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
      pageTransaction: page,
      setPageTransaction: setPage,
      transactions,
      createNewTransaction,
      deleteTransaction,
      loadTransactions,
      totalTransactions,
      summary,
      isLoading
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

const useTransaction = () => {
  const context = useContext(TransactionsContext);

  return context;
}

export { TransactionProvider, TransactionsContext, useTransaction };