import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Bookmark } from "../icons/Bookmark";
import { colors } from "@/theme/colors";

interface Props {
  onPress: TouchableOpacityProps["onPress"];
  active?: boolean;
}

export function BookmarkButton({ onPress, active }: Props) {
  const fill = active ? colors.neutral[500] : "transparent";

  const stroke = colors.neutral;

  return (
    <TouchableOpacity onPress={onPress}>
      <Bookmark fill={fill} stroke={stroke} />
    </TouchableOpacity>
  );
}
