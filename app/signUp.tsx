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
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
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
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const validationFunctions = [validateEmail, validateUsername, validatePassword];

export default function SignUp() {
  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(["", "", ""]);
  const [touched, setTouched] = useState([false, false, false]);
  const handleSignUp = () => {};
  const incrementIndex = () => {
    index < 2 ? setIndex(index + 1) : handleSignUp();
  };
  const goBack = () => (index > 0 ? setIndex(index - 1) : router.back());
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
          }}
        >
          {index === 0 ? (
            <Animated.View
              style={inputContainerStyle}
              entering={FadeIn.delay(500)}
              exiting={FadeOut.duration(500)}
            >
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
                />
              </View>
            </Animated.View>
          ) : index === 1 ? (
            <Animated.View
              style={inputContainerStyle}
              entering={FadeIn.delay(5000)}
              exiting={FadeOut}
            >
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
                />
              </View>
            </Animated.View>
          ) : index === 2 ? (
            <Animated.View
              style={inputContainerStyle}
              entering={FadeIn.delay(500)}
              exiting={FadeOut}
            >
              <View style={innerInputContainerStyle}>
                <TextInput
                  label="Now choose a password"
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
                />
              </View>
            </Animated.View>
          ) : null}

          <View style={buttonContainerStyle}>
            <PrimaryButton
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
};

const innerInputContainerStyle: ViewStyle = {
  height: "50%",
  justifyContent: "flex-start",
};
