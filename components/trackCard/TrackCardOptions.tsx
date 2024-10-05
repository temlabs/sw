import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { Track } from '@/tracks/types';
import React from 'react';
import {
  TextStyle,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModalHandle } from '../modal/ModalHandle';
import { Image, ImageStyle } from 'expo-image';

interface Props extends Track {}

export function TrackCardOptions(track: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={containerStyle}>
      <ModalHandle />

      <View style={headerContainerStyle}>
        <View style={titleContainerStyle}>
          <Text style={trackName}>{track.name}</Text>
          <Text style={trackArtist}>{track.artist}</Text>
        </View>
        <Image
          style={imageStyle}
          contentFit="cover"
          source={{ uri: track.artwork }}
        />
      </View>
      <View style={buttonsContainer}>
        <TouchableOpacity style={buttonWithBorder}>
          <Text style={buttonTitle}>Open track in Spotify</Text>
          <Text style={buttonText}>
            Continue your journey in the Spotify app. We'll be waiting for you
            when you come back.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={buttonWithBorder}>
          <Text style={buttonTitle}>Add to playlist</Text>
          <Text style={buttonText}>
            Add this track to your "sheerwonder collections" playlist. You can
            change the default playlist from the profile section.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={button}>
          <Text style={buttonTitle}>Add to watchlist</Text>
          <Text style={buttonText}>
            Add this track to your watchlist feed. Only posts on this track and
            your other watched tracks show up there.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const containerStyle: ViewStyle = {
  backgroundColor: 'transparent',
};

const imageStyle: ImageStyle = {
  width: 30,
  height: 30,
};

const headerContainerStyle: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: spacing.m,
};

const titleContainerStyle: ViewStyle = {
  justifyContent: 'flex-start',
  gap: 0,
};

const trackName: TextStyle = {
  ...typography.medium,
  color: colors.text.primary,
};

const trackArtist: TextStyle = {
  ...typography.small,
  color: colors.text.secondary,
};

const buttonsContainer: ViewStyle = {
  paddingBottom: spacing.m,
};

const button: ViewStyle = {
  padding: spacing.m,
  gap: spacing.s,
};
const buttonWithBorder: ViewStyle = {
  ...button,
  borderBottomColor: colors.border.bottomTab,
  borderBottomWidth: 2,
};

const buttonTitle: TextStyle = {
  ...typography.smallBold,
  color: colors.text.primary,
};

const buttonText: TextStyle = {
  ...typography.small,
  color: colors.text.secondary,
};
