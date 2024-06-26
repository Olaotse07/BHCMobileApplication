import React, { useState } from "react";
import {
  SafeAreaView,
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
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const theme = {
  primaryColor: "#CD433A",
  accentColor: "#FF9800",
  backgroundColor: "#F5F5F5",
  textColor: "#333",
  subTextColor: "#888",
};

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { property, fullName, email, phone, documents } = route.params;

  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");

  const submitPayment = () => {
    if (!paymentAmount || !paymentMethod) {
      Alert.alert(
        "Error",
        "Please select a payment method and enter the payment amount."
      );
      return;
    }

    if (paymentMethod === "PayPal" && !paypalEmail) {
      Alert.alert("Error", "Please enter your PayPal email.");
      return;
    }

    if (
      (paymentMethod === "Visa" || paymentMethod === "MasterCard") &&
      (!cardNumber || !expiryDate || !cvv)
    ) {
      Alert.alert("Error", "Please fill all the card details.");
      return;
    }

    // Process payment (this can be replaced with actual payment logic)
    Alert.alert("Success", "Your payment has been processed.");

    // Navigate to the Confirmation Screen
    navigation.navigate("Confirmation", {
      property,
      paymentAmount,
      paymentMethod,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={theme.primaryColor}
        barStyle="light-content"
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Payment</Text>
          <Text style={styles.paymentAmount}>
            Amount to Pay: P{property.rentPrice || property.salePrice}
          </Text>

          <Text style={styles.label}>Select Payment Method</Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === "Visa" && styles.selectedPaymentMethod,
              ]}
              onPress={() => setPaymentMethod("Visa")}
            >
              <FontAwesome name="cc-visa" size={32} color="#005EA6" />
              <Text style={styles.paymentMethodText}>Visa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === "MasterCard" && styles.selectedPaymentMethod,
              ]}
              onPress={() => setPaymentMethod("MasterCard")}
            >
              <FontAwesome name="cc-mastercard" size={32} color="#EB001B" />
              <Text style={styles.paymentMethodText}>MasterCard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === "PayPal" && styles.selectedPaymentMethod,
              ]}
              onPress={() => setPaymentMethod("PayPal")}
            >
              <FontAwesome name="cc-paypal" size={32} color="#003087" />
              <Text style={styles.paymentMethodText}>PayPal</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Payment Amount"
            value={paymentAmount}
            onChangeText={setPaymentAmount}
            keyboardType="numeric"
          />

          {paymentMethod === "Visa" || paymentMethod === "MasterCard" ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Card Number"
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Expiry Date (MM/YY)"
                value={expiryDate}
                onChangeText={setExpiryDate}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="CVV"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                secureTextEntry
              />
            </>
          ) : paymentMethod === "PayPal" ? (
            <TextInput
              style={styles.input}
              placeholder="PayPal Email"
              value={paypalEmail}
              onChangeText={setPaypalEmail}
              keyboardType="email-address"
            />
          ) : null}

          <TouchableOpacity style={styles.submitButton} onPress={submitPayment}>
            <Text style={styles.submitButtonText}>Submit Payment</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.textColor,
    marginBottom: 16,
  },
  paymentAmount: {
    fontSize: 18,
    color: theme.primaryColor,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.textColor,
    marginBottom: 8,
  },
  paymentMethods: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  paymentMethod: {
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    width: "30%",
  },
  selectedPaymentMethod: {
    borderColor: theme.primaryColor,
  },
  paymentMethodText: {
    marginTop: 5,
    color: theme.textColor,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    borderColor: "#DDD",
    borderWidth: 1,
    marginBottom: 16,
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
});

export default PaymentScreen;
