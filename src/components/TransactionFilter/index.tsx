import React, { useContext } from 'react';

import { TransactionsContext } from '../../hooks/useTransaction';
import { CategoriesContext } from '../../hooks/useCategory';

import { Container } from './styles';

const TransactionFilter: React.FC = () => {
  const { categories } = useContext(CategoriesContext);
  const {
    filterCategoryTransaction,
    filterTypeTransaction,
    dtInitTransaction,
    dtEndTransaction,
    handleFilterType,
    handleFilterCategory,
    handleDtInit,
    handleDtEnd,
    emptyFilter
  } = useContext(TransactionsContext);

  return (
    <Container>
      <select defaultValue="all" onChange={(e) => handleFilterType(e.target.value)}>
        <option selected={filterTypeTransaction === "all"} value="all">Todos</option>
        <option selected={filterTypeTransaction === "income"} value="income">Entrada</option>
        <option selected={filterTypeTransaction === "outcome"} value="outcome">Saída</option>
      </select>
      <select defaultValue={filterCategoryTransaction} onChange={(e) => handleFilterCategory(e.target.value)}>
        <option value="">Todas</option>
        {categories && categories.map(category => (
          <option key={category.id} value={category.id}>{category.title}</option>
        ))}
      </select>
      <input type="date" value={dtInitTransaction} onChange={(e) => handleDtInit(e.target.value)} placeholder="Data inicial" />
      <input type="date" value={dtEndTransaction} onChange={(e) => handleDtEnd(e.target.value)} placeholder="Data final" />
      <button onClick={emptyFilter}> Limpar Filtros </button>
    </Container>
  )
}

export default TransactionFilter;