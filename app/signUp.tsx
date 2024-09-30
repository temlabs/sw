import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { TextInput } from "@/components/textInputs/TextInput";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Keyboard,
  Pressable,
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

export default function SignUp() {
  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = () => {
    console.log("Sign up");
  };
  const incrementIndex = () => {
    index < 2 ? setIndex(index + 1) : handleSignUp;
  };
  const goBack = () => (index > 0 ? setIndex(index - 1) : router.back());
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        goBack();
        return true; // Prevent default behavior
      }
    );

    return () => backHandler.remove();
  }, [index]);

  const continueText =
    index === 0 ? "Continue" : index === 1 ? "Next" : "Sign Up";

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          ...safeAreaStyle,
          paddingTop: insets.top,
          paddingBottom: spacing.l + insets.bottom,
        }}
      >
        {index === 0 ? (
          <Animated.View
            style={inputContainerStyle}
            entering={FadeIn.delay(500)}
            exiting={FadeOut.duration(500)}
          >
            <TextInput
              label="What's your email address?"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </Animated.View>
        ) : index === 1 ? (
          <Animated.View
            style={inputContainerStyle}
            entering={FadeIn.delay(5000)}
            exiting={FadeOut}
          >
            <TextInput
              label="Choose a username"
              value={username}
              autoCapitalize="none"
              onChangeText={(text) => setUsername(text)}
            />
          </Animated.View>
        ) : index === 2 ? (
          <Animated.View
            style={inputContainerStyle}
            entering={FadeIn.delay(500)}
            exiting={FadeOut}
          >
            <TextInput
              label="Now choose a password"
              value={password}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
          </Animated.View>
        ) : null}

        <View style={buttonContainerStyle}>
          <PrimaryButton text={continueText} onPress={incrementIndex} />

          <SecondaryButton text="Back" onPress={goBack} />
        </View>
      </View>
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

const buttonContainerStyle: ViewStyle = {
  flexDirection: "column",
  gap: spacing.m,
};

const inputContainerStyle: ViewStyle = {
  flexGrow: 1,
  justifyContent: "center",
  zIndex: 1,
};
