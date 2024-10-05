import { CommunityIcon } from "@/components/icons/CommunityIcon";
import { DiscoverIcon } from "@/components/icons/DiscoverIcon";
import { HomeIcon } from "@/components/icons/HomeIcon";
import { ProfileIcon } from "@/components/icons/ProfileIcon";
import { SpotifyPill } from "@/components/SpotifyPill";
import { useSpotifyStatus } from "@/spotify/useSpotifyStatus";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { useState } from "react";
import { View, ViewStyle } from "react-native";


export default function MainTabsLayout() {
  const [tabBarHeight, setTabBarHeight] = useState<number|undefined>()

  const {text, onPress} = useSpotifyStatus()


  return (
    <>
    <Tabs
      sceneContainerStyle={{
        backgroundColor: "transparent",
      }}
    
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "transparent",
          position:'absolute',
          elevation: 0,
          paddingVertical:spacing.s,
          borderTopColor: colors.border.bottomTab,
        
         
        },
        tabBarActiveTintColor: colors.primary,
        tabBarShowLabel: false,
        // headerShown: false,
        headerTintColor: colors.text.primary,
        headerTitleStyle: typography.h2,
        headerTransparent: true,
        tabBarBackground: () => (
          <BlurView  style={{ width:'100%', height:'100%'}} tint="dark" intensity={40} onLayout={e=>setTabBarHeight(e.nativeEvent.layout.height)} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown:false,
          tabBarIcon: ({ color }) => (
            <HomeIcon width={24} height={24} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => (
            <DiscoverIcon width={24} height={24} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ color }) => (
            <CommunityIcon width={24} height={24} fill={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <ProfileIcon width={24} height={24} fill={color} />
          ),
        }}
      />
    </Tabs>
    <View style={{...spotifyPillContainer, bottom:(tabBarHeight??0)+spacing.s}}><SpotifyPill text={text} onPress={onPress}/></View>
    </>
  );
}


const spotifyPillContainer: ViewStyle = {
  position:'absolute',
  bottom:0,
  alignSelf:'center'
}