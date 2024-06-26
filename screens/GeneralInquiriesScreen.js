import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

const GeneralInquiries = ({ navigation }) => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  const renderAccordionSection = (title, content, section) => (
    <View style={styles.accordionSection}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => toggleExpand(section)}
      >
        <Text style={styles.accordionTitle}>{title}</Text>
        <FontAwesome
          name={expanded === section ? "chevron-up" : "chevron-down"}
          size={20}
          color="#4CAF50"
        />
      </TouchableOpacity>
      {expanded === section && (
        <Animated.View style={styles.accordionContent}>
          <Text style={styles.sectionContent}>{content}</Text>
        </Animated.View>
      )}
    </View>
  );

  const housingImages = [
    { uri: "https://example.com/image1.jpg" },
    { uri: "https://example.com/image2.jpg" },
    { uri: "https://example.com/image3.jpg" },
  ];

  const renderImageItem = ({ item }) => (
    <Image source={{ uri: item.uri }} style={styles.flatListImage} />
  );

  return (
    <ImageBackground
      source={require("../assets/images/signupbackground.jpg")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.sectionContainer}>
            <FontAwesome name="home" size={30} color="#4CAF50" />
            <Text style={styles.sectionTitle}>BHC Products</Text>
            <Text style={styles.sectionContent}>
              BHC offers a wide range of housing products, including rental and
              sale properties. Our developments are designed to meet the needs
              of different market segments, ensuring that there is something for
              everyone.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <FontAwesome name="file-text" size={30} color="#4CAF50" />
            <Text style={styles.sectionTitle}>Application Procedures</Text>
            <Text style={styles.sectionContent}>
              To apply for a BHC property, follow these steps:
              {"\n\n"}1. Visit our website and navigate to the "Apply" section.
              {"\n"}2. Fill in the application form with the required details.
              {"\n"}3. Submit the form and wait for a confirmation email.
              {"\n"}4. If eligible, you will be contacted for further
              processing.
            </Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Apply Now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionContainer}>
            <FontAwesome name="check-circle" size={30} color="#4CAF50" />
            <Text style={styles.sectionTitle}>Eligibility Criteria</Text>
            <Text style={styles.sectionContent}>
              To be eligible for our rental and sale properties, applicants must
              meet the following criteria:
              {"\n\n"}1. Be a citizen or legal resident.
              {"\n"}2. Have a stable income source.
              {"\n"}3. Provide references and pass a background check.
              {"\n"}4. Meet the specific requirements of the property type.
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <FontAwesome name="building" size={30} color="#4CAF50" />
            <Text style={styles.sectionTitle}>Housing Developments</Text>
            <Text style={styles.sectionContent}>
              Our housing developments are strategically located to provide
              convenience and accessibility. Each development is equipped with
              modern amenities and designed to offer a comfortable living
              experience.
            </Text>
            <FlatList
              data={housingImages}
              renderItem={renderImageItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatList}
            />
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>View Developments</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionContainer}>
            <FontAwesome name="question-circle" size={30} color="#4CAF50" />
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
            {renderAccordionSection(
              "How can I apply for a BHC property?",
              "You can apply online through our website by filling out the application form in the 'Apply' section.",
              "faq1"
            )}
            {renderAccordionSection(
              "What documents do I need to provide?",
              "You will need to provide proof of income, identification, and references.",
              "faq2"
            )}
            {renderAccordionSection(
              "How long does the application process take?",
              "The process typically takes 2-4 weeks, depending on the property and the completeness of your application.",
              "faq3"
            )}
            {renderAccordionSection(
              "Can I visit the property before applying?",
              "Yes, you can schedule a visit by contacting our office or through our website.",
              "faq4"
            )}
          </View>

          <View style={styles.sectionContainer}>
            <FontAwesome name="comments" size={30} color="#4CAF50" />
            <Text style={styles.sectionTitle}>Testimonials</Text>
            <Text style={styles.sectionContent}>
              "BHC made finding our dream home so easy and stress-free!" - Jane
              Doe
            </Text>
            <Text style={styles.sectionContent}>
              "The process was smooth and the staff were incredibly helpful." -
              John Smith
            </Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("ContactUs")}
        >
          <FontAwesome name="envelope" size={24} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  sectionContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: "100%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  sectionContent: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    lineHeight: 22,
  },
  faqQuestion: {
    fontWeight: "bold",
    color: "#333",
  },
  actionButton: {
    backgroundColor: "#FF6347",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  accordionSection: {
    marginBottom: 10,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  accordionContent: {
    paddingVertical: 10,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FF6347",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  flatList: {
    marginTop: 10,
  },
  flatListImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default GeneralInquiries;
