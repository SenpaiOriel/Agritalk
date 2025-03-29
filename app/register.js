import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ImageBackground
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Register = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = () => {
    if (!form.email || !form.password || !form.confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    Alert.alert("Success", "Registration Successful");
    router.replace("/login");
  };

  return (
    <ImageBackground source={require('../assets/bg.jpg')} style={styles.container}> 
      
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>

      {/* Form */}
      <View style={styles.formContainer}>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={24} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Fullname"
            style={styles.input}
            onChangeText={(text) => handleChange("fullname", text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            onChangeText={(text) => handleChange("email", text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Enter Password"
            style={styles.input}
            secureTextEntry={!showPassword}
            onChangeText={(text) => handleChange("password", text)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="gray" style={styles.icon} />
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            secureTextEntry={!showConfirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.link}>Already have an Account? Login</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logoContainer: {
    position: "absolute",
    top: 120,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius:5
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 53,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  button: {
  backgroundColor: "#d4af37", // Yellowish color
  paddingVertical: 12,
  paddingHorizontal: 40,  // Adjusted for a shorter width
  borderRadius: 20,
  alignItems: "center",
  alignSelf: "center", // Centers the button
  marginTop: 10,
},
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
    color: "black",
    textAlign: "center",
  },
  icon: {
    marginRight: 10,
  },
});
