import React from "react";
import {
  Pressable,
  PressableProps,
  View,
  Text,
  ViewStyle,
  TouchableWithoutFeedback,
} from "react-native";
import { ButtonProps } from "./types";
import { typography } from "@/theme/typography";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";
import { BlurView } from "expo-blur";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedRadialGradient = Animated.createAnimatedComponent(RadialGradient);

export function PrimaryButton({ text, onPress }: ButtonProps) {
  const startRadius = 0.1;
  const endRadius = 0.5;
  const radius = useSharedValue(startRadius);

  const animatedProps = useAnimatedProps(() => ({
    rx: `${radius.value * 100}%`,
    ry: `${radius.value * 100}%`,
  }));

  const spreadGradient = () => {
    radius.value = withTiming(endRadius, {
      duration: 75,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const shrinkGradient = () => {
    radius.value = withTiming(startRadius, {
      duration: 150,
      easing: Easing.inOut(Easing.ease),
    });
  };

  return (
    <TouchableWithoutFeedback
      //   onPress={onPress}
      onPressIn={spreadGradient}
      onPressOut={shrinkGradient}
      hitSlop={10}
    >
      <View style={container}>
        <View style={svgContainer}>
          <Svg height="100%" width="100%">
            <Defs>
              <AnimatedRadialGradient
                id="grad"
                cx="50%"
                cy="50%"
                fx="50%"
                fy="50%"
                rx={"50%"}
                ry={"100%"}
                animatedProps={animatedProps}
              >
                <Stop
                  offset={"0"}
                  stopColor={colors.button.primary}
                  stopOpacity="1"
                />
                <Stop
                  offset="1"
                  stopColor={colors.button.secondary}
                  stopOpacity="1"
                />
              </AnimatedRadialGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />

            <Circle cx="10%" cy="20%" r="15" fill="grey" opacity="0.5" />
            {/* <Circle cx="50%" cy="50%" r="25" fill="#4ECDC4" opacity="1" /> */}
            <Circle cx="90%" cy="30%" r="10" fill="#45B7D1" opacity="0.5" />
            {/* <Circle cx="15%" cy="75%" r="20" fill="#FFA07A" opacity="1" /> */}
            <Circle cx="85%" cy="80%" r="18" fill="white" opacity="0.5" />
          </Svg>
        </View>
        <BlurView
          style={textContainer}
          experimentalBlurMethod="dimezisBlurView"
          intensity={60}
        >
          <Text style={{ ...typography.h4, color: "black" }}>{text}</Text>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const container: ViewStyle = {
  backgroundColor: colors.button.primary,
  borderRadius: 48,
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
};

const svgContainer: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
};

const textContainer: ViewStyle = {
  position: "relative",
  zIndex: 1,
  paddingHorizontal: spacing.m,
  paddingVertical: spacing.m,
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
};
