import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text,TextStyle,ViewStyle } from "react-native";
import { Bookmark } from "../icons/Bookmark";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

interface Props {
  onPress: TouchableOpacityProps["onPress"];
  active?: boolean;
  count?:number;
}

export function BookmarkButton({ onPress, active, count }: Props) {
  const fill = active ? colors.button.tertiary: "transparent";

  const stroke = colors.button.tertiary;

  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Bookmark fill={fill}  width={16} height={16} stroke={stroke}  />
      {count!==undefined ? <Text style={countStyle}>{count}</Text> : <></>}
    </TouchableOpacity>
  );
}

const containerStyle:ViewStyle = {
  flexDirection:'row',
  gap: spacing.s,
  alignItems:'center'
}

const countStyle:TextStyle = {
...typography.xsmall, color: colors.text.secondary
}
