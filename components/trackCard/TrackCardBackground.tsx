import { darkenForContrast } from '@/color/functions';
import { useImageColors } from '@/color/useImageColors';
import { colors } from '@/theme/colors';
import React from 'react';
import { Platform, View, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

interface Props {
  url: string;
}

export function TrackCardBackground({ url }: Props) {
  const imageColors = useImageColors(url);
  let dark = 'black';
  let light = 'black';

  if (Platform.OS === 'android' && imageColors?.platform === 'android') {
    dark = imageColors.darkVibrant;
    light = imageColors.lightVibrant;
  } else if (Platform.OS === 'ios' && imageColors?.platform === 'ios') {
    dark = imageColors.primary;
    light = imageColors.secondary;
  }

  const darkContrastAdjusted = darkenForContrast(dark);
  const lightContrastAdjusted = darkenForContrast(light);

  return (
    <Svg
      height="100%"
      width="100%"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={lightContrastAdjusted} stopOpacity="1" />
          <Stop offset="1" stopColor={darkContrastAdjusted} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Rect width={'100%'} height={'100%'} fill="url(#grad)" />
    </Svg>
  );
}

const containerStyle: ViewStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: 'transparent',
};
