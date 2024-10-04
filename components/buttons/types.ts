import { PressableProps, TouchableWithoutFeedbackProps } from "react-native";

export interface ButtonProps extends TouchableWithoutFeedbackProps {
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
}
