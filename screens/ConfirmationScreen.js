import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const theme = {
  primaryColor: "#CD433A",
  accentColor: "#FF9800",
  backgroundColor: "#F5F5F5",
  textColor: "#333",
  subTextColor: "#888",
};

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { property, paymentAmount, paymentMethod } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={theme.primaryColor}
        barStyle="light-content"
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Ionicons
            name="checkmark-circle"
            size={100}
            color={theme.primaryColor}
            style={styles.icon}
          />
          <Text style={styles.title}>Payment Successful!</Text>
          <Text style={styles.text}>
            Your application for {property.title} has been successfully
            submitted and your payment of P{paymentAmount} has been processed
            using {paymentMethod}.
          </Text>

          <Text style={styles.text}>
            We will review your application and get back to you shortly with the
            next steps.
          </Text>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Text style={styles.homeButtonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  container: {
    padding: 16,
    alignItems: "center",
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.textColor,
    marginBottom: 16,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: theme.textColor,
    marginBottom: 16,
    textAlign: "center",
  },
  homeButton: {
    backgroundColor: theme.accentColor,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  homeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default ConfirmationScreen;
