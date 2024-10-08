import {
  constructSpotifyLoginUri,
  extractAuthCodeFromUrl,
} from '@/spotify/functions/authFunctions';
import { REDIRECT_URI } from '@/spotify/config';
import { spotifyQueryKeys } from '@/spotify/spotifyQueryKeys';
import { useSpotifyTokensQuery } from '@/spotify/hooks/useSpotifyTokensQuery';
import { useGlobalStore } from '@/store/store';
import { colors } from '@/theme/colors';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { WebView } from 'react-native-webview';
import { OnShouldStartLoadWithRequest } from 'react-native-webview/lib/WebViewTypes';

export default function SpotifyAuth() {
  // const [authCode, setAuthCode] = useState<string | undefined>();
  const setAuthCode = useGlobalStore(state => state.setAuthCode);
  const authCode = useGlobalStore(state => state.authCode);
  const params = useLocalSearchParams();
  const loginUri = constructSpotifyLoginUri();
  const uri = (params?.link as string) ?? loginUri;
  const webViewRef = useRef<WebView>(null);

  const { data, error, isError, isFetched } = useSpotifyTokensQuery(authCode, {
    enabled: !!authCode,
    queryKey: spotifyQueryKeys.tokens,
  });

  const handleLoadRequest: OnShouldStartLoadWithRequest = request => {
    const { url } = request;
    console.log('handleRequest: ', { url });
    if (url.startsWith(REDIRECT_URI)) {
      const code = extractAuthCodeFromUrl(url);

      if (code) {
        setAuthCode(code);
      }
      router.back();
      return true;
    }
    if (url.startsWith('https://accounts.spotify.com/en/login?flow')) {
      //redirect to auth sign in screen because this is the generic one
      webViewRef.current?.injectJavaScript(
        `window.location.href = "${loginUri}"`,
      );
    }
    return true;
  };

  return (
    <View style={containerStyle}>
      <WebView
        key={90}
        javaScriptCanOpenWindowsAutomatically={true}
        style={webViewStyle}
        // source={{ uri: 'https://google.com' }}
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
