import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import PaginationDots from "../components/PaginationDots";

const { width: viewportWidth } = Dimensions.get("window");

const carouselContent = [
  {
    id: "1",
    title: "Community Events",
    description: "Join upcoming community events and activities.",
    image: require("../assets/images/community_events.jpg"),
    screen: null, // Set screen to null to disable navigation
  },
  {
    id: "2",
    title: "New Property at Sarona City",
    description: "Explore the new apartments available at Tsholofelo East.",
    image: require("../assets/images/bhcapartments.jpg"),
    screen: "Properties",
  },
  {
    id: "4",
    title: "Check Fault Status",
    description: "View the status of your reported faults.",
    image: require("../assets/images/fault.png"),
    screen: "FaultStatus",
  },
  {
    id: "3",
    title: "New Policy Updates",
    description: "Read about the latest policy updates from BHC.",
    image: require("../assets/images/policy.png"),
    screen: null, // Set screen to null to disable navigation
  },
];

const recentlyViewed = [
  {
    id: "1",
    title: "Viewed Property 1",
    description: "Description of viewed property 1",
    image: require("../assets/images/property_2.png"),
    location: "Gaborone",
    currentRent: "5000",
    salePrice: null,
  },
  {
    id: "2",
    title: "Viewed Property 2",
    description: "Description of viewed property 2",
    image: require("../assets/images/property_3.jpg"),
    location: "Francistown",
    currentRent: null,
    salePrice: "1000000",
  },
];

function HomeScreen() {
  const navigation = useNavigation();
  const scrollXFeatured = useRef(new Animated.Value(0)).current;
  const scrollXViewed = useRef(new Animated.Value(0)).current;
  const [currentIndexFeatured, setCurrentIndexFeatured] = useState(0);
  const [currentIndexViewed, setCurrentIndexViewed] = useState(0);

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.carouselImage} />
      <Text style={styles.carouselTitle}>{item.title}</Text>
      <Text style={styles.carouselDescription}>{item.description}</Text>
      {item.screen ? (
        <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
          <Text style={styles.readMore}>Read more</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.disabledReadMore}>Read more</Text>
      )}
    </View>
  );

  const renderRecentlyViewedItem = ({ item }) => (
    <TouchableOpacity
      style={styles.carouselItem}
      onPress={() => navigation.navigate("PropertyDetails", { property: item })}
    >
      <Image source={item.image} style={styles.carouselImage} />
      <Text style={styles.carouselTitle}>{item.title}</Text>
      <Text style={styles.carouselDescription}>{item.description}</Text>
      <Text style={styles.propertyDetails}>Location: {item.location}</Text>
      {item.currentRent && (
        <Text style={styles.propertyDetails}>
          Rent Price: P{item.currentRent}
        </Text>
      )}
      {item.salePrice && (
        <Text style={styles.propertyDetails}>
          Sale Price: P{item.salePrice}
        </Text>
      )}
    </TouchableOpacity>
  );

  const handleScrollFeatured = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (viewportWidth - 40));
    setCurrentIndexFeatured(index);
  };

  const handleScrollViewed = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (viewportWidth - 40));
    setCurrentIndexViewed(index);
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={require("../assets/images/bhc_logo.png")}
          />
          <View style={styles.welcomeContainer}>
            <Text style={styles.greeting}>Good Morning!</Text>
            <Text style={styles.username}>Olaotse</Text>
          </View>
          <TouchableOpacity
            style={styles.hamburgerIcon}
            onPress={() => navigation.openDrawer()}
          >
            <FontAwesome name="bars" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.curvedBackgroundWrapper}>
          <View style={styles.curvedBackground}></View>
        </View>

        <View style={styles.curvedContainer}>
          <Text style={styles.sectionTitle}>Featured Content</Text>
          <FlatList
            data={carouselContent}
            renderItem={renderCarouselItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            decelerationRate="fast"
            snapToInterval={viewportWidth - 20}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollXFeatured } } }],
              { useNativeDriver: false, listener: handleScrollFeatured }
            )}
            scrollEventThrottle={16}
          />
          <PaginationDots
            length={carouselContent.length}
            activeIndex={currentIndexFeatured}
          />
        </View>

        <View style={styles.carouselContainer}>
          <Text style={styles.sectionTitle}>Recently Viewed</Text>
          <FlatList
            data={recentlyViewed}
            renderItem={renderRecentlyViewedItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            decelerationRate="fast"
            snapToInterval={viewportWidth - 20}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollXViewed } } }],
              { useNativeDriver: false, listener: handleScrollViewed }
            )}
            scrollEventThrottle={16}
          />
          <PaginationDots
            length={recentlyViewed.length}
            activeIndex={currentIndexViewed}
          />
        </View>

        <LinearGradient
          colors={["#4CAF50", "#FF6347", "#FFA500", "#FFD700"]}
          style={styles.gradientBackground}
        >
          <Text style={styles.sectionTitle}>Your Dashboard</Text>
          <View style={styles.dashboard}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Maintenance")}
            >
              <Image
                style={styles.cardIcon}
                source={require("../assets/images/fault.png")}
              />
              <Text style={styles.cardTitle}>Report Faults</Text>
              <Text style={styles.cardDescription}>
                Report and follow up on maintenance issues
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("GeneralInquiries")}
            >
              <Image
                style={styles.cardIcon}
                source={require("../assets/images/inquiries.png")}
              />
              <Text style={styles.cardTitle}>General Inquiries</Text>
              <Text style={styles.cardDescription}>
                Browse available properties and FAQs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("PropertyList")}
            >
              <Image
                style={styles.cardIcon}
                source={require("../assets/images/properties.png")}
              />
              <Text style={styles.cardTitle}>Properties</Text>
              <Text style={styles.cardDescription}>
                View and apply for properties
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Applications")}
            >
              <Image
                style={styles.cardIcon}
                source={require("../assets/images/applications.png")}
              />
              <Text style={styles.cardTitle}>Applications</Text>
              <Text style={styles.cardDescription}>
                Apply for houses on sale or rental
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("ViewStatements")}
            >
              <Image
                style={styles.cardIcon}
                source={require("../assets/images/statements.png")}
              />
              <Text style={styles.cardTitle}>View Statements</Text>
              <Text style={styles.cardDescription}>
                View your rental and TPS statements
              </Text>
            </TouchableOpacity>
            <View style={[styles.card, styles.disabledCard]}>
              <Image
                style={styles.cardIcon}
                source={require("../assets/images/payments.png")}
              />
              <Text style={styles.cardTitle}>Make Payments</Text>
              <Text style={styles.cardDescription}>
                Make payments for your rental or purchased properties
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Text style={styles.footerText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Help")}>
            <Text style={styles.footerText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Contact")}>
            <Text style={styles.footerText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#FFA500", // orange
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginRight: 15,
  },
  welcomeContainer: {
    flex: 1,
    marginLeft: 10,
  },
  greeting: {
    fontSize: 20,
    color: "#fff",
  },
  username: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  hamburgerIcon: {
    // Additional styling for the hamburger icon
  },
  curvedBackgroundWrapper: {
    position: "relative",
  },
  curvedBackground: {
    backgroundColor: "#FFA500", // orange
    height: 80,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  curvedContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    marginTop: 50, // Increase marginTop to start below the curve
    paddingBottom: 20, // Add padding at the bottom
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 10,
    color: "black", // green
  },
  carouselContainer: {
    marginBottom: 20,
    backgroundColor: "#fff", // Set the background color to white
  },
  carouselItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 15, // Added marginBottom to give space at the bottom
    width: viewportWidth - 40, // Adjust width to fit within screen
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  carouselImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  carouselDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },
  propertyDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  readMore: {
    marginTop: 10,
    color: "#FF6347", // tomato
    fontWeight: "bold",
  },
  disabledReadMore: {
    marginTop: 10,
    color: "#888", // grey
    fontWeight: "bold",
  },
  gradientBackground: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  dashboard: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  card: {
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#4CAF50", // green
  },
  cardDescription: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
  disabledCard: {
    opacity: 0.5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#FF6347", // tomato
  },
  footerText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default HomeScreen;
