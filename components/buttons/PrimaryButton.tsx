import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  ViewStyle,
  TouchableHighlight,
  ActivityIndicator,
  TouchableHighlightProps,
} from 'react-native';
import { ButtonProps } from './types';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { BlurView } from 'expo-blur';

export function PrimaryButton(
  props: ButtonProps,
  ref: React.ForwardedRef<TouchableHighlightProps>,
) {
  return (
    <TouchableHighlight
      {...props}
      style={[outerContainer, props.disabled ? { opacity: 0.5 } : {}]}
      underlayColor={colors.button.primaryActive}
      hitSlop={10}
    >
      <View style={container}>
        {props.isLoading ? (
          <ActivityIndicator color={'black'} />
        ) : (
          <Text style={{ ...typography.h4, color: 'black' }}>{props.text}</Text>
        )}
      </View>
    </TouchableHighlight>
  );
}

const outerContainer: ViewStyle = {
  backgroundColor: colors.button.primary,
  borderRadius: 48,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  height: (typography.h4.fontSize ?? 20) * 3.2,
};

const container: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  paddingHorizontal: spacing.m,
  paddingVertical: spacing.m,
};

const svgContainer: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
};

const textContainer: ViewStyle = {
  position: 'relative',
  zIndex: 1,

  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
};
