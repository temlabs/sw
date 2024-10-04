import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { TextAlign } from "@shopify/react-native-skia";
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
  WithSpringConfig,
} from "react-native-reanimated";

interface Props extends Omit<TextInputProps, "style"> {
  label: string;
  leadingIcon?: React.ReactNode;
  errorText?: string;
}
const withSpringOptions: WithSpringConfig = { mass: 0.1, stiffness: 10 };

export function TextInput({ label, ...props }: Props) {
  const borderColor = useSharedValue<string>(colors.border.inputInactive);
  const borderWidth = useSharedValue<number>(0);

  const animatedBorderStyle = useAnimatedStyle(() => {
    return {
      borderColor: borderColor.value,
      borderWidth: 1,
      // borderWidth:borderWidth.value
    };
  });

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    borderColor.value = withSpring(
      colors.border.inputActive,
      withSpringOptions
    );
    borderWidth.value = withSpring(1, withSpringOptions);
    props.onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    borderColor.value = withSpring(
      colors.border.inputInactive,
      withSpringOptions
    );
    borderWidth.value = withSpring(0, withSpringOptions);
    props.onBlur?.(e);
  };

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <View style={{ gap: spacing.xs, alignItems: "center" }}>
        <Animated.View style={[inputContainerStyle, animatedBorderStyle]}>
          <BlurView intensity={100} tint="prominent" style={blurViewStyle} />
          <View style={innerContainerStyle}>
            {props.leadingIcon}

            <RNTextInput
              {...props}
              onFocus={handleFocus}
              onBlur={handleBlur}
              cursorColor={colors.neutral[400]}
              style={textInputStyle}
              placeholderTextColor={"grey"}
            />
          </View>
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
  borderColor: "transparent",
  borderRadius: 40,
  width: "100%",
  overflow: "hidden",

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
  opacity: 0.2,
};

const textInputStyle: TextStyle = {
  // width: "100%",
  flex: 1,
  ...typography.medium,
  color: colors.text.primary,
  padding: spacing.m,
};

const labelStyle: TextStyle = {
  ...typography.medium,
  color: colors.text.primary,
  opacity: 0.8,
};

const containerStyle: ViewStyle = {
  width: "100%",
  gap: spacing.m - spacing.s,
  alignItems: "center",
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
