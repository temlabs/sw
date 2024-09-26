import React from "react";
import { Pressable, PressableProps, View, Text, ViewStyle } from "react-native";
import { ButtonProps } from "./types";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export function PrimaryButton({ text, onPress }: ButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={container}>
        <Text style={{ ...typography.medium, color: colors.text.primary }}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
}

const container: ViewStyle = {
  backgroundColor: colors.button.primary,
  paddingHorizontal: spacing.m,
  paddingVertical: spacing.m,
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
};
