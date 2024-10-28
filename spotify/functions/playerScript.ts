export const getPlayerScript = (accessToken: string) => `
console.log('Player script started');



// Preserve original console methods
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

console.log = (...args) => {
  window.ReactNativeWebView.postMessage('sheerwondercl' + JSON.stringify(args));
  originalConsoleLog.apply(console, args);
};

console.error = (...args) => {
  window.ReactNativeWebView.postMessage('sheerwonderer' + JSON.stringify(args));
  originalConsoleError.apply(console, args);
};

// Check if the Spotify SDK script is already loaded
if (typeof Spotify !== 'undefined') {
  console.log('Spotify SDK already loaded');
  initializePlayer();
} else {
  console.log('Loading Spotify SDK');
  const script = document.createElement('script');
  script.src = 'https://sdk.scdn.co/spotify-player.js';
  script.async = true;
  
  script.onload = () => {
    console.log('Spotify SDK script loaded');
  };
  
  script.onerror = (error) => {
    console.error('Error loading Spotify SDK:', error);
  };
  
  document.body.appendChild(script);
}

window.onSpotifyWebPlaybackSDKReady = () => {
  console.log('Spotify Web Playback SDK Ready');
  initializePlayer();
};

function initializePlayer() {
  console.log('Initializing Spotify player');
  
  if (!window.Spotify) {
    console.error('Spotify SDK not available');
    return;
  }
console.log('webview access token','${accessToken}');
  const player = new window.Spotify.Player({
    name: 'sheerwonder',
    getOAuthToken: cb => { cb('${accessToken}');},
    volume: 0.5
  });

  player.addListener('ready', ({ device_id }) => {
    console.log('Player ready with device ID:', device_id);
    window.ReactNativeWebView.postMessage('deviceIdReceived' + device_id);
  });

  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
    window.ReactNativeWebView.postMessage('deviceOffline' + device_id);
  });

  player.addListener('initialization_error', ({ message }) => {
    console.error('Failed to initialize', message);
  });

  player.addListener('authentication_error', ({ message,...error }) => {
    console.error('Failed to authenticate', message, error);
  });

  player.addListener('account_error', ({ message }) => {
    console.error('Failed to validate Spotify account', message);
  });

  player.addListener('playback_error', (e) => {
    console.error('Failed to perform playback', e);
  });

    player.addListener('player_state_changed', playbackState => {
        console.log('Player state change');
        const message = JSON.stringify(playbackState)
        window.ReactNativeWebView.postMessage('playbackStateChanged'+message)
      });

  player.connect().then(success => {

    if (success) {
      window.ReactNativeWebView.postMessage('connectSuccess');
      console.log('connectSuccess The Web Playback SDK successfully connected to Spotify!');
    } else {
         window.ReactNativeWebView.postMessage('connectFail');
      console.error('connectFail The Web Playback SDK failed to connect to Spotify');
    }
  }).catch(error => {
    console.error('Error connecting to Spotify:', JSON.stringify(message));
  });

  window.spotifyPlayer = player;
}

console.log('Player script finished');
`;
