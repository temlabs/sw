import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export function Bookmark(props: SvgProps): JSX.Element {
  return (
    <Svg width={128} height={128} viewBox="0 0 24 24" {...props}>
      <Path
        stroke={props.stroke}
        fill={props.fill ?? '#000000'}
        d="M19 10.132v-6c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2V22l7-4.666L19 22V10.132z"
      />
    </Svg>
  );
}
