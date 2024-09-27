import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { enableFreeze } from "react-native-screens";
enableFreeze(true);

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

  const isAuthenticated = false;

  useEffect(() => {
    if (fontsLoaded && isAuthenticated) {
      router.replace("/main");
    }
  }, [fontsLoaded, isAuthenticated]);

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        animation: "fade_from_bottom",
        animationDuration: 200,
        customAnimationOnGesture: true,
        animationTypeForReplace: "push",
        headerTitleStyle: { ...typography.h1, color: colors.text.primary },
        headerTransparent: true,
        statusBarTranslucent: true,
        headerTintColor: colors.text.primary,
      }}
    >
      <Stack.Screen name={"index"} options={{ headerShown: false }} />
      <Stack.Screen name={"signUp"} options={{ title: "Sign up" }} />
      <Stack.Screen name={"logIn"} options={{ title: "Log in" }} />
    </Stack>
  );
}
