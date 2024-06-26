import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import DisabledScreen from "../screens/DisabledScreen"; // Assuming this is a placeholder screen

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "user";
          } else if (route.name === "Settings") {
            iconName = "cog";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#CD433A",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Profile" component={DisabledScreen} />
      <Tab.Screen name="Settings" component={DisabledScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
