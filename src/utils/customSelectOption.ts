import { CSSProperties } from 'styled-components';
import { tint } from 'polished';
import Theme from '../styles/themes/theme';

export default function getCustomSelectOptions(theme: Theme): any {
  return {
    input: (provided: CSSProperties) => ({
      ...provided,
      color: tint(0.8, theme.colors.dark),
    }),
    placeholder: (provided: CSSProperties) => ({
      ...provided,
      color: theme.colors.grey
    }),
    control: (provided: CSSProperties) => {
      return {
        ...provided,
        borderColor: theme.colors.white,
        height: 60,
        borderRadius: 10,
        backgroundColor:tint(0.8, theme.colors.white),
        boxShadow: 'none',
        border: `2px solid ${theme.colors.purple_light}`,
        "&:hover": {
          borderColor: `${theme.colors.purple_light}`
        }
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
      backgroundColor:tint(0.95, theme.colors.dark),
    }),
    menuList: (provided: CSSProperties) => ({
      ...provided,
      padding: '5px',
      display: 'grid',
      gridTemplateColumns:
        '1fr',
    })
  };
}
