import { createContext, useState, ReactNode, useContext, useEffect } from "react";

import { api } from "../services/apiClient";

interface ICategory {
  id: string;
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
}

const CategoriesContext = createContext<ICategoryContext>({} as ICategoryContext);

const CategoryProvider = ({ children }: ICategoryProvider) => {
  const [categories, setCategories] = useState<ICategory[]>([] as ICategory[])

  useEffect(() => {
    loadCategories();
  }, [])

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
      categories
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