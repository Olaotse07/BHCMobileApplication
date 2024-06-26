import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PropertyDetailsScreen from "./screens/PropertyDetailsScreen";
import FaultStatusScreen from "./screens/MaintenanceScreen";
import PolicyUpdatesScreen from "./screens/PolicyUpdatesScreen";
import CommunityEventsScreen from "./screens/CommunityEventsScreen";
import ReportFaultsScreen from "./screens/ReportFaultsScreen";
import GeneralInquiriesScreen from "./screens/GeneralInquiriesScreen";
import ApplicationsScreen from "./screens/ApplicationsScreen";
import ViewStatementsScreen from "./screens/ViewStatementsScreen";
import StatementDetailsScreen from "./screens/StatementDetailsScreen";
import MakePaymentsScreen from "./screens/MakePaymentsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import HelpScreen from "./screens/HelpScreen";
import ContactScreen from "./screens/ContactScreen";
import MaintenanceScreen from "./screens/MaintenanceScreen";
import Login from "./screens/Login";
import HomeScreen from "./screens/HomeScreen";
import ApplicationsStatusScreen from "./screens/ApplicationStatusScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import PropertiesPage from "./screens/Properties";
import PaymentScreen from "./screens/Payment";
import BottomTabNavigator from "./navigation/BottomNavigator";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PropertyDetails"
          component={PropertyDetailsScreen}
        />
        <Stack.Screen name="Properties" component={PropertiesPage} />
        <Stack.Screen
          name="ApplicationStatus"
          component={ApplicationsStatusScreen}
        />
        <Stack.Screen name="Maintenance" component={MaintenanceScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        <Stack.Screen name="PolicyUpdates" component={PolicyUpdatesScreen} />
        <Stack.Screen name="Payments" component={PaymentScreen} />
        <Stack.Screen
          name="CommunityEvents"
          component={CommunityEventsScreen}
        />
        <Stack.Screen name="ReportFaults" component={ReportFaultsScreen} />
        <Stack.Screen
          name="GeneralInquiries"
          component={GeneralInquiriesScreen}
        />
        <Stack.Screen name="Applications" component={ApplicationsScreen} />
        <Stack.Screen name="ViewStatements" component={ViewStatementsScreen} />
        <Stack.Screen
          name="StatementDetails"
          component={StatementDetailsScreen}
        />
        <Stack.Screen name="MakePayments" component={MakePaymentsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
