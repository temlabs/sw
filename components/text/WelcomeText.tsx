import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import React from "react";
import { Text } from "react-native";

const copy = [
  "Hurry,\nthere are\nworlds\nthat need exploring",
  "We've been waiting for you",
  "A world of wonder awaits",
  "Welcome\nto the beginning",
  "What took you so long?",
  "We\nare SO\nglad you made it",
];

export function WelcomeText() {
  return (
    <Text
      style={{ ...typography.h0, color: colors.text.primary, flexWrap: "wrap" }}
    >
      {copy[Math.round(Math.random() * (copy.length - 1))]}
    </Text>
  );
}
