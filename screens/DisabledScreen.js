import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DisabledScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.disabledText}>
        This feature is currently disabled.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  disabledText: {
    fontSize: 18,
    color: "#888",
  },
});

export default DisabledScreen;
