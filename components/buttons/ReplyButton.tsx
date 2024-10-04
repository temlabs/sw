import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Reply } from "../icons/Reply";

interface Props {
  onPress: TouchableOpacityProps["onPress"];
}

export function ReplyButton({ onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Reply />
    </TouchableOpacity>
  );
}
