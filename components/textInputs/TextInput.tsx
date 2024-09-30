import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Text, View } from "react-native";

interface Props extends Omit<TextInputProps, "style"> {
  label: string;
}

export function TextInput({ label, ...props }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>

      <View style={inputContainerStyle}>
        <BlurView intensity={100} tint="prominent" style={blurViewStyle} />
        <RNTextInput
          {...props}
          cursorColor={colors.neutral[400]}
          style={textInputStyle}
        />
      </View>
    </View>
  );
}

const inputContainerStyle: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.border.inputActive,
  borderRadius: 20,
  width: "100%",
  overflow: "hidden",
  padding: spacing.m,
  justifyContent: "center",
  alignItems: "center",
};

const blurViewStyle: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0.3,
};

const textInputStyle: TextStyle = {
  width: "100%",
  ...typography.medium,
  color: colors.text.primary,
};

const labelStyle: TextStyle = {
  ...typography.medium,
  color: colors.text.primary,
};

const containerStyle: ViewStyle = {
  width: "100%",
  gap: spacing.m,
};
