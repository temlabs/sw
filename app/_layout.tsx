import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

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

  return <Stack screenOptions={{ headerShown: false }} />;
}
