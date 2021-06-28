import { createContext, useState, ReactNode, useContext, useEffect } from "react";

import { Omit } from "yargs";

import { api } from "../services/apiClient";

import { useToast } from "./toast";

import formatValue from "../utils/formatValue";
import formatDateInt from "../utils/formatDateInt";

import { firstDay } from "../utils/firstDay";
import { lastedDay } from "../utils/lastDay";

interface ITransaction {
  id?: string;
  title?: string;
  type?: 'income' | 'outcome';
  value?: string;
  value_format?: string;
  dt_reference_format?: string;
  dt_reference: number;
  category_id?: string;
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


export type ICreateTransaction = Omit<ITransaction, 'id' | 'createdAt' | 'category'>

interface ITransactionProvider {
  children: ReactNode
}

interface ITransactionContext {
  isLoading: boolean;
  summary: ISummary;
  totalTransactions: number;
  transactions: ITransaction[];
  pageTransaction: number;

  filterCategoryTransaction: string;
  filterTypeTransaction: string;
  dtInitTransaction: string;
  dtEndTransaction: string;
  handleFilterCategory(text: string): void;
  handleFilterType(text: string): void;
  handleDtInit(text: string): void;
  handleDtEnd(text: string): void;
  emptyFilter(): void;

  setPageTransaction(page: number): void;
  createNewTransaction(transaction: ICreateTransaction): Promise<void>;
  deleteTransaction(id: string): Promise<void>;
  loadTransactions(): void;
}

const TransactionsContext = createContext<ITransactionContext>({} as ITransactionContext);

const TransactionProvider = ({ children }: ITransactionProvider) => {
  //filtroe
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [dtInit, setDtInit] = useState(firstDay());
  const [dtEnd, setDtEnd] = useState(lastedDay());

  const [take, setTake] = useState(5);
  const [page, setPage] = useState(1);
  const { addToast } = useToast();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [summary, setSummary] = useState({ income: 0, outcome: 0, total: 0 } as ISummary);
  const [isLoading, setIsLoading] = useState(false);

  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    loadTransactions();
  }, [
      filterCategory,
      filterType,
      dtInit,
      dtEnd
    ])

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/transactions', {
        params: {
          page,
          take,
          category_id: filterCategory,
          type: filterType,
          dt_init: dtInit.replace(/[^0-9]/g, ''),
          dt_end: dtEnd.replace(/[^0-9]/g, '')
        }
      });

      if (!response.data.success)
        return;

      const transactions = response.data.result.transactions.map((transaction : ITransaction) => {
        transaction.dt_reference_format = formatDateInt(transaction.dt_reference);
        transaction.value_format = formatValue(Number(transaction.value))
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
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  }

  const createNewTransaction = async (formData: ICreateTransaction) => {
    await api.post("/transactions", {
      ...formData,
      createdAt: new Date()
    })
      .then(response => {
        if (!response.data.success) {
          addToast({
            type: 'error',
            title: 'Atenção',
            description: response.data.message
          });
          return;
        }

        addToast({
          type: 'info',
          title: 'Parabéns',
          description: "Transação cadastrada com sucesso."
        });

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


  const emptyFilter = () => {
    setFilterCategory("")
    setFilterType("all")
    setDtInit("")
    setDtEnd("")
  }

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
      isLoading,
      filterCategoryTransaction: filterCategory,
      filterTypeTransaction: filterType,
      dtInitTransaction: dtInit,
      dtEndTransaction: dtEnd,
      handleFilterCategory: setFilterCategory,
      handleFilterType: setFilterType,
      handleDtInit: setDtInit,
      handleDtEnd: setDtEnd,
      emptyFilter
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