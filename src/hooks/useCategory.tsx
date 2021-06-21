import { createContext, useState, ReactNode, useContext, useEffect } from "react";

import { api } from "../services/apiClient";
import { Omit } from "yargs";
import { useToast } from "./toast";

interface ICategory {
  id?: string;
  title?: string;
  background_color_light?: string;
  background_color_dark?: string;
  icon?: string;
}

interface ICategoryProvider {
  children: ReactNode
}

interface ICategoryContext {
  categories: ICategory[];
  loadCategories(): void;
  createCategory(data: ICreateCategory): void;
}

export type ICreateCategory = Omit<ICategory, 'id'>

const CategoriesContext = createContext<ICategoryContext>({} as ICategoryContext);

const CategoryProvider = ({ children }: ICategoryProvider) => {
  const [categories, setCategories] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    loadCategories();
  }, []);

  const createCategory = async ({ icon, title, background_color_dark, background_color_light }: ICreateCategory) => {
    const response = await api.post('/categories', {
      icon,
      title,
      background_color_dark,
      background_color_light
    });

    if (!response.data.success) {
      addToast({
        type: 'error',
        title: 'Atenção',
        description: "Ocorreu um erro na criação da categoria."
      });
      return;
    }

    loadCategories();
    addToast({
      type: 'info',
      title: 'Parabéns',
      description: "Uma nova categoria foi cadastrada."
    });
  }

  const loadCategories = async () => {
    try {
      const response = await api.get('/categories');

      if (!response.data.success) {
        setCategories([]);
        return;
      }

      setCategories(response.data.result);
    } catch (err) {
      setCategories([]);
    }
  }

  return (
    <CategoriesContext.Provider value={{
      categories,
      loadCategories,
      createCategory
    }}>
      {children}
    </CategoriesContext.Provider>
  )
}

const useCategory = () => {
  const context = useContext(CategoriesContext);

  return context;
}

export { CategoryProvider, CategoriesContext, useCategory };