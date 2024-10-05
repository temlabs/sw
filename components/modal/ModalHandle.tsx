import { spacing } from '@/theme/spacing';
import { View } from 'react-native';

export function ModalHandle() {
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'transparent',
        height: spacing.l,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          alignSelf: 'center',
          height: 2,
          width: 80,
          opacity: 0.4,
          borderRadius: '50%',
          backgroundColor: 'white',
        }}
      />
    </View>
  );
}
