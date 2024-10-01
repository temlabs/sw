import { WelcomeBackground } from "@/components/backgrounds/welcomeBackground/WelcomeBackground";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { useFonts } from "expo-font";
import { router, Stack, usePathname } from "expo-router";
import React, { useEffect } from "react";
import { View, ViewStyle } from "react-native";
import { useAnimatedReaction } from "react-native-reanimated";
import { enableFreeze } from "react-native-screens";
enableFreeze(false);

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Sora-ExtraBold": require("@/assets/fonts/Sora-ExtraBold.ttf"),
    "Sora-Bold": require("@/assets/fonts/Sora-Bold.ttf"),
    "Sora-SemiBold": require("@/assets/fonts/Sora-SemiBold.ttf"),
    "Sora-Medium": require("@/assets/fonts/Sora-Medium.ttf"),
    "Sora-Regular": require("@/assets/fonts/Sora-Regular.ttf"),
    "Sora-Light": require("@/assets/fonts/Sora-Light.ttf"),
    "Sora-ExtraLight": require("@/assets/fonts/Sora-ExtraLight.ttf"),
    "Sora-Thin": require("@/assets/fonts/Sora-Thin.ttf"),
  });

  const isAuthenticated = true;

  useEffect(() => {
    if (fontsLoaded && isAuthenticated) {
      router.replace("/main");
    }
  }, [fontsLoaded, isAuthenticated]);

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.primary,
      }}
    >
      <View style={welcomeBackgroundContainerStyle}>
        <WelcomeBackground />
      </View>

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          animationDuration: 150,
          customAnimationOnGesture: true,
          animationTypeForReplace: "push",
          headerTitleStyle: { ...typography.h1, color: colors.text.primary },
          headerTransparent: true,
          statusBarTranslucent: true,
          headerTintColor: colors.text.primary,
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Stack.Screen name={"index"} options={{ headerShown: false }} />
        <Stack.Screen name={"signUp"} options={{ title: "Sign up" }} />
        <Stack.Screen name={"logIn"} options={{ title: "Log in" }} />
      </Stack>
    </View>
  );
}

const welcomeBackgroundContainerStyle: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};
