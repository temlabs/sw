import React, { PropsWithChildren, useRef } from 'react';
import Animated, {
  AnimatedRef,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
  ScrollView,
} from 'react-native-gesture-handler';
import { ViewStyle } from 'react-native';
import { screenHeight } from '@/theme/constants';
import { transform } from '@babel/core';
import { ModalBackground } from './ModalBackground';
import { withSpringConfig } from './config';
import { spacing } from '@/theme/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme/colors';

interface Props extends PropsWithChildren {
  offsetY: SharedValue<number>;
  modalRef: AnimatedRef<Animated.View>;
  modalHeight: SharedValue<number>;
  blocking: SharedValue<boolean>;
  collapseModal: () => void;
}

export function Modal({
  offsetY,
  children,
  modalRef,
  modalHeight,
  blocking,
  collapseModal,
}: Props) {
  const insets = useSafeAreaInsets();
  const scrollviewRef = useRef<ScrollView>(null);
  const transition = useDerivedValue(() => {
    return (
      1 -
      Math.min(
        1,
        Math.max(0, offsetY.value / (modalHeight.value + insets.bottom)),
      )
    );
  });

  const backgroundPan = Gesture.Pan()
    .onUpdate(e => {
      if (!blocking.value) {
        return;
      }
      offsetY.value = e.translationY - insets.bottom;
    })
    .onEnd(e => {
      if (!blocking.value) {
        return;
      }
      if (e.translationY > (modalHeight.value + insets.bottom) * 0.5) {
        //close
        blocking.value = false;
        offsetY.value = withSpring(
          modalHeight.value + insets.bottom,
          {
            ...withSpringConfig,
            velocity: e.velocityY,
          },
          f => f && collapseModal(),
        );
      } else {
        // bounce back
        offsetY.value = withSpring(0 - insets.bottom, withSpringConfig);
      }
    });

  const backgroundTap = Gesture.Tap()
    .onStart(e => {
      blocking.value = false;
      collapseModal();
    })
    .blocksExternalGesture(backgroundPan);

  const contentPan = Gesture.Pan()
    .onUpdate(e => {
      if (!blocking.value) {
        return;
      }
      // offsetY.value = e.translationY - insets.bottom;
      const maxOffset = screenHeight - (modalHeight.value - insets.bottom);
      offsetY.value = e.translationY - insets.bottom;
    })
    .onEnd(e => {
      if (!blocking.value) {
        return;
      }
      if (e.translationY > (modalHeight.value + insets.bottom) * 0.5) {
        //close
        blocking.value = false;
        offsetY.value = withSpring(
          modalHeight.value + insets.bottom,
          {
            ...withSpringConfig,
            velocity: e.velocityY,
          },
          f => collapseModal(),
        );
      } else {
        // bounce back
        offsetY.value = withSpring(0 - insets.bottom, withSpringConfig);
      }
    });

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => ({
    transform: [{ translateY: offsetY.value }],
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
  }));

  return (
    <>
      <ModalBackground
        transition={transition}
        blocking={blocking}
        panGesture={backgroundPan}
        tapGesture={backgroundTap}
      />
      <GestureDetector gesture={Gesture.Simultaneous(contentPan)}>
        <Animated.View ref={modalRef} style={[containerStyle, animatedStyle]}>
          <ScrollView
            ref={scrollviewRef}
            bounces={false}
            style={scrollviewStyle}
            contentContainerStyle={scrollviewContentStyle}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </GestureDetector>
    </>
  );
}

const containerStyle: ViewStyle = {
  maxHeight: screenHeight * 0.7,
  position: 'absolute',

  backgroundColor: 'transparent',
  padding: spacing.s,
  overflow: 'hidden',
};

const scrollviewStyle: ViewStyle = {
  height: '100%',
  width: '100%',
  backgroundColor: colors.background.secondary,
  borderRadius: 20,
  overflow: 'hidden',
};

const scrollviewContentStyle: ViewStyle = {
  width: '100%',
  height: '100%',
};
