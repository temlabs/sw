import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export function Upvote(props: SvgProps): JSX.Element {
  return (
    <Svg width={128} height={128} viewBox="0 0 24 24" {...props}>
      <Path
        stroke={props.stroke}
        fill={props.fill ?? '#000000'}
        d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"
      />
    </Svg>
  );
}
