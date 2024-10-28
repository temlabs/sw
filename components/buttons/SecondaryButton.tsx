import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { ButtonProps } from './types';
import { typography } from '@/theme/typography';
import { spacing } from '@/theme/spacing';
import { colors } from '@/theme/colors';

export function SecondaryButton(
  props: ButtonProps,
  ref: React.ForwardedRef<TouchableOpacityProps>,
) {
  return (
    <TouchableOpacity {...props}>
      <View style={container}>
        <Text style={textStyle}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
}
const container: ViewStyle = {
  padding: spacing.m,
  justifyContent: 'center',
  alignItems: 'center',
};

const textStyle: TextStyle = {
  ...typography.h4,
  color: colors.text.primary,
};
