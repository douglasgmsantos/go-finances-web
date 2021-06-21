import React, { useRef, useCallback, useState } from 'react';
import ReactLoading from 'react-loading';

import * as Yup from 'yup';

import * as IconsFa from 'react-icons/fa';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { CSSProperties } from 'styled-components';

import { api } from "../../services/apiClient";

import Input from '../../components/Input'

import Select from '../Select';
import Modal from '../Modal';
import InputColor from '../InputColor';

import { useTheme } from '../../hooks/theme';
import { useToast } from '../../hooks/toast';

import { getCustomSelectOptionsModal } from '../../utils/customSelectCategoryOption';
import validationErrorsYup from '../../utils/validate/validateErrorsYup';

import CategoryIconOptionConfig from '../../components/CategoryIconOptionSetting';

import { Container, Title, BtnForm, SubmitContainer } from './styles';


interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  onSubmitted: () => void;
}

interface AddCategoryFormData {
  title: string;
  icon: string;
  background_color_dark: string;
  background_color_light: string;
}


const ModalAddNewSetting: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  onSubmitted
}) => {

  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { theme } = useTheme();
  const formRef = useRef<FormHandles>(null);

  const Icons = {
    ...(IconsFa as any),
  };

  const icons = Object.keys(Icons as any).map(icon => {
    const id = `${icon.substring(0, 1).toLowerCase()}/${icon}`;
    return {
      id,
      Component: (Icons as any)[id],
    };
  });

  const loadCategoryOptions = useCallback(
    (inputValue: string, callback: Function) => {
      setTimeout(
        () =>
          callback(
            icons
              .filter(icon =>
                icon.id.toLowerCase().includes(inputValue.toLowerCase()),
              )
              .splice(0, 77),
          ),
        1000,
      );
    },
    [icons],
  );

  const LoadingSpinner = (
    <ReactLoading
      type="spin"
      color={theme.colors.orange}
      width={25}
      height={25}
    />
  );

  const handleSubmit = useCallback(async (formData: AddCategoryFormData) => {

    try {
      formRef.current ?.setErrors({});
      setIsLoading(true);

      const schema = Yup.object().shape({
        title: Yup.string().required('Título é obrigatório'),
        icon: Yup.string().required('Ícone é obrigatório'),
        background_color_dark: Yup.string().required(
          'Tema escuro é obrigatória',
        ),
        background_color_light: Yup.string().required(
          'Tema claro é obrigatória',
        ),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      const { data: { success, message } } = await api.post('/categories', formData);
      if (!success)
        throw new Error(message);

      onSubmitted();

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
          description: err.message
        });

    } finally {
      setIsLoading(false);
      setIsOpen();
    }

  }, [addToast, setIsOpen, onSubmitted, setIsLoading])

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <Title>Nova Categoria</Title>
        <Form ref={formRef} onSubmit={handleSubmit} action="">
          <Input name="title" type="text" placeholder="Título" />
          <Select
            async
            cacheOptions
            styles={{
              ...getCustomSelectOptionsModal(theme),
              menuList: (provided: CSSProperties) => ({
                ...provided,
                padding: '5px',
                display: 'grid',
                gridTemplateColumns:
                  '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
                rowGap: '10px',
              }),
            }}
            defaultOptions
            loadOptions={loadCategoryOptions}
            name="icon"
            keyField="id"
            placeholder="Ícone"
            options={icons}
            components={{
              Option: CategoryIconOptionConfig,
              SingleValue: CategoryIconOptionConfig,
            }}
          />
          <InputColor name="background_color_dark" placeholder="Tema escuro" />
          <InputColor name="background_color_light" placeholder="Tema claro" />

          <SubmitContainer>
            <BtnForm type="submit">
              {isLoading ? LoadingSpinner : 'Enviar'}
            </BtnForm>
            <BtnForm onClick={() => setIsOpen()}>Cancelar</BtnForm>
          </SubmitContainer>
        </Form>

      </Container>
    </Modal>
  )
}

export default ModalAddNewSetting;
