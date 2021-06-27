import React, { useRef, useCallback, useEffect } from 'react';

import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { CSSProperties } from 'styled-components';

import { BsCalendar, BsFileText } from 'react-icons/bs';
import { FiDollarSign } from 'react-icons/fi';

import Input from '../../components/Input'

import ReactCreatableSelect from '../ReactCreatableSelect';
import Select from '../Select';
import Modal from '../Modal';
import Button from '../Button';

import CategoryUserOption from '../CategoryUserOption';
import OptionDefault from '../OptionDefault';

import { useTheme } from '../../hooks/theme';
import { useToast } from '../../hooks/toast';
import { useTransaction, ICreateTransaction } from '../../hooks/useTransaction';
import { useCategory } from '../../hooks/useCategory';

import { getCustomSelectOptionsModal } from '../../utils/customSelectCategoryOption';
import validationErrorsYup from '../../utils/validate/validateErrorsYup';

import { Container, Title, SubmitContainer } from './styles';
import { OptionTypeBase, ActionMeta } from 'react-select';



interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}


const ModalAddNewTransaction: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen
}) => {
  const { theme } = useTheme();
  const { categories, loadCategories, createCategory } = useCategory();
  const { isLoading, createNewTransaction } = useTransaction();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  useEffect(() => loadCategories(), [])

  const handleSubmit = useCallback(async (formData: ICreateTransaction) => {

    try {
      formRef.current ?.setErrors({});
      const schema = Yup.object().shape({
        title: Yup.string().required('Título é obrigatório'),
        value: Yup.string().required('Valor é obrigatório'),
        category: Yup.string().required('Selecione uma categoria'),
        type: Yup.string().required('Selecione um tipo'),
        dt_reference: Yup.string().required('Selecione a data de referência'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      await createNewTransaction({
        ...formData,
        dt_reference: Number(String(formData.dt_reference).replaceAll("-",""))
      });
      setIsOpen();

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = validationErrorsYup(err);
        formRef.current ?.setErrors(errors);
        return;
      }

      if (err instanceof Error)
        addToast({
          type: 'error',
          title: 'Atenção',
          description: "Ocorreu um erro na criação de uma nova transação."
        });

    }

  }, [addToast, setIsOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <Title>Nova Transação</Title>
        <Form ref={formRef} onSubmit={handleSubmit} action="">
          <Input name="title" type="text" placeholder="Título" icon={BsFileText} />
          <Input name="value" type="number" placeholder="Valor" min="0.00" step="0.01" icon={FiDollarSign}/>
          <Input name="dt_reference" type="date" placeholder="Data de referênca" icon={BsCalendar} />
          <ReactCreatableSelect
            styles={{
              ...getCustomSelectOptionsModal(theme),
              valueContainer: (provided: CSSProperties) => ({
                ...provided,
              }),
              menuList: (provided: CSSProperties) => ({
                ...provided,
                padding: '5px',
                display: 'grid',
                gridTemplateColumns:
                  '1fr',
              }),
            }}
            defaultOptions
            name="category"
            keyField="title"
            placeholder="Selecione uma categorias"
            options={categories}
            components={{
              Option: CategoryUserOption,
              SingleValue: CategoryUserOption,
            }}

            onChange={async (newValue: OptionTypeBase, actionMeta: ActionMeta<OptionTypeBase>) => {
              if (actionMeta.action == "create-option") {
                await createCategory({
                  background_color_dark: theme.colors.orange,
                  background_color_light: theme.colors.purple,
                  icon: "fa/FaMoneyBillAlt",
                  title: newValue.label
                });
              }
            }}
          />
          <Select
            styles={{
              ...getCustomSelectOptionsModal(theme),
              valueContainer: (provided: CSSProperties) => ({
                ...provided,
              }),
              menuList: (provided: CSSProperties) => ({
                ...provided,
                padding: '5px',
                display: 'grid',
                gridTemplateColumns:
                  '1fr',
              }),
            }}
            defaultOptions
            name="type"
            keyField="type"
            placeholder="Selecione um tipo"
            options={[
              { type: "income", label: "Entrada", icon: "fa/FaRegArrowAltCircleUp" },
              { type: "outcome", label: "Saida", icon: "fa/FaRegArrowAltCircleDown" }
            ]}
            components={{
              Option: OptionDefault,
              SingleValue: OptionDefault,
            }}
          />
          <SubmitContainer>
            <Button type="submit" loading={isLoading}> Salvar</Button>
            <Button type="button" className="btn-secondary" onClick={() => setIsOpen()} > Cancelar </Button>
          </SubmitContainer>
        </Form>

      </Container>
    </Modal>
  )
}

export default ModalAddNewTransaction;
