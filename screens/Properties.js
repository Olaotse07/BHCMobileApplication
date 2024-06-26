import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

const theme = {
  primaryColor: "#CD433A",
  accentColor: "#FF9800",
  backgroundColor: "#F5F5F5",
  textColor: "#333",
  subTextColor: "#888",
  highlightColor: "#FFFACD", // Light yellow
};

const PropertiesPage = () => {
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("All");
  const [items, setItems] = useState([
    { label: "All", value: "All" },
    { label: "House", value: "House" },
    { label: "Apartment", value: "Apartment" },
    { label: "Rent", value: "Rent" },
    { label: "Sale", value: "Sale" },
  ]);

  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;

  const trendingHouses = [
    {
      id: "1",
      title: "3 beds Mmokolodi",
      rentPrice: "7200",
      salePrice: null,
      type: "House",
      category: "Rent",
      location: "Mmokolodi",
      image: require("../assets/images/property_3.jpg"),
    },
    {
      id: "2",
      title: "2 beds Jwaneng",
      rentPrice: "3000",
      salePrice: null,
      type: "House",
      category: "Rent",
      location: "Jwaneng",
      image: require("../assets/images/property_3.jpg"),
    },
    {
      id: "3",
      title: "3 beds G-North",
      rentPrice: null,
      salePrice: "500000",
      type: "House",
      category: "Sale",
      location: "Gaborone North",
      image: require("../assets/images/property_3.jpg"),
    },
  ];

  const properties = [
    {
      id: "1",
      title: "3 Bed Block 8",
      currentRent: "7000",
      salePrice: null,
      location: "Gaborone",
      type: "House",
      category: "Rent",
      image: require("../assets/images/property_3.jpg"),
    },
    {
      id: "2",
      title: "2 Bed Apartment",
      currentRent: "168 /night",
      salePrice: null,
      location: "Kauai, Hawaii",
      type: "Apartment",
      category: "Rent",
      image: require("../assets/images/property_3.jpg"),
    },
    {
      id: "3",
      title: "1 Bed Apartment",
      currentRent: "421 /night",
      salePrice: null,
      location: "Kauai, Hawaii",
      type: "Apartment",
      category: "Rent",
      image: require("../assets/images/property_3.jpg"),
    },
    {
      id: "4",
      title: "4 Bed House",
      currentRent: null,
      salePrice: "850000",
      location: "Block 10, Gaborone",
      type: "House",
      category: "Sale",
      image: require("../assets/images/property_3.jpg"),
    },
  ];

  const renderProperty = ({ item }) => (
    <TouchableOpacity
      style={[styles.propertyContainer, { width: screenWidth * 0.9 }]}
      onPress={() => navigation.navigate("PropertyDetails", { property: item })}
    >
      <Image source={item.image} style={styles.propertyImage} />
      <View style={styles.propertyTextContainer}>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <View style={styles.propertyDetails}>
          {item.currentRent && (
            <Text style={styles.propertyRent}>Rent: P{item.currentRent}</Text>
          )}
          {item.salePrice && (
            <Text style={styles.propertySale}>Sale: P{item.salePrice}</Text>
          )}
          <Text style={styles.propertyLocation}>{item.location}</Text>
          <Text style={styles.propertyType}>{item.type}</Text>
          <Text style={styles.propertyCategory}>{item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredProperties = properties.filter(
    (property) =>
      (filter === "All" ||
        property.type === filter ||
        property.category === filter) &&
      property.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={theme.primaryColor}
        barStyle="light-content"
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color={theme.subTextColor} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search listings..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainerStyle}
            placeholder="Filter"
            onChangeValue={(val) => setFilter(val)}
          />
        </View>
        <Text style={styles.sectionTitle}>Trending Houses</Text>
        <FlatList
          data={trendingHouses}
          renderItem={renderProperty}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={styles.trendingList}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={styles.sectionTitle}>Available Properties</Text>
        <FlatList
          data={filteredProperties}
          renderItem={renderProperty}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.propertiesList}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false} // Disable FlatList's internal scrolling to use ScrollView's scrolling
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: theme.highlightColor,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    margin: 16,
    borderRadius: 12,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingLeft: 8,
  },
  dropdownContainer: {
    width: 120,
    marginLeft: 10,
  },
  dropdown: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  dropdownContainerStyle: {
    borderWidth: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 16,
    marginBottom: 5,
    paddingTop: 16,
    color: "#228B22",
  },
  trendingList: {
    paddingLeft: 16,
  },
  propertyContainer: {
    borderRadius: 12,
    backgroundColor: "#FFF",
    padding: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    marginBottom: 16,
  },
  propertyImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
  },
  propertyTextContainer: {
    padding: 8,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#FF6347",
  },
  propertyDetails: {
    flexDirection: "column",
  },
  propertyRent: {
    fontSize: 14,
    color: theme.subTextColor,
  },
  propertySale: {
    fontSize: 14,
    color: theme.accentColor,
  },
  propertyLocation: {
    fontSize: 14,
    color: theme.subTextColor,
  },
  propertyType: {
    fontSize: 14,
    color: theme.subTextColor,
  },
  propertyCategory: {
    fontSize: 14,
    color: theme.subTextColor,
  },
  propertiesList: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
});

export default PropertiesPage;
