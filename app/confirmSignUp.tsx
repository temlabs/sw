import { confirmSignUp } from "@/auth/functions";
import { ConfirmSignUpErrorCode } from "@/auth/types";
import { FadeView } from "@/components/animated/FadeView";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { TextLinkButton } from "@/components/buttons/TextLinkButton";
import { TextInput } from "@/components/textInputs/TextInput";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/forms/functions";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { resendSignUpCode, signIn } from "aws-amplify/auth";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  BackHandler,
  Keyboard,
  Pressable,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const validationFunctions = [validateEmail, validateUsername, validatePassword];

export default function ConfirmSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const { email = "", password = "", username = "" } = useLocalSearchParams();
  const [confirmationCode, setconfirmationCode] = useState<string>("");
  const [confirmError, setConfirmError] = useState("");
  const sharedOpacity = useSharedValue(0);

  const resendCode = async () => {
    if (!(username && typeof username === "string")) {
      return;
    }
    const res = await resendSignUpCode({ username });
    console.debug("resend code res: ", res);
  };

  const confirmAndLogin = async () => {
    if (
      !(
        username &&
        typeof username === "string" &&
        password &&
        typeof password === "string"
      )
    ) {
      return;
    }
    try {
      setIsLoading(true);
      try {
        const confirmSignUpRes = await confirmSignUp({
          username,
          password,
          confirmationCode,
        });
      } catch (error) {
        if (error instanceof Error) {
          console.debug("error is error", error);
          const errorCode = error.name as ConfirmSignUpErrorCode;
          if (errorCode === "CodeExpired") {
            setConfirmError(
              "This code has expired. We're sending you another..."
            );
            resendCode();
          } else if (errorCode === "FailureOverload") {
            setConfirmError(
              "You've tried too many times, come back later to try again."
            );
          } else if (errorCode === "IncorrectCode") {
            setConfirmError("Wrong code. Try again?");
          } else if (
            errorCode === "UserNonExistent" ||
            errorCode === "Error" ||
            errorCode === "LimitExceeded" ||
            errorCode === "RequestsOverload"
          ) {
            setConfirmError(
              "Something has gone wrong here. We're working on it."
            );
          }
        }
        throw error;
      }

      const signInRes = await signIn({
        username,
        password,
        options: { authFlowType: "USER_SRP_AUTH" },
      });
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useAnimatedReaction(
    () => true,
    () => {
      sharedOpacity.value = withTiming(1);
    },
    []
  );

  const goBack = () => {
    router.back();
  };
  const insets = useSafeAreaInsets();

  const headerText = email
    ? `We sent a code to ${email}`
    : "We sent you a confirmation code to your email address";

  const confirmDisabled = !confirmationCode || confirmationCode.length !== 6;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            paddingHorizontal: spacing.m,
          }}
        >
          <FadeView style={inputContainerStyle} opacity={sharedOpacity}>
            <View
              style={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={titleStyle}>{headerText}</Text>
              <TextLinkButton
                onPress={resendCode}
                text={"Need another code? Tap here."}
              />
            </View>
            <View style={innerInputContainerStyle}>
              <TextInput
                label={`Please enter your confirmation code`}
                value={confirmationCode}
                textContentType="oneTimeCode"
                keyboardType="number-pad"
                autoCapitalize="none"
                onChangeText={(t) => {
                  setconfirmationCode(t);
                  setConfirmError("");
                }}
                errorText={confirmError}
                returnKeyType="go"
                onSubmitEditing={() => !confirmError && confirmAndLogin()}
                maxLength={6}
              />
            </View>
          </FadeView>

          <View style={buttonContainerStyle}>
            <PrimaryButton
              text={"Let's go"}
              onPress={confirmAndLogin}
              disabled={confirmDisabled}
              isLoading={isLoading}
            />

            <SecondaryButton text="Back" onPress={goBack} />
          </View>
        </View>
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
  justifyContent: "flex-end",
  zIndex: 1,
};

const leadingIconStyle: TextStyle = {
  ...typography.medium,
  color: colors.text.primary,
  alignSelf: "center",
  paddingBottom: 4, // half border radius - spacing.m
  paddingLeft: 20, // half border radius
  paddingRight: 0,
};

const innerInputContainerStyle: ViewStyle = {
  height: "50%",
  justifyContent: "flex-start",
  overflow: "hidden",
};

const titleStyle: TextStyle = {
  ...typography.h3,
  color: colors.text.primary,
  alignSelf: "center",
  opacity: 0.5,
};
