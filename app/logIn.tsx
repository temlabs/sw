import { WelcomeBackground } from "@/components/backgrounds/welcomeBackground/WelcomeBackground";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { TextInput } from "@/components/textInputs/TextInput";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { signIn } from "aws-amplify/auth";
import { Link, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextStyle,
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
  const [isLoading, setIsLoading] = useState(false)
  const insets = useSafeAreaInsets();
  const { initialUsername = "" } = useLocalSearchParams();
  const [username, setUsername] = useState<string>(
    typeof initialUsername === "string" ? initialUsername : ""
  );
  const [password, setPassword] = useState("");

  const handleLogIn = async () => {
    console.log("Log in");
    try {
      setIsLoading(true)
      const signInRes = await signIn({
        username,
        password,
        options: { authFlowType: "USER_SRP_AUTH" },
      });
      console.log("signInRes", signInRes);
    } catch (error) {
      setIsLoading(false)
      console.log("error", error, error.message);
    }finally {
      setIsLoading(false)
    }
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
            paddingTop: insets.top + spacing.l,
            paddingBottom: Math.min(insets.bottom, spacing.l),
          }}
        >
          <Text style={titleStyle}>hello, again</Text>
          <Animated.View
            style={inputContainerStyle}
            entering={FadeIn.delay(500)}
            exiting={FadeOut}
          >
            <TextInput
              label=""
              value={username}
              autoCapitalize="none"
              onChangeText={(text) => setUsername(text)}
              placeholder="Username/Email"
            />

            <TextInput
              label=""
              placeholder="Password"
              placeholderTextColor={"grey"}
              value={password}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </Animated.View>
          <View style={buttonContainerStyle}>
            <PrimaryButton text="Log in" onPress={handleLogIn}  isLoading={isLoading}/>

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
  // paddingBottom: spacing.l,
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
  // gap: spacing.s,
};

const titleStyle: TextStyle = {
  ...typography.h3,
  color: colors.text.primary,
  alignSelf: "center",
  opacity: 0.5,
};
