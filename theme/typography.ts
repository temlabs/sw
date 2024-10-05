import { TextStyle } from "react-native";

const h0: TextStyle = {
  fontFamily: "Sora-Medium",
  fontSize: 56,
  fontWeight: "600",
} as const;

const h1: TextStyle = {
  fontFamily: "Sora-Bold",
  fontSize: 24,
  fontWeight: "700",
} as const;

const h2: TextStyle = {
  fontFamily: "Sora-SemiBold",
  fontSize: 20,
  fontWeight: "700",
} as const;

const h3: TextStyle = {
  fontFamily: "Sora-Medium",
  fontSize: 16,
  fontWeight: "600",
} as const;

const h4: TextStyle = {
  fontFamily: "Sora-Medium",
  fontSize: 20,
} as const;

const medium: TextStyle = {
  fontFamily: "Sora-Regular",
  fontSize: 18,
  fontWeight: "500",
} as const;

const small: TextStyle = {
  fontFamily: "Sora-Light",
  fontSize: 12,
  fontWeight: "500",
} as const;

const smallBold: TextStyle = {
  fontFamily: "Sora-Regular",
  fontSize: 12,
  fontWeight: "500",
} as const;

const xsmall: TextStyle = {
  fontFamily: "Sora-ExtraLight",
  fontSize: 10,
  fontWeight: "700",
} as const;

export const typography = {
  h1,
  h0,
  h2,
  h3,
  h4,
  medium,
  small,
  smallBold,
  xsmall,
} as const;
