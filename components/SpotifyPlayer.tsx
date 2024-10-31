import { getPlayerScript } from '@/spotify/functions/playerScript';
import { useSpotifyTokensQuery } from '@/spotify/hooks/useSpotifyTokensQuery';
import { spotifyQueryKeys } from '@/spotify/spotifyQueryKeys';
import { usePlayerWebViewMessage } from '@/spotify/usePlayerWebviewMessage';
import { useGlobalStore } from '@/store/store';
import { screenHeight, screenWidth } from '@/theme/constants';
import React, { useEffect, useRef } from 'react';
import { View, ViewStyle } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

export function SpotifyPlayer() {
  const webViewRef = useRef<WebView>(null);
  const authCode = useGlobalStore(state => state.authCode);
  const { data, dataUpdatedAt } = useSpotifyTokensQuery({
    queryKey: spotifyQueryKeys.tokens(authCode),
    enabled: !!authCode,
  });
  console.debug('scopes:', data?.scope);
  const { onDeviceIdMessage, onPlaybackStateChangeMessage, onDeviceOffline } =
    usePlayerWebViewMessage();
  const setPlayerState = useGlobalStore(state => state.setPlayerState);

  const handleMessage = (e: WebViewMessageEvent) => {
    const message = e.nativeEvent.data;
    // console.debug('pure message', { message: message });
    if (message.startsWith('sheerwondercl')) {
      console.log('Console log from WebView:', message.slice(14));
    } else if (message.startsWith('sheerwonder')) {
      console.error('Console error from WebView:', message.slice(14));
    } else if (message.startsWith('deviceIdReceived')) {
      onDeviceIdMessage(message);
    } else if (message.startsWith('playbackStateChanged')) {
      onPlaybackStateChangeMessage(message);
    } else if (message.startsWith('ready')) {
      setPlayerState('READY');
    } else if (message.startsWith('deviceOffline')) {
      onDeviceOffline(message);
    } else if (message.startsWith('connectSuccess')) {
      console.debug('setting player state connected');
      setPlayerState('CONNECTED');
    } else if (message.startsWith('connectFail')) {
      console.debug('setting player state disconnected');
      setPlayerState('DISCONNECTED');
    } else {
      console.log('Web view message:', message);
    }
  };

  // const injectPlayerScript = () => {
  //   if (data?.accessToken && webViewRef.current) {
  //     const script = getPlayerScript(data.accessToken);

  //     webViewRef.current.injectJavaScript(script);
  //     console.log('Injected Spotify player script');
  //   }
  // };
  // useEffect(() => {
  //   if (data?.accessToken) {
  //     injectPlayerScript();
  //   }
  // }, [data?.accessToken]);

  return (
    <View>
      {!!data?.accessToken && (
        <WebView
          key={3}
          ref={webViewRef}
          source={{
            uri: 'https://temlabs.github.io/sw/',
          }}
          style={webViewStyle}
          onMessage={handleMessage}
          injectedJavaScript={getPlayerScript(data.accessToken)}
          // onLoadEnd={() => {
          //   console.log('WebView loaded, injecting player script');
          //   injectPlayerScript();
          // }}
          contentMode="desktop"
          userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
          javaScriptEnabled={true}
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback
          allowsProtectedMedia={true}
          autoManageStatusBarEnabled={true}
          mixedContentMode="always"
          mediaCapturePermissionGrantType="grant"
          forceDarkOn={true}

          // injectedJavaScript={getPlayerScript(data?.accessToken)}
        />
      )}
    </View>
  );
}

const webViewStyle: ViewStyle = {
  position: 'absolute',
  height: screenHeight,
  width: screenWidth,
  paddingBottom: 0,
  left: 0,
  zIndex: 99999,
};
