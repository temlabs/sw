import { signUp } from "@/auth/functions";
import { SignUpErrorCode } from "@/auth/types";
import { FadeView } from "@/components/animated/FadeView";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { TextInput } from "@/components/textInputs/TextInput";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/forms/functions";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  BackHandler,
  Keyboard,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const validationFunctions = [validateEmail, validateUsername, validatePassword];

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(["", "", ""]);
  const [touched, setTouched] = useState([false, false, false]);
  const sharedOpacity = useSharedValue(0);

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      const signUpRes = await signUp({ username, password, email });
      router.push({
        pathname: "/confirmSignUp",
        params: { username, password, email, ...signUpRes },
      });
      return;
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        const errorCode = error.name as SignUpErrorCode;
        if (errorCode === "UserExists") {
          // redirect user back to login
          router.navigate({
            pathname: "/logIn",
            params: { initialUsername: username },
          });
        } else if (errorCode === "UsernameExists") {
          setErrors((prev) => {
            const newErrors = [...prev];
            newErrors[1] = "Aw man! This username is already taken";
            return newErrors;
          });
          setIndex(1);
        } else if (
          errorCode === "LimitExceeded" ||
          errorCode === "RequestsOverload"
        ) {
          setErrors((prev) => {
            const newErrors = [...prev];
            newErrors[2] =
              "Our servers are currently maxed out. Please try again soon.";
            return newErrors;
          });
        } else if (errorCode === "InvalidPassword") {
          setErrors((prev) => {
            const newErrors = [...prev];
            newErrors[2] = "Unfortunately, this password isn't valid";
            return newErrors;
          });
        } else if (errorCode === "Error") {
          setErrors((prev) => {
            const newErrors = [...prev];
            newErrors[2] =
              "Something has gone wrong here. We're working on it.";
            return newErrors;
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  const incrementIndex = () => {
    if (index < 2) {
      sharedOpacity.value = withTiming(
        0,
        undefined,
        (finished) => finished && runOnJS(setIndex)(index + 1)
      );
    } else {
      handleSignUp();
    }
  };
  useAnimatedReaction(
    () => index,
    (i) => {
      // fade in the current index
      sharedOpacity.value = withTiming(1);
    },
    [index]
  );

  const goBack = () => {
    if (index > 0) {
      sharedOpacity.value = withTiming(
        0,
        undefined,
        (finished) => finished && runOnJS(setIndex)(index - 1)
      );
    } else {
      router.back();
    }
  };
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        goBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, [index]);

  const validateField = (text: string, index: number) => {
    const [result, error] = validationFunctions[index](text);

    setErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = error;
      return newErrors;
    });
  };

  const handleBlur = (text: string, index: number) => {
    setTouched((prev) => {
      const newTouched = [...prev];
      newTouched[index] = true;
      return newTouched;
    });
    validateField(text, index);
  };

  const continueText =
    index === 0 ? "Continue" : index === 1 ? "Next" : "Sign Up";

  const continueDisabled =
    errors[index] !== "" ||
    !touched[index] ||
    (index === 0 && !email) ||
    (index === 1 && !username) ||
    (index === 2 && !password);

  const preventSubmit =
    errors[index] !== "" ||
    (index === 0 && !email) ||
    (index === 1 && !username) ||
    (index === 2 && !password);

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
          {index === 0 ? (
            <FadeView style={inputContainerStyle} opacity={sharedOpacity}>
              <View style={innerInputContainerStyle}>
                <TextInput
                  label="What's your email address?"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    touched[0] && validateField(text, 0);
                  }}
                  errorText={errors[0]}
                  onBlur={() => handleBlur(email, 0)}
                  returnKeyType="next"
                  onSubmitEditing={
                    (!preventSubmit && incrementIndex) || undefined
                  }
                />
              </View>
            </FadeView>
          ) : index === 1 ? (
            <FadeView style={inputContainerStyle} opacity={sharedOpacity}>
              <View style={innerInputContainerStyle}>
                <TextInput
                  label="Choose a username"
                  value={username}
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    setUsername(text);
                    touched[1] && validateField(text, 1);
                  }}
                  leadingIcon={<Text style={leadingIconStyle}>@</Text>}
                  errorText={errors[1]}
                  onBlur={() => handleBlur(username, 1)}
                  returnKeyType="next"
                  onSubmitEditing={
                    (!preventSubmit && incrementIndex) || undefined
                  }
                  // autoFocus={true}
                />
              </View>
            </FadeView>
          ) : index === 2 ? (
            <FadeView style={inputContainerStyle} opacity={sharedOpacity}>
              <View
                style={{
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={titleStyle}
                >{`You're going to love it here, @${username}`}</Text>
              </View>
              <View style={innerInputContainerStyle}>
                <TextInput
                  label={`Please choose a password`}
                  value={password}
                  textContentType="password"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  onChangeText={(text) => {
                    setPassword(text);
                    touched[2] && validateField(text, 2);
                  }}
                  errorText={errors[2]}
                  onBlur={() => handleBlur(password, 2)}
                  returnKeyType="send"
                  onSubmitEditing={
                    (!preventSubmit && incrementIndex) || undefined
                  }
                />
              </View>
            </FadeView>
          ) : null}

          <View style={buttonContainerStyle}>
            <PrimaryButton
              isLoading={isLoading}
              text={continueText}
              onPress={incrementIndex}
              disabled={continueDisabled}
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
