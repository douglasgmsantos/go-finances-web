import React, { useContext, useRef } from 'react';
import { FormHandles } from '@unform/core';

import { TransactionsContext } from '../../hooks/useTransaction';
import { CategoriesContext } from '../../hooks/useCategory';
import { useTheme } from '../../hooks/theme';

import Input from '../Input';
import Button from '../Button';
import Select from '../Select';

import getCustomSelectOptions from '../../utils/customSelectOption';

import { Container } from './styles';
import OptionDefault from '../OptionDefault';
import { BsTrash } from 'react-icons/bs';
import CategoryUserOption from '../CategoryUserOption';
import { OptionTypeBase } from 'react-select';

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
  const {theme} = useTheme();
  const formRef = useRef<FormHandles>(null);

  return (
    <Container ref={formRef} onSubmit={()=>{}}>
      <Select
          styles={getCustomSelectOptions(theme)}
          defaultOptions
          name="type"
          keyField="type"
          placeholder="Categorias"
          options={categories}
          components={{
            Option: CategoryUserOption,
            SingleValue: CategoryUserOption,
          }}
          onChange={(value:OptionTypeBase, _)=>{
            handleFilterCategory(value ? value.id : "")
          }}
        />

        <Select
          styles={getCustomSelectOptions(theme)}
          defaultOptions
          name="type"
          keyField="type"
          placeholder="Tipo"
          options={[
            { type: "income", label: "Entrada", icon: "fa/FaRegArrowAltCircleUp" },
            { type: "outcome", label: "Saida", icon: "fa/FaRegArrowAltCircleDown" }
          ]}
          components={{
            Option: OptionDefault,
            SingleValue: OptionDefault,
          }}
          onChange={(value:OptionTypeBase, _)=>{
            handleFilterType(value ? value.type : "all")
          }}
        />
          
      <Input name="dt_init" type="date" value={dtInitTransaction} onChange={(e) => handleDtInit(e.target.value)} placeholder="Data inicial" />
      <Input name="dt_end"  type="date" value={dtEndTransaction}  onChange={(e) => handleDtEnd(e.target.value)} placeholder="Data final" />
      <Button type="button" onClick={emptyFilter}>
        <BsTrash size={25}/>
      </Button>
    </Container>
  )
}

export default TransactionFilter;