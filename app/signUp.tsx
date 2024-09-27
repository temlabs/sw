import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { Alert, BackHandler, Text, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background.primary,
      }}
    >
      <SafeAreaView style={safeAreaStyle}>
        <Text style={{ ...typography.h0, color: colors.text.primary }}>
          Sign up
        </Text>
        <View style={buttonContainerStyle}>
          <Link href="/signUp" asChild>
            <PrimaryButton text="Create my account" />
          </Link>
          <Link href="/" asChild>
            <SecondaryButton text="Back" />
          </Link>
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
