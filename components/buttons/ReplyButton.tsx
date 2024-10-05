import React from "react";
import { TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle , Text} from "react-native";
import { Reply } from "../icons/Reply";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { spacing } from "@/theme/spacing";

interface Props {
  onPress: TouchableOpacityProps["onPress"];
  count?:number;
}

export function ReplyButton({ onPress,count }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Reply width={16} height={16} fill={colors.button.tertiary} />
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