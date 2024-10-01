import React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export function DiscoverIcon(props: SvgProps): JSX.Element {
  return (
    <Svg width={128} height={128} viewBox="0 0 16 16" {...props}>
      <Path
        fill={props.fill ?? '#000000'}
        d="m14.91 13.09l-3.68-3.21a4.86 4.86 0 0 0 .86-2.77A5.34 5.34 0 0 0 6.59 2a5.35 5.35 0 0 0-5.5 5.15a5.34 5.34 0 0 0 5.5 5.15a5.71 5.71 0 0 0 3.82-1.44L14.08 14zM6.59 11a4.09 4.09 0 0 1-4.25-3.9a4.09 4.09 0 0 1 4.25-3.9a4.09 4.09 0 0 1 4.25 3.9A4.08 4.08 0 0 1 6.59 11z"
      />
    </Svg>
  );
}
