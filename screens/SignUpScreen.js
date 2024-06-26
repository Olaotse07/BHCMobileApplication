import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import SocialMedia from "../components/SocialMedia";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useState } from "react";

function SignUpScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <ImageBackground
      source={require("../assets/images/signupbackground.jpg")}
      style={styles.background}
    >
      <View style={styles.centerContainer}>
        <View style={styles.logoandtextContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/images/bhc_logo.png")}
          />
          <Text style={styles.welcomeText}>Get Started Below</Text>
        </View>
        <View style={styles.inputFieldContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            keyboardType="email-address"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Password"
              placeholderTextColor="#666"
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Icon
                style={styles.eyes}
                name={passwordVisible ? "eye-off" : "eye"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Confirm Password"
              placeholderTextColor="#666"
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Icon
                style={styles.eyes}
                name={passwordVisible ? "eye-off" : "eye"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signUpButtonContainer}>
          <TouchableOpacity style={styles.customButton}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>
        <SocialMedia />

        <View style={styles.CreateAccountPrompt}>
          <Text style={styles.promptText}>Already Have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    width: "90%",
    padding: 2,
    marginHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    borderRadius: 10,
    alignItems: "center",
  },
  logoandtextContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  logo: {
    marginVertical: 10,
    width: 90,
    height: 90,
    borderRadius: 50,
    marginRight: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  inputFieldContainer: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    width: "90%",
    padding: 10,
    marginVertical: 7,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  inputPassword: {
    flex: 1,
    padding: 10,
    marginVertical: 7,
  },
  passwordContainer: {
    width: "90%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 1,
    marginVertical: 7,
  },
  eyes: {
    marginRight: 5,
  },

  signUpButtonContainer: {
    width: "90%",
    paddingHorizontal: 2,
    alignItems: "center",
  },

  customButton: {
    backgroundColor: "#FF6347", // light brick red
    padding: 15,
    width: "53%",
    borderRadius: 50,
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
  loginButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1.5,
    backgroundColor: "#31363F",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#666",
  },
  CreateAccountPrompt: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 3,
  },
  promptText: {
    color: "#686D76",
    marginRight: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    color: "#FF6347",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default SignUpScreen;
