import React from "react";

import { View, Text, ViewStyle, TextStyle } from "react-native";
import { Image, ImageStyle } from "expo-image";
import { spacing } from "@/theme/spacing";
import { isoDateToFeedDate } from "@/posts/functions";
import { colors } from "@/theme/colors";
import { UpvoteButton } from "../buttons/UpvoteButton";
import { ReplyButton } from "../buttons/ReplyButton";
import { BookmarkButton } from "../buttons/BookmarkButton";
import { typography } from "@/theme/typography";
import { ShortPost } from "@/posts/types";
import { TrackCard } from "../trackCard/TrackCard";

export function FeedShortPost(post: ShortPost) {
  const postTime = isoDateToFeedDate(post.createdAt);
  const trackCardProps = {
    postId:post.id,
    artwork:post.artwork,
    name:post.name,
    spotifyId:post.spotifyId,
    timeIn:post.timeIn,
    timeOut:post.timeOut,
  // artist // duration // id needed
  artist:'tem',
  duration:60000,
  id:353

  }


  return (
    <View style={postContainerStyle}>
      <View style={imageColumnStyle}>
        <Image style={imageStyle} source={post.avatarUrl} contentFit="cover" />
      </View>

      <View style={contentColumnStyle}>
        <View style={headerContainerStyle}>
          <View style={titleContainerStyle}>
            <Text style={displayNameStyle}>{post.displayName}</Text>
            <Text style={usernameStyle}>@{post.username}</Text>
          </View>
          <Text style={postTimeStyle}>{postTime}</Text>
        </View>
        <View style={contentContainerStyle}>
          <Text style={postTextStyle}>{post.text}</Text>
          {/* {track goes here} */}
          <TrackCard  {...trackCardProps}/>
        </View>
        <View style={bottomBarContainerStyle}>
          <View style={leftBarStyle}>
            <UpvoteButton count={post.upvoteCount} />
            <ReplyButton onPress={() => {}} count={post.replyCount} />
          </View>
          <View style={rightBarStyle}>
            <BookmarkButton onPress={() => {}} count={post.saveCount} />
          </View>
        </View>
      </View>
    </View>
  );
}

const postContainerStyle: ViewStyle = {
  flexDirection: "row",
  padding: spacing.m,
  paddingHorizontal: spacing.l,
  gap: spacing.m,
  width: "100%",
};

const imageColumnStyle: ViewStyle = {
  justifyContent: "flex-start",
};

const imageStyle: ImageStyle = {
  height: 30,
  width: 30,
  borderRadius: 15,
  backgroundColor: colors.background.secondary,
};

const contentColumnStyle: ViewStyle = {gap:spacing.m, flexGrow:1};

const headerContainerStyle: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",

  // backgroundColor:'blue'
};

const titleContainerStyle: ViewStyle = {
  flexDirection: "row",
  flexWrap:'wrap',
  gap: spacing.xs,
  alignItems:'center'

};

const contentContainerStyle: ViewStyle = {
  gap: spacing.m,
};

const bottomBarContainerStyle: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",

  padding: spacing.s,
};

const leftBarStyle: ViewStyle = {
  gap: spacing.s,
  flexDirection:'row',
  justifyContent:'space-between',
  flexShrink:1

};
const rightBarStyle: ViewStyle = {
  // backgroundColor:'blue'
};



const postTextStyle: TextStyle = {
  ...typography.small,
  color: colors.text.primary,
};

const displayNameStyle:TextStyle = {...typography.medium, color:colors.text.primary}
const usernameStyle:TextStyle = {...typography.small, color:colors.text.secondary}
const postTimeStyle:TextStyle = {...typography.small, color: colors.text.secondary}