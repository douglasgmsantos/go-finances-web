export default interface Theme {
  title: string;

  colors: {
    background: string;
    primary: string;
    grey: string;
    purple_light: string;
    orange: string;
    yellow: string;
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
