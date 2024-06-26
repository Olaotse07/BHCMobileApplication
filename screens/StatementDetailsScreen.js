import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const theme = {
  primaryColor: "#CD433A",
  accentColor: "#FF9800",
  backgroundColor: "#F5F5F5",
  textColor: "#333",
  subTextColor: "#888",
  highlightColor: "#FFFACD", // Light yellow
};

const StatementDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { statement } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{statement.type} Statement</Text>
          <View style={styles.iconContainer}>
            <FontAwesome
              name={statement.type === "Rental" ? "home" : "file-text"}
              size={48}
              color={theme.primaryColor}
            />
          </View>
          <Text style={styles.detailText}>Amount: {statement.amount}</Text>
          <Text style={styles.detailText}>Balance: {statement.balance}</Text>
          <Text style={styles.detailText}>Date: {statement.date}</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back</Text>
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
  detailsContainer: {
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    margin: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.textColor,
    marginBottom: 16,
  },
  iconContainer: {
    marginBottom: 16,
  },
  detailText: {
    fontSize: 18,
    color: theme.textColor,
    marginBottom: 8,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: theme.primaryColor,
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default StatementDetailsScreen;
