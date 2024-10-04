import { PropsWithChildren } from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";
import { SpringConfig } from "react-native-reanimated/lib/typescript/reanimated2/animation/springUtils";

interface Props extends ViewProps {
  opacity: SharedValue<number>;
}

export function FadeView(props: Props) {
  const animatedStyle = useAnimatedStyle<ViewStyle>(() => ({
    opacity: props.opacity.value,
  }));

  return (
    <Animated.View
      {...props}
      style={[
        animatedStyle,
        ...(Array.isArray(props.style) ? props.style : [props.style]),
      ]}
    >
      {props.children}
    </Animated.View>
  );
}
