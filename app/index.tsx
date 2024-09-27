import { WelcomeBackground } from "@/components/backgrounds/WelcomeBackground";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { WelcomeText } from "@/components/text/WelcomeText";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { Text, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
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
      <SafeAreaView style={safeAreaStyle}>
        <View style={welcomeTextContainerStyle}>
          <WelcomeText />
        </View>
        <View style={buttonContainerStyle}>
          <PrimaryButton text="Sign up" />
          <SecondaryButton text="Sign in" />
        </View>
      </SafeAreaView>
    </View>
  );
}

const safeAreaStyle: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.m,
  paddingBottom: spacing.l,
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
