import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const theme = {
  primaryColor: "#CD433A",
  accentColor: "#FF9800",
  backgroundColor: "#F5F5F5",
  textColor: "#333",
  subTextColor: "#888",
  highlightColor: "#FFFACD", // Light yellow
};

const mockStatements = [
  {
    id: "1",
    type: "Rental",
    amount: "P5000",
    balance: "P2000",
    date: "2023-01-01",
  },
  {
    id: "2",
    type: "TPS",
    amount: "P10000",
    balance: "P5000",
    date: "2023-02-01",
  },
  {
    id: "3",
    type: "Rental",
    amount: "P4000",
    balance: "P1000",
    date: "2023-03-01",
  },
  // Add more mock data as needed
];

const ViewStatementsScreen = () => {
  const navigation = useNavigation();
  const [balanceOnly, setBalanceOnly] = useState(false);

  const toggleBalanceOnly = () => setBalanceOnly(!balanceOnly);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate("StatementDetails", { statement: item })
      }
    >
      <View style={styles.iconContainer}>
        <FontAwesome
          name={item.type === "Rental" ? "home" : "file-text"}
          size={24}
          color={theme.primaryColor}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{item.type} Statement</Text>
        {balanceOnly ? (
          <Text style={styles.itemText}>Balance: {item.balance}</Text>
        ) : (
          <View>
            <Text style={styles.itemText}>Amount: {item.amount}</Text>
            <Text style={styles.itemText}>Balance: {item.balance}</Text>
            <Text style={styles.itemText}>Date: {item.date}</Text>
          </View>
        )}
      </View>
      <FontAwesome name="chevron-right" size={24} color={theme.subTextColor} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleBalanceOnly}
        >
          <Text style={styles.toggleButtonText}>
            {balanceOnly ? "Show Full Statements" : "Show Balance Only"}
          </Text>
        </TouchableOpacity>
        <FlatList
          data={mockStatements}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  toggleButton: {
    backgroundColor: theme.primaryColor,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 16,
  },
  toggleButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.textColor,
    marginBottom: 4,
  },
  itemText: {
    fontSize: 16,
    color: theme.subTextColor,
  },
});

export default ViewStatementsScreen;
