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
      <Text style={typography.h0}>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
