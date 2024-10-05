import { CommunityIcon } from "@/components/icons/CommunityIcon";
import { DiscoverIcon } from "@/components/icons/DiscoverIcon";
import { HomeIcon } from "@/components/icons/HomeIcon";
import { ProfileIcon } from "@/components/icons/ProfileIcon";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function MainTabsLayout() {
  return (
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
          <BlurView  style={{ width:'100%', height:'100%'}} tint="dark" intensity={40} />
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
  );
}
