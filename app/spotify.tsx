import { constructSpotifyLoginUri, extractAuthCodeFromUrl } from '@/spotify/authFunctions';
import { REDIRECT_URI } from '@/spotify/config';
import { colors } from '@/theme/colors'
import { router } from 'expo-router';
import React, { useRef } from 'react'
import {View, ViewStyle} from 'react-native'
import { WebView } from 'react-native-webview';
import { OnShouldStartLoadWithRequest } from 'react-native-webview/lib/WebViewTypes';

export default function SpotifyAuth(){

    const uri = constructSpotifyLoginUri();
    const webViewRef = useRef<WebView>(null);

    const handleLoadRequest: OnShouldStartLoadWithRequest = request => {
        const {url} = request;
    
        if (url.startsWith(REDIRECT_URI)) {
          const code = extractAuthCodeFromUrl(url);
        //   setSpotifyAuthCode(code);
          router.back()
          return false;
        }
        return true;
      };



    return (
        <View style={containerStyle}>
<WebView      javaScriptCanOpenWindowsAutomatically={true} style={webViewStyle} source={{uri}} onShouldStartLoadWithRequest={handleLoadRequest}   scrollEnabled={true} originWhitelist={['*']} />
        </View>
    )
}

const containerStyle:ViewStyle = {
    flex:1,
    backgroundColor:"#0e0b07"
}

const webViewStyle: ViewStyle = {
    flex: 1,
    backgroundColor: '#0e0b07',
  };