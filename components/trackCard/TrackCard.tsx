import { ShortPost } from '@/posts/types';
import { spacing } from '@/theme/spacing';
import { Track } from '@/tracks/types';
import React from 'react';
import {
  ViewStyle,
  View,
  TextStyle,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Image, ImageStyle } from 'expo-image';
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';
import { TrackCardBackground } from './TrackCardBackground';

interface Props extends Track {
  postId: ShortPost['id'];
}

export function TrackCard(props: Track) {
  return (
    <TouchableHighlight
      underlayColor={'rgba(0,0,0,0.3)'}
      onLongPress={() => console.debug('long press')}
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
