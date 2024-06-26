import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";

function SocialMedia() {
  return (
    <View style={StyleSheet.rootContainer}>
      <Text style={styles.prompttext}>Social Media Authentication</Text>
      <View style={styles.icons}>
        <TouchableOpacity>
          <Image
            style={styles.socialMedialogo}
            source={require("../assets/images/googlesign.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.socialMedialogo}
            source={require("../assets/images/facebooksign.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.socialMedialogo}
            source={require("../assets/images/applesign.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  prompttext: {
    fontSize: 15,
    fontWeight: "800",
    color: "#666",
    marginVertical: 6,
  },
  icons: {
    flexDirection: "row",
  },
  socialMedialogo: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginHorizontal: 15,
  },
});

export default SocialMedia;
