export const white_0 = '#FFFFFF';
export const white_100 = '#E7E6E6';
export const white_200 = '#CFCECD';
export const black_100 = '#B7B6B4';
export const black_200 = '#878583';
export const black_300 = '#575452';
export const black_400 = '#272420';
export const black_500 = '#100C08';
export const black_600 = '#000000';
export const red_100 = '#cc6a6a';

export const colors = {
  border: {
    inputActive: black_200,
    inputInactive: 'transparent', //black_300,
    bottomTab: black_400,
  },
  primary: '#de4035',
  secondary: '#000000',
  text: {
    primary: white_0,
    secondary: white_100,
    disabled: white_200,
    error: red_100,
  },
  background: {
    primary: black_500,
    secondary: '#1c1c1c',
  },
  button: {
    primary: white_0,
    primaryActive: white_200,
    secondary: '#f0bebb',
    tertiary: black_400,
  },
  neutral: {
    100: '#000000',
    200: '#000000',
    300: '#000000',
    400: '#000000',
    500: '#000000',
    600: '#000000',
    700: '#000000',
  },
} as const;
