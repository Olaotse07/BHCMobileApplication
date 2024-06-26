import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import Dropdown from "../components/Dropdown"; // Import the new Dropdown component

const dummyFaults = [
  {
    category: "Unplanned",
    severity: "Emergency",
    description: "Water leakage in the kitchen",
    referenceNumber: "a1b2c3d4e",
    status: "Reported",
  },
  {
    category: "Vandalism",
    severity: "Urgent",
    description: "Graffiti on the wall near the entrance",
    referenceNumber: "f5g6h7i8j",
    status: "In Progress",
  },
  {
    category: "Change of tenancy",
    severity: "Normal",
    description: "Broken window in the living room",
    referenceNumber: "k9l0m1n2o",
    status: "Completed",
  },
];

const MaintenanceScreen = () => {
  const [faults, setFaults] = useState(dummyFaults);
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNewReport = (newReport) => {
    setFaults([newReport, ...faults]);
  };

  const handleSubmit = () => {
    if (category && severity && description) {
      setIsLoading(true);
      const newReport = {
        category,
        severity,
        description,
        referenceNumber: Math.random().toString(36).substr(2, 9),
        status: "Reported",
      };

      setTimeout(() => {
        handleNewReport(newReport);
        setIsLoading(false);
        alert(
          `Fault reported with reference number: ${newReport.referenceNumber}`
        );
        setCategory("");
        setSeverity("");
        setDescription("");
      }, 2000);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const renderFaultItem = ({ item }) => (
    <View style={styles.faultItem} key={item.referenceNumber}>
      <View style={styles.faultItemText}>
        <Text style={styles.faultTitle}>{item.category}</Text>
        <Text style={styles.faultDescription}>{item.description}</Text>
        <Text style={styles.faultReference}>
          Reference: {item.referenceNumber}
        </Text>
        <Text style={styles.faultStatus}>Status: {item.status}</Text>
      </View>
      <View style={styles.faultItemIcon}>
        {item.status === "Reported" && (
          <FontAwesome name="check" size={24} color="green" />
        )}
        {item.status === "In Progress" && (
          <FontAwesome name="spinner" size={24} color="orange" />
        )}
        {item.status === "Completed" && (
          <FontAwesome name="check-circle" size={24} color="blue" />
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.logoandTitle}>
            <Image
              style={styles.faultLogo}
              source={require("../assets/images/fault.png")}
            />
            <Text style={styles.screenTitle}>
              Report and Follow Up on Maintenance Faults
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Dropdown
              label="Category"
              options={[
                "Planned",
                "Unplanned",
                "Change of tenancy",
                "Vandalism",
                "Multiple defects",
              ]}
              selectedValue={category}
              onValueChange={setCategory}
            />
            <Dropdown
              label="Severity"
              options={["Emergency", "Urgent", "Normal"]}
              selectedValue={severity}
              onValueChange={setSeverity}
            />
            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe the fault"
              multiline
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Report Fault</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.recentReportsContainer}>
          <Text style={styles.recentReportsTitle}>Recent Reports</Text>
          {faults.map((item) => (
            <View key={item.referenceNumber} style={styles.faultItem}>
              {renderFaultItem({ item })}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // backgroundColor: "#FFA500", // light yellow background
  },
  scrollContainer: {
    alignItems: "center", // Center the content
  },
  headerContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    width: "95%", // Adjust the container width
  },
  faultLogo: {
    height: 45,
    width: 45,
    resizeMode: "contain",
    marginRight: 7,
  },
  logoandTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  screenTitle: {
    fontSize: 22,
    marginTop: 3,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4CAF50", // green
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#4CAF50", // green
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#FF6347", // tomato
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  recentReportsContainer: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 20,
    marginTop: 20,
    width: "95%", // Adjust the container width
  },
  recentReportsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4CAF50", // green
  },
  recentReportsList: {
    width: "100%", // Ensure the list container takes full width
  },
  faultItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: "100%", // Make the fault items take full width
  },
  faultItemText: {
    flex: 1,
  },
  faultItemIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  faultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6347", // tomato
  },
  faultDescription: {
    fontSize: 14,
    marginVertical: 5,
    color: "#666",
  },
  faultReference: {
    fontSize: 12,
    color: "#888",
  },
  faultStatus: {
    fontSize: 12,
    color: "#888",
  },
});

export default MaintenanceScreen;
