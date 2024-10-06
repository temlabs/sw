import React from 'react';
import { ViewStyle, View } from 'react-native';

export function TrackPlayhead() {
  const startPerc = '40';
  const startPercString = `${startPerc}%`;
  const durationPerc = 30;
  const durationPercString = `${durationPerc}%`;
  const playThroughPerc = 50;
  const playPositionPerc = `${playThroughPerc - 100}%`;
  const playWidth = `${100}%`;

  return (
    <View style={containerStyle}>
      <View style={baseTrackStyle} />
      <View
        style={[
          activeTrackStyle,
          { left: startPercString, width: durationPercString },
        ]}
      />
      <View
        style={[
          playedTrackContainerStyle,
          { left: startPercString, width: durationPercString },
        ]}
      >
        <View
          style={[
            playedTrackStyle,
            { left: playPositionPerc, width: playWidth },
          ]}
        />
      </View>
    </View>
  );
}

const containerStyle: ViewStyle = {
  width: '100%',
  height: 5,
};

const baseTrackStyle: ViewStyle = {
  opacity: 0.2,
  backgroundColor: 'white',
  width: '100%',
  height: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
};

const activeTrackStyle: ViewStyle = {
  position: 'absolute',
  height: '100%',
  backgroundColor: 'white',
  opacity: 0.4,
  top: 0,
};

const playedTrackContainerStyle: ViewStyle = {
  position: 'absolute',
  height: '100%',
  backgroundColor: 'transparent',
  overflow: 'hidden',
  top: 0,
};

const playedTrackStyle: ViewStyle = {
  position: 'absolute',
  height: '100%',
  backgroundColor: 'white',
  opacity: 0.8,
  top: 0,
};
