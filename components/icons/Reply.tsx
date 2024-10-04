import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export function Reply(props: SvgProps): JSX.Element {
  return (
    <Svg width={128} height={128} viewBox="0 0 24 24" {...props}>
      <Path
        stroke={props.stroke}
        fill={props.fill ?? '#000000'}
        d="M20 2H4c-1.103 0-2 .897-2 2v18l4-4h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"
      />
    </Svg>
  );
}
