import { router } from "expo-router"


export function useSpotifyStatus(){




    const text = 'Tap here to sign in to Spotify and start listening'

    const onPress = ()=>{
        router.navigate('/spotify')
    }


    return {text, onPress}
}