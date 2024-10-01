import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface Props extends Omit<TextInputProps, "style"> {
  label: string;
  leadingIcon?: React.ReactNode;
  errorText?: string;
}
const withSpringOptions = { mass: 0.1 };

export function TextInput({ label, ...props }: Props) {
  const borderColor = useSharedValue<string>(colors.border.inputInactive);

  const animatedBorderStyle = useAnimatedStyle(() => {
    return {
      borderColor: borderColor.value,
    };
  });

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    borderColor.value = withSpring(
      colors.border.inputActive,
      withSpringOptions
    );
    props.onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    borderColor.value = withSpring(
      colors.border.inputInactive,
      withSpringOptions
    );
    props.onBlur?.(e);
  };

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <View style={{ gap: spacing.xs }}>
        <Animated.View style={[inputContainerStyle, animatedBorderStyle]}>
          <BlurView intensity={100} tint="prominent" style={blurViewStyle} />
          {/* <View style={innerContainerStyle}> */}
          {props.leadingIcon}
          <RNTextInput
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
            cursorColor={colors.neutral[400]}
            style={textInputStyle}
          />
          {/* </View> */}
        </Animated.View>
        {props.errorText && (
          <Animated.View
            entering={FadeIn.springify(100)}
            exiting={FadeOut.springify(100)}
          >
            <Text style={errorTextStyle}>{props.errorText}</Text>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const inputContainerStyle: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.border.inputInactive,
  borderRadius: 10,
  width: "100%",
  overflow: "hidden",
  padding: spacing.m,
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: spacing.xs,
};

const blurViewStyle: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0.3,
};

const textInputStyle: TextStyle = {
  width: "100%",
  ...typography.medium,
  color: colors.text.primary,
};

const labelStyle: TextStyle = {
  ...typography.medium,
  color: colors.text.primary,
};

const containerStyle: ViewStyle = {
  width: "100%",
  gap: spacing.m,
};

const innerContainerStyle: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: spacing.xs,
  // backgroundColor: "red",
};

const errorTextStyle: TextStyle = {
  ...typography.small,
  color: colors.text.error,
};
