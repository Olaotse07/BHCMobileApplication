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

const theme = {
  primaryColor: "#CD433A",
  accentColor: "#FF9800",
  backgroundColor: "#F5F5F5",
  textColor: "#333",
  subTextColor: "#888",
  highlightColor: "#FFFACD", // Light yellow
};

const PropertyDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { property } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={property.image} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{property.title}</Text>
          {property.currentRent && (
            <Text style={styles.price}>
              Rent Price: P{property.currentRent}
            </Text>
          )}
          {property.salePrice && (
            <Text style={styles.price}>Sale Price: P{property.salePrice}</Text>
          )}
          <Text style={styles.location}>Location: {property.location}</Text>
          <Text style={styles.description}>
            This is a detailed description of the property. It includes all the
            relevant information that the user might need to make a decision.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => navigation.navigate("Applications", { property })}
        >
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
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
  image: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.textColor,
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: theme.primaryColor,
    marginVertical: 8,
  },
  location: {
    fontSize: 16,
    color: theme.subTextColor,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: theme.textColor,
    lineHeight: 22,
  },
  applyButton: {
    backgroundColor: theme.primaryColor,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  applyButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PropertyDetailsScreen;
