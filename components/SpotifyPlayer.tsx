import { getPlayerScript } from '@/spotify/functions/playerScript';
import { useSpotifyTokensQuery } from '@/spotify/hooks/useSpotifyTokensQuery';
import { spotifyQueryKeys } from '@/spotify/spotifyQueryKeys';
import { usePlayerWebViewMessage } from '@/spotify/usePlayerWebviewMessage';
import { useGlobalStore } from '@/store/store';
import React, { useEffect, useRef } from 'react';
import { ViewStyle } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

export function SpotifyPlayer() {
  const webViewRef = useRef<WebView>(null);
  const authCode = useGlobalStore(state => state.authCode);
  const { data, dataUpdatedAt } = useSpotifyTokensQuery({
    queryKey: spotifyQueryKeys.tokens(authCode),
    enabled: !!authCode,
  });
  const { onDeviceIdMessage, onPlaybackStateChangeMessage } =
    usePlayerWebViewMessage();

  const handleMessage = (e: WebViewMessageEvent) => {
    const message = e.nativeEvent.data;
    // console.debug({ message });
    if (message.startsWith('sheerwondercl')) {
      console.log('Console log from WebView:', message.slice(14));
    } else if (message.startsWith('sheerwonderer')) {
      console.error('Console error from WebView:', message.slice(14));
    } else if (message.startsWith('deviceIdReceived')) {
      onDeviceIdMessage(message);
    } else if (message.startsWith('playbackStateChanged')) {
      onPlaybackStateChangeMessage(message);
    } else {
      console.log('Web view message:', message);
    }
  };

  const injectPlayerScript = () => {
    if (data?.accessToken && webViewRef.current) {
      const script = getPlayerScript(data.accessToken);

      webViewRef.current.injectJavaScript(script);
      console.log('Injected Spotify player script');
    }
  };
  // useEffect(() => {

  //   if (data?.accessToken) {
  //     injectPlayerScript();
  //   }
  // }, [data?.accessToken]);

  return (
    <>
      {!!data?.accessToken && (
        <WebView
          ref={webViewRef}
          source={{ uri: 'https://temlabs.github.io/sheerwonder/' }}
          style={webViewStyle}
          onMessage={handleMessage}
          onLoadEnd={() => {
            console.log('WebView loaded, injecting player script');
            injectPlayerScript();
          }}
          contentMode="desktop"
          javaScriptEnabled={true}
          mediaPlaybackRequiresUserAction={false}
          allowsProtectedMedia={true}
          autoManageStatusBarEnabled={true}
          mixedContentMode="always"
          cacheEnabled={false}
          // injectedJavaScript={getPlayerScript(data?.accessToken)}
        />
      )}
    </>
  );
}

const webViewStyle: ViewStyle = {
  position: 'absolute',
  height: 0,
  width: 0,
  top: 0,
  left: 0,
};
