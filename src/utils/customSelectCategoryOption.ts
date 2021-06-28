import getCustomSelectOptions from './customSelectOption';
import { CSSProperties } from 'styled-components';
import { shade, tint } from 'polished';
import Theme from '../styles/themes/theme';

export function getCustomSelectOptionsModal(theme: Theme): any {
  return {
    ...getCustomSelectOptions(theme),
    menu: (provided: CSSProperties) => ({
      ...provided,
      backgroundColor: theme.colors.white,
      padding: '5px 0',
    }),
    control: (provided: CSSProperties) => {
      return {
        ...provided,
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
  };
}
