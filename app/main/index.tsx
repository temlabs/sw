import { typography } from "@/theme/typography";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={typography.h0}>This is the main part of the app.</Text>
    </View>
  );
}
