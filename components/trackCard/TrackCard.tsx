import { ShortPost } from '@/posts/types';
import { spacing } from '@/theme/spacing';
import { Track } from '@/tracks/types';
import React from 'react'
import { ViewStyle, View, TextStyle , Text} from 'react-native';
import { Image, ImageStyle } from "expo-image";
import { typography } from '@/theme/typography';
import { colors } from '@/theme/colors';

interface Props extends Track {

postId:ShortPost['id']
}


export function TrackCard(props:Track){


    return (

        <View style={containerStyle}>
            <View style={imageColumnStyle}>
                <Image source={props.artwork} style={artworkStyle} contentFit='cover' />
            </View>
            <View style={titleColumnStyle}>
<Text style={trackName}>{props.name}</Text>
<Text style={artistName}>{props.artist}</Text>
            </View>

        </View>

    )



}

const containerStyle:ViewStyle = {
    // height:50, 
    borderRadius:10,
    borderCurve:'circular',
    padding:spacing.m,
    gap:spacing.m,
    backgroundColor:'blue',
    flexDirection:'row',
    justifyContent:'space-between',
    flexGrow:1
}

const imageColumnStyle:ViewStyle = {}

const titleColumnStyle:ViewStyle = {
    gap:0,
    flexGrow:1,
    justifyContent:'flex-start',
}

const trackName:TextStyle = {
    ...typography.smallBold,
    color:colors.text.primary
}
const artistName:TextStyle ={
    ...typography.small,
    color:colors.text.secondary
}

const artworkStyle:ImageStyle = {
    width:30,
    height:30
    

}