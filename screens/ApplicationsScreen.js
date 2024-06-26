import React, { useState } from "react";
import {
  SafeAreaView,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";

const theme = {
  primaryColor: "#CD433A",
  accentColor: "#FF9800",
  backgroundColor: "#F5F5F5",
  textColor: "#333",
  subTextColor: "#888",
};

const ApplicationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { property } = route.params || {}; // Ensure property is defined

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [documents, setDocuments] = useState([]);

  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (result.type === "success") {
        setDocuments([...documents, result]);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while picking the document. Please try again."
      );
      console.error("Document Picker Error:", error);
    }
  };

  const removeDocument = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const submitApplication = () => {
    if (!fullName || !email || !phone) {
      Alert.alert("Error", "Please fill all the fields and attach documents.");
      return;
    }

    navigation.navigate("Payments", {
      property,
      fullName,
      email,
      phone,
      documents,
    });
  };

  if (!property) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>No property information available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={theme.primaryColor}
        barStyle="light-content"
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.propertyContainer}>
          <Image source={property.image} style={styles.propertyImage} />
          <Text style={styles.title}>{property.title}</Text>
          <Text style={styles.location}>Location: {property.location}</Text>
          {property.rentPrice && (
            <Text style={styles.price}>Rent: P{property.rentPrice}</Text>
          )}
          {property.salePrice && (
            <Text style={styles.price}>Sale: P{property.salePrice}</Text>
          )}
        </View>

        <View style={styles.container}>
          <Text style={styles.subTitle}>Applicant Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            style={styles.documentButton}
            onPress={pickDocument}
          >
            <Ionicons name="attach" size={20} color="#FFF" />
            <Text style={styles.documentButtonText}>Attach Documents</Text>
          </TouchableOpacity>

          {documents.map((doc, index) => (
            <View key={index} style={styles.documentContainer}>
              <Text style={styles.documentText}>{doc.name}</Text>
              <TouchableOpacity onPress={() => removeDocument(index)}>
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={submitApplication}
          >
            <Text style={styles.submitButtonText}>Proceed to Payment</Text>
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
  propertyContainer: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    margin: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  propertyImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.textColor,
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: theme.subTextColor,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: theme.primaryColor,
    marginBottom: 16,
  },
  container: {
    padding: 16,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.textColor,
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    borderColor: "#DDD",
    borderWidth: 1,
    marginBottom: 16,
  },
  documentButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.primaryColor,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  documentButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 8,
  },
  documentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    borderColor: "#DDD",
    borderWidth: 1,
    marginBottom: 16,
  },
  documentText: {
    color: theme.textColor,
  },
  submitButton: {
    backgroundColor: theme.accentColor,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ApplicationScreen;
