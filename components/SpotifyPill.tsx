import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import React, { useLayoutEffect } from 'react';
import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
  Text,
  LayoutAnimation,
  TouchableHighlight,
  TouchableHighlightProps,
} from 'react-native';
import { SpotifyLogo } from './icons/SpotifyLogo';
import { typography } from '@/theme/typography';
import { SpotifyPlayer } from './SpotifyPlayer';
import { useSpotifyLoginUriQuery } from '@/spotify/hooks/useSpotifyLoginUriQuery';

interface Props {
  text: string;
  onPress?: TouchableHighlightProps['onPress'];
}

export function SpotifyPill({ text, onPress }: Props) {
  const { data: loginUriAndState } = useSpotifyLoginUriQuery({
    refetchOnMount: true,
  });

  useLayoutEffect(() => {
    LayoutAnimation.configureNext({
      create: { type: 'spring', springDamping: 5, duration: 150 },
      update: { type: 'spring', springDamping: 5, duration: 150 },
      duration: 150,
    });
  }, [text, onPress]);
  if (!loginUriAndState) return null;
  const { uri } = loginUriAndState;
  if (!uri) return null;

  const disabled = !onPress;

  return (
    <>
      <TouchableHighlight
        disabled={disabled}
        onPress={onPress}
        underlayColor={'olive'}
        style={touchableStyle}
      >
        <View style={containerStyle}>
          <SpotifyLogo height={16} width={16} />
          <Text style={pillText}>{text}</Text>
        </View>
      </TouchableHighlight>
      {/* <SpotifyPlayer /> */}
    </>
  );
}

const touchableStyle: ViewStyle = {
  borderRadius: '5%',
  backgroundColor: 'green',
};

const containerStyle: ViewStyle = {
  padding: spacing.s,
  paddingHorizontal: spacing.m,
  alignItems: 'center',
  flexDirection: 'row',
  gap: spacing.m,
  alignSelf: 'center',
};

const pillText: TextStyle = {
  ...typography.small,
  color: 'black',
  flexGrow: 1,
};
