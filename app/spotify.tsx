import { extractAuthCodeFromUrl } from '@/spotify/functions/authFunctions';
import { spotifyQueryKeys } from '@/spotify/spotifyQueryKeys';
import { useSpotifyTokensQuery } from '@/spotify/hooks/useSpotifyTokensQuery';
import { useGlobalStore } from '@/store/store';
import { colors } from '@/theme/colors';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';
import { OnShouldStartLoadWithRequest } from 'react-native-webview/lib/WebViewTypes';
import { useSpotifyLoginUriQuery } from '@/spotify/hooks/useSpotifyLoginUriQuery';
import { QueryClient } from '@tanstack/react-query';
import { queryClient } from '@/cache/config';

export default function SpotifyAuth() {
  // const [authCode, setAuthCode] = useState<string | undefined>();
  const setAuthCode = useGlobalStore(state => state.setAuthCode);
  const authCode = useGlobalStore(state => state.authCode);
  const params = useLocalSearchParams();
  const { data: loginUriAndState } = useSpotifyLoginUriQuery({});
  const loginUri = loginUriAndState?.uri;
  const redirectUri = loginUriAndState?.redirectUri;
  const uri = (params?.link as string) ?? loginUri;
  if (!uri || !redirectUri) return <></>;
  const webViewRef = useRef<WebView>(null);

  const { data, error, isError, isFetched } = useSpotifyTokensQuery({
    enabled: !!authCode,
    queryKey: spotifyQueryKeys.tokens(authCode),
  });

  const handleLoadRequest: OnShouldStartLoadWithRequest = request => {
    const { url } = request;
    console.log('handleRequest: ', { url });
    if (url.startsWith(redirectUri)) {
      const code = extractAuthCodeFromUrl(url);

      if (code) {
        setAuthCode(code);
      }
      router.back();
      return true;
    } else if (url.startsWith('https://accounts.spotify.com/en/status?flow_')) {
      queryClient.invalidateQueries({ queryKey: spotifyQueryKeys.loginUri });
      queryClient.resetQueries({ queryKey: spotifyQueryKeys.tokens(authCode) });
    }
    // if (url.startsWith('https://accounts.spotify.com/en/login?flow')) {
    //   //redirect to auth sign in screen because this is the generic one
    //   webViewRef.current?.injectJavaScript(
    //     `window.location.href = "${loginUri}"`,
    //   );
    // }
    return true;
  };

  return (
    <View style={containerStyle}>
      <WebView
        key={9}
        javaScriptCanOpenWindowsAutomatically={true}
        style={webViewStyle}
        // source={{ uri: 'https://google.com' }}
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        source={{ uri }}
        onShouldStartLoadWithRequest={handleLoadRequest}
        scrollEnabled={true}
        originWhitelist={['*']}
        onError={e => {
          console.debug(e);
        }}
      />
    </View>
  );
}

const containerStyle: ViewStyle = {
  flex: 1,
  backgroundColor: '#0e0b07',
};

const webViewStyle: ViewStyle = {
  flex: 1,
  backgroundColor: '#0e0b07',
};
