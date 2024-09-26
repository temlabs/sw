const white_0 = "#FFFFFF";
const white_100 = "#E7E6E6";
const white_200 = "#CFCECD";
const black_100 = "#B7B6B4";
const black_200 = "#878583";
const black_300 = "#575452";
const black_400 = "#272420";
const black_500 = "#100C08";
const black_600 = "#000000";

export const colors = {
  primary: "#de4035",
  secondary: "#000000",
  text: {
    primary: white_100,
    secondary: white_100,
    disabled: white_200,
  },
  background: {
    primary: black_500,
    secondary: black_100,
  },
  button: {
    primary: black_400,
    secondary: "#000000",
  },
  neutral: {
    100: "#000000",
    200: "#000000",
    300: "#000000",
    400: "#000000",
    500: "#000000",
    600: "#000000",
    700: "#000000",
  },
} as const;
