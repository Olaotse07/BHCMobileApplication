import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import SocialMedia from "../components/SocialMedia";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        alert("Login successful");
        navigation.navigate("Main");
      }
    } catch (error) {
      setErrorMessage("Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/appbackground.jpg")}
      style={styles.background}
    >
      <View style={styles.centerContainer}>
        <View style={styles.logoandtextContainer}>
          <View style={styles.bhclogoContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/images/bhc_logo.png")}
            />
          </View>

          <Text style={styles.welcomeText}>Welcome to BHC</Text>
        </View>
        <View style={styles.inputFieldContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Password"
              placeholderTextColor="#666"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
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
        {errorMessage !== "" && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.customButton}
            onPress={handleLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <SocialMedia />

        <View style={styles.CreateAccountPrompt}>
          <Text style={styles.promptText}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.signupText}>Create Account</Text>
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
  bhclogoContainer: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    fontStyle: "italic",
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginVertical: 10,
  },
  loginButtonContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    alignItems: "center",
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
  forgotPassword: {
    color: "#007BFF",
    fontSize: 15,
    textDecorationLine: "underline",
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

export default Login;
