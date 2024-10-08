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
  const { data, dataUpdatedAt } = useSpotifyTokensQuery(authCode, {
    queryKey: spotifyQueryKeys.tokens,
    enabled: !!authCode,
  });
  const { onDeviceIdMessage, onPlaybackStateChangeMessage } =
    usePlayerWebViewMessage();

  const handleMessage = (e: WebViewMessageEvent) => {
    const message = e.nativeEvent.data;
    console.debug({ message });
    if (message.startsWith('sheerwondercl')) {
    } else if (message.startsWith('deviceIdReceived')) {
      onDeviceIdMessage(message);
    } else if (message.startsWith('playbackStateChanged')) {
      onPlaybackStateChangeMessage(message);
    } else {
      console.log('web view log: ', message);
    }
  };

  const showPlayer = !!data?.accessToken;

  console.debug({ showPlayer });

  useEffect(() => {
    if (data?.accessToken) {
      const injectedJavaScript = getPlayerScript(data?.accessToken);
      console.debug('injecting');
      webViewRef.current?.injectJavaScript(injectedJavaScript);
    }
  }, [data?.accessToken, dataUpdatedAt]);

  return (
    <>
      {!!data?.accessToken ? (
        <WebView
          key={2}
          autoManageStatusBarEnabled={true}
          allowsProtectedMedia={true}
          mediaPlaybackRequiresUserAction={false}
          contentMode="desktop"
          mixedContentMode="always"
          forceDarkOn={true}
          ref={webViewRef}
          source={{ uri: 'https://temlabs.github.io/sheerwonder/' }}
          style={webViewStyle}
          onMessage={handleMessage}
          // injectedJavaScript={injectedJavaScript}
          onLoadStart={e => console.log('starting load', e.nativeEvent.loading)}
          onError={e => console.log('encountered error', e)}
          onLoadEnd={e => console.log('finished load')}
        />
      ) : (
        <></>
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
