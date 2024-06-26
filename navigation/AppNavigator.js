// navigation/AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import PropertyDetailsScreen from "../screens/PropertyDetailsScreen";
import FaultStatusScreen from "../screens/FaultStatusScreen";
import PolicyUpdatesScreen from "../screens/PolicyUpdatesScreen";
import CommunityEventsScreen from "../screens/CommunityEventsScreen";
import ReportFaultsScreen from "../screens/ReportFaultsScreen";
import GeneralInquiriesScreen from "../screens/GeneralInquiriesScreen";
import ApplicationsScreen from "../screens/ApplicationsScreen";
import ViewStatementsScreen from "../screens/ViewStatementsScreen";
import MakePaymentsScreen from "../screens/MakePaymentsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HelpScreen from "../screens/HelpScreen";
import ContactScreen from "../screens/ContactScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PropertyDetails"
          component={PropertyDetailsScreen}
        />
        <Stack.Screen name="FaultStatus" component={FaultStatusScreen} />
        <Stack.Screen name="PolicyUpdates" component={PolicyUpdatesScreen} />
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
        <Stack.Screen name="MakePayments" component={MakePaymentsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
