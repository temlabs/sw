import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";

export default function HomeTab() {
  const data = [];

  return (
    <View style={styles.container}>
      <FlashList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
