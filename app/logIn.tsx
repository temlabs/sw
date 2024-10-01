import { WelcomeBackground } from "@/components/backgrounds/welcomeBackground/WelcomeBackground";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { TextInput } from "@/components/textInputs/TextInput";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function LogIn() {
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = () => {
    console.log("Log in");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
        }}
      >
        <KeyboardAvoidingView
          style={{
            ...safeAreaStyle,
            paddingTop: insets.top,
            paddingBottom: spacing.l + insets.bottom,
          }}
        >
          <Animated.View
            style={inputContainerStyle}
            entering={FadeIn.delay(500)}
            exiting={FadeOut}
          >
            <TextInput
              label="Username/Email"
              value={username}
              autoCapitalize="none"
              onChangeText={(text) => setUsername(text)}
            />

            <TextInput
              label="Password"
              value={password}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </Animated.View>
          <View style={buttonContainerStyle}>
            <PrimaryButton text="Log in" onPress={handleLogIn} />

            <Link href="/" asChild>
              <SecondaryButton text="Back" />
            </Link>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const safeAreaStyle: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.m,
  paddingBottom: spacing.l,
  justifyContent: "flex-end",
  gap: spacing.xl,
};

const buttonContainerStyle: ViewStyle = {
  flexDirection: "column",
  gap: spacing.m,
};

const inputContainerStyle: ViewStyle = {
  flexGrow: 1,
  justifyContent: "center",
  gap: spacing.m,
};
