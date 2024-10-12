import { useSpotifyTokensQuery } from '@/spotify/hooks/useSpotifyTokensQuery';
import { spotifyQueryKeys } from '@/spotify/spotifyQueryKeys';
import { useGlobalStore } from '@/store/store';
import { View, Text, StyleSheet } from 'react-native';

export default function Tab() {
  const authCode = useGlobalStore(state => state.authCode);
  const {
    data: tokens,
    error,
    isError,
    isFetched,
    isFetching,
  } = useSpotifyTokensQuery({
    enabled: !!authCode,
    queryKey: spotifyQueryKeys.tokens(authCode),
  });
  const { data: spotifyProfile } = useSpotifyTokensQuery({
    enabled: !!tokens?.accessToken,
    queryKey: spotifyQueryKeys.profile(tokens?.accessToken ?? ''),
  });
  console.debug({ spotifyProfile });

  return (
    <View style={styles.container}>
      <Text>Tab [Home|Settings]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
