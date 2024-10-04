import React from "react";
import { Upvote } from "../icons/Upvote";
import { colors } from "@/theme/colors";
import { TouchableOpacity } from "react-native";

interface Props {
  active?: boolean;
  onPress?: () => void;
}

export function UpvoteButton({ active, onPress }: Props) {
  const fill = active ? "green" : colors.border.inputInactive;
  const stroke = active ? "green" : colors.border.inputInactive;

  return (
    <TouchableOpacity>
      <Upvote fill={fill} stroke={stroke} />;
    </TouchableOpacity>
  );
}
