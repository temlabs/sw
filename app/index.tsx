import { WelcomeBackground } from "@/components/backgrounds/welcomeBackground/WelcomeBackground";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { WelcomeText } from "@/components/text/WelcomeText";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { Href, Link, router, usePathname } from "expo-router";
import { Text, View, ViewStyle } from "react-native";
import Animated, { FadeIn, FadeOut, useAnimatedReaction, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const goToSignUp = () => {
    router.push("/signUp");
  };

  const currentPath = usePathname() as Href
  const buttonOpacity = useSharedValue(1)
  useAnimatedReaction(()=>currentPath, path => {
    if(path === '/'){
      buttonOpacity.value = withDelay(150, withSpring(1, {mass:5, damping:50}))
    }else {
      buttonOpacity.value = 0
    }
  })
  const buttonAnimatedStyle = useAnimatedStyle(()=>{
    return {opacity:buttonOpacity.value}
  })

  const goToSignIn = () => {
    router.push("/logIn");
  };

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: "red",
        // backgroundColor: colors.background.primary,
      }}
    >
      {/* <View style={welcomeBackgroundContainerStyle}>
        <WelcomeBackground />
      </View> */}
      <SafeAreaView style={safeAreaStyle}>
        <View style={welcomeTextContainerStyle}>{/* <WelcomeText /> */}</View>
        <Animated.View
          style={[buttonContainerStyle,buttonAnimatedStyle]}
          // entering={FadeIn.delay(2500).duration(1000)}
        >
          <Link href="/signUp" asChild>
            <PrimaryButton text="Sign up" />
          </Link>
          <Link href="/logIn" asChild>
            <SecondaryButton text="Log in" />
          </Link>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const safeAreaStyle: ViewStyle = {
  flex: 1,
  backgroundColor: "transparent",
  paddingHorizontal: spacing.m,
  // paddingBottom: spacing.l,
  justifyContent: "flex-end",
  gap: spacing.xl,
};

const welcomeTextContainerStyle: ViewStyle = {
  width: "100%",
};

const welcomeBackgroundContainerStyle: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

const buttonContainerStyle: ViewStyle = {
  flexDirection: "column",
  gap: spacing.m,
};
