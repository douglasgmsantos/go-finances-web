import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      background: string;
      primary: string;
      grey: string;
      orange: string;
      yellow: string;
      purple_light: string;
      purple: string;
      white: string;
      green: string;
      dark: string;
      red: string;

      card_bg: string;
      card_text: string;

    },
    fontSizes: {
      default: string;
      huge: string;
      small: string;
      tiny: string;
    },
    spacing: {
      default: string;
      vertical: string;
      horizontal: string;
      huge: string;
    }
  }
}
