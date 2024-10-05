import React from 'react';
import { ViewProps, ViewStyle } from 'react-native';
import {
  Gesture,
  GestureDetector,
  PanGesture,
  TapGesture,
} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface Props {
  transition: SharedValue<number>;
  blocking: SharedValue<boolean>;
  panGesture: PanGesture;
  tapGesture: TapGesture;
}

export function ModalBackground({
  transition,
  blocking,
  panGesture,
  tapGesture,
}: Props) {
  const maxOpacity = 0.8;

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => ({
    opacity: maxOpacity * transition.value,
    backgroundColor: 'black',
  }));

  const animatedProps = useAnimatedProps<ViewProps>(() => {
    return { pointerEvents: blocking.value ? 'box-only' : 'none' };
  });

  return (
    <GestureDetector gesture={Gesture.Race(tapGesture, panGesture)}>
      <Animated.View
        animatedProps={animatedProps}
        style={[containerStyle, animatedStyle]}
      />
    </GestureDetector>
  );
}

const containerStyle: ViewStyle = {
  flex: 1,
  position: 'absolute',
  width: '100%',
  height: '100%',
};
