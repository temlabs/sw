export const getPlayerScript = (accessToken: string) => `

const originalConsoleLog = console.log;
console.log = (...args) => {
window.ReactNativeWebView.postMessage('sheerwondercl'+JSON.stringify(args));
originalConsoleLog.apply(console, args);
};
console.log('script is running');

// console.log('webview active')
// console.log('access token: '+'${accessToken}');



const script = document.createElement("script");
script.src = "https://sdk.scdn.co/spotify-player.js";
script.async = true;
document.body.appendChild(script);



window.onSpotifyWebPlaybackSDKReady = () => {
  

    const player = new window.Spotify.Player({
        name: 'sheerwonder',
        getOAuthToken: cb => { cb('${accessToken}'); },
        volume: 0.5
    });


    player.on('initialization_error', ({ message }) => {
        console.error('Failed to initialize', message);
    });


    player.on('authentication_error', ({ message }) => {
    console.error('Failed to authenticate', message);
    });

    player.on('account_error', ({ message }) => {
    console.error('Failed to validate Spotify account', message);
    });

    player.on('playback_error', ({ message }) => {
    console.error('Failed to perform playback', message);
    });

    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID: ', device_id);
        window.ReactNativeWebView.postMessage('deviceIdReceived'+device_id);
    });

    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    player.addListener('player_state_changed', playbackState => {
        console.log('Player state change');
        const message = JSON.stringify(playbackState)
        window.ReactNativeWebView.postMessage('playbackStateChanged'+message)
      });


    player.connect().then(success => {
        if (success) {
          console.log('The Web Playback SDK successfully connected to Spotify!');

        } else {
            console.log('The Web Playback SDK could not connect to Spotify!')
        }
    })

};
return true

`;
