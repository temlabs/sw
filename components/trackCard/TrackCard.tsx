import { ShortPost } from '@/posts/types';
import { spacing } from '@/theme/spacing';
import { Track } from '@/tracks/types';
import React, { useContext } from 'react';
import {
  ViewStyle,
  View,
  TextStyle,
  Text,
  TouchableHighlight,
  PanResponder,
} from 'react-native';
import { Image, ImageStyle } from 'expo-image';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';
import { TrackCardBackground } from './TrackCardBackground';
import { ModalContext } from '../modal/ModalContextProvider';
import { TrackCardOptions } from './TrackCardOptions';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface Props extends Track {
  postId: ShortPost['id'];
}

export function TrackCard(props: Track) {
  const { setModalContent } = useContext(ModalContext);

  const presentOptions = () => {
    setModalContent(<TrackCardOptions {...props} />);
  };

  const offsetX = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate(e => {
      offsetX.value = e.translationX;
    })
    .onEnd(e => {
      offsetX.value = 0;
    });

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 10; // Adjust threshold as needed
    },
    onPanResponderMove: (evt, gestureState) => {
      const maxOffset = 20; // Specify the maximum offset value
      offsetX.value =
        maxOffset *
        (1 - Math.exp(-Math.abs(gestureState.dx) / 40)) *
        (gestureState.dx < 0 ? -1 : 1); // Asymptotic approach in both directions
    },
    onPanResponderRelease: (evt, gestureState) => {
      offsetX.value = 0; // Reset offsetX on release
      presentOptions();
    },
    onPanResponderTerminate: (evt, gestureState) => {
      offsetX.value = 0; // Reset offsetX on release
    },
  });

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => ({
    transform: [{ translateX: offsetX.value }],
  }));

  return (
    <Animated.View style={animatedStyle} {...panResponder.panHandlers}>
      <TouchableHighlight
        underlayColor={'rgba(0,0,0,0.3)'}
        // onLongPress={presentOptions}
      >
        <View style={containerStyle}>
          <TrackCardBackground url={props.artwork} />
          <View style={innerContainerStyle}>
            <View style={imageColumnStyle}>
              <Image
                source={props.artwork}
                style={artworkStyle}
                contentFit="cover"
              />
            </View>
            <View style={titleColumnStyle}>
              <Text style={trackName}>{props.name}</Text>
              <Text style={artistName}>{props.artist}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </Animated.View>
  );
}

const containerStyle: ViewStyle = {
  //   height: 50,
  borderRadius: 10,
  //   borderCurve: 'circular',
  backgroundColor: 'blue',
  flexGrow: 1,
  overflow: 'hidden',
  position: 'relative',
};

const innerContainerStyle: ViewStyle = {
  padding: spacing.s,
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: spacing.m,
};

const imageColumnStyle: ViewStyle = {};

const titleColumnStyle: ViewStyle = {
  gap: 0,
  flexGrow: 1,
  justifyContent: 'space-between',
};

const trackName: TextStyle = {
  ...typography.smallBold,
  color: colors.text.primary,
};
const artistName: TextStyle = {
  ...typography.small,
  color: colors.text.secondary,
};

const artworkStyle: ImageStyle = {
  width: 35,
  height: 35,
};
