import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import React from "react";
import { TouchableOpacity, Text, TextStyle } from "react-native";
import { ButtonProps } from "./types";

export function TextLinkButton(props: ButtonProps) {
  return (
    <TouchableOpacity {...props}>
      <Text style={sendCodeStyle}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const sendCodeStyle: TextStyle = {
  ...typography.small,
  textDecorationLine: "underline",
  color: colors.text.primary,
  opacity: 0.5,
};
