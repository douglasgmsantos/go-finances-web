import React, { useState, useCallback, useContext } from 'react';
import * as Icons from 'react-icons/fa';

import { FiPlus } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';

import { api } from "../../services/apiClient";

import { useTheme } from '../../hooks/theme';
import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';
import Tooltip from '../../components/Tooltip';
import ModalAddNewSetting from '../../components/ModalAddNewSetting';

import { CategoriesContext } from '../../hooks/useCategory';

import { Title, Container, TableContainer, BtnAddNewSetting, Square, SquareContainer, BtnDeleteCategory } from '../../styles/components/configuracoes/styles';

const Configuracoes: React.FC = () => {
  const { theme } = useTheme();
  const { addToast } = useToast();

  const { categories, loadCategories } = useContext(CategoriesContext)

  const [openModal, setOpenModal] = useState(false);
  const toggleModal = useCallback(() => setOpenModal(openModal ? false : true), [openModal]);

  const onSubmitted = useCallback(() => {
    addToast({
      type: 'success',
      title: 'Parabéns',
      description: 'A categoria foi adicionada com sucesso.'
    });

    toggleModal();
    loadCategories();
  }, [addToast, loadCategories, toggleModal])

  const handleDeleteCategory = useCallback(async (id: string) => {
    try {
      const { data: { success, message } } = await api.delete(`/categories/${id}`);
      if (!success)
        throw new Error(message);

      addToast({
        type: 'info',
        title: 'Atenção',
        description: 'Categoria excluída com sucesso.'
      });

      loadCategories();
    } catch (err) {
      if (err instanceof Error)
        addToast({
          type: 'error',
          title: 'Atenção',
          description: err.message
        });
    }

  }, [addToast, loadCategories]);

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Configurações</Title>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Ícone</th>
                <th>Tema escuro</th>
                <th>Tema claro</th>
                <th>
                  <BtnAddNewSetting onClick={() => toggleModal()}>
                    <Tooltip title="Adicionar categoria">
                      <FiPlus />
                    </Tooltip>
                  </BtnAddNewSetting>
                </th>
              </tr>
            </thead>

            <tbody>
              {categories && categories.map(category => {
                const [, iconName] = category.icon.split('/');
                const Icon = (Icons as any)[iconName];

                return (
                  <tr key={category.id}>
                    <td className="title">{category.title}</td>
                    <td> <Icon size={25} color={theme.title === 'light' ? category.background_color_light : category.background_color_dark} /></td>
                    <td>
                      <SquareContainer>
                        <Square background={category.background_color_dark} />{category.background_color_dark}
                      </SquareContainer>
                    </td>
                    <td>
                      <SquareContainer>
                        <Square background={category.background_color_light} />{category.background_color_light}
                      </SquareContainer>
                    </td>
                    <td>
                      <BtnDeleteCategory onClick={() => handleDeleteCategory(category.id)}>
                        <FaTrashAlt size={25} />
                      </BtnDeleteCategory>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </TableContainer>
      </Container>
      <ModalAddNewSetting
        isOpen={openModal}
        setIsOpen={toggleModal}
        onSubmitted={onSubmitted}
      />
    </>
  )
}

export default Configuracoes;
