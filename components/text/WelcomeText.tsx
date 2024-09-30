import { black_200, black_500, colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import React from "react";
import { Text } from "react-native";

const copy = [
  "Hurry,\nthere are\nworlds\nto explore",
  "We've\nbeen waiting for you",
  "A world of wonder awaits",
  "It's\nonly\njust\nbeginning",
  "What took you so long?",
  "We\nare SO\nglad you could make it",
];

export function WelcomeText() {
  return (
    <Text
      style={{
        ...typography.h3,
        color: black_200,
        shadowColor: "red",
        shadowOffset: { width: 10, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 100,
        flexWrap: "wrap",
      }}
    >
      {copy[Math.round(Math.random() * (copy.length - 1))]}
    </Text>
  );
}
