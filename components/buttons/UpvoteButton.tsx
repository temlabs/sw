import React from "react";
import { Upvote } from "../icons/Upvote";
import { colors } from "@/theme/colors";
import { TextStyle, TouchableOpacity, ViewStyle, Text } from "react-native";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

interface Props {
  active?: boolean;
  onPress?: () => void;
  count?:number;
}

export function UpvoteButton({ active, onPress, count }: Props) {
  const fill = active ? "green" : "transparent";
  const stroke = "green";

  return (
    <TouchableOpacity style={containerStyle}>
      <Upvote width={16} height={16} fill={fill} stroke={stroke} />
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