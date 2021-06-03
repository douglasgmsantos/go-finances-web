import { CSSProperties } from 'styled-components';
import { shade, tint } from 'polished';
import Theme from '../styles/themes/theme';

export default function getCustomSelectOptions(theme: Theme): any {
  return {
    input: (provided: CSSProperties) => ({
      ...provided,
      color: theme.title === 'light'
        ? tint(0.8, theme.colors.dark)
        : shade(0.25, theme.colors.orange),
    }),
    placeholder: (provided: CSSProperties) => ({
      ...provided,
      color: theme.title === 'light'
        ? theme.colors.grey
        : theme.colors.orange,
    }),
    control: (provided: CSSProperties) => {
      return {
        ...provided,
        height: 60,
        borderRadius: 10,
        backgroundColor:
          theme.title === 'light'
            ? tint(0.8, theme.colors.white)
            : shade(0.25, theme.colors.dark),
        border: 'none',
        boxShadow: 'none',
        borderColor: theme.title === 'light'
          ? theme.colors.white
          : theme.colors.orange
      };
    },
    valueContainer: (provided: CSSProperties) => ({
      ...provided,
      padding: '2px 16px',
    }),
    singleValue: (provided: CSSProperties) => ({
      ...provided,
      color: theme.colors.dark,
    }),
    menu: (provided: CSSProperties) => ({
      ...provided,
      backgroundColor:
        theme.title === 'light'
          ? tint(0.95, theme.colors.dark)
          : shade(0.25, theme.colors.primary),
    }),
  };
}

export function getCustomSelectOptionsModal(theme: Theme): any {
  return {
    ...getCustomSelectOptions(theme),
    menu: (provided: CSSProperties) => ({
      ...provided,
      backgroundColor:
        theme.title === 'light'
          ? theme.colors.white
          : theme.colors.dark,
      padding: '5px 0',
    }),
    control: (provided: CSSProperties) => {
      return {
        ...provided,
        height: 60,
        borderRadius: 10,
        backgroundColor:
          theme.title === 'light'
            ? tint(0.8, theme.colors.white)
            : shade(0.25, theme.colors.dark),
        boxShadow: 'none',
        border: `2px solid ${theme.title === 'light'
          ? theme.colors.grey
          : theme.colors.orange}`
      };
    },
  };
}
