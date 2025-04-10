import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ImageBackground,
  Modal
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from './context/LanguageContext';
import { translations } from './translations/translations';

const Register = () => {
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setError(""); // Clear error when user types
  };

  const handleRegister = () => {
    if (!form.email || !form.password || !form.confirmPassword) {
      setError(t.allFieldsRequired);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError(t.passwordsDontMatch);
      return;
    }
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    router.replace("/login");
  };

  return (
    <ImageBackground source={require('../assets/bg.jpg')} style={styles.container}> 
      
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>

      {/* Success Modal */}
      <Modal
        visible={showSuccess}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successContainer}>
            <Ionicons name="checkmark-circle" size={60} color="#d4af37" style={styles.successIcon} />
            <Text style={styles.successTitle}>{t.registrationSuccess}</Text>
            <TouchableOpacity 
              style={styles.successButton}
              onPress={handleSuccessClose}
            >
              <Text style={styles.successButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Form */}
      <View style={styles.formContainer}>
        {error ? (
          <View style={styles.alertContainer}>
            <Ionicons name="alert-circle" size={20} color="#fff" style={styles.alertIcon} />
            <Text style={styles.alertText}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={24} color="gray" style={styles.icon} />
          <TextInput
            placeholder={t.fullname}
            style={styles.input}
            onChangeText={(text) => handleChange("fullname", text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="gray" style={styles.icon} />
          <TextInput
            placeholder={t.email}
            style={styles.input}
            keyboardType="email-address"
            onChangeText={(text) => handleChange("email", text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="gray" style={styles.icon} />
          <TextInput
            placeholder={t.password}
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
            placeholder={t.confirmPassword}
            style={styles.input}
            secureTextEntry={!showConfirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>{t.register}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.link}>{t.noAccount} {t.login}</Text>
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
  alertContainer: {
    backgroundColor: '#ff4444',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  alertIcon: {
    marginRight: 8,
  },
  alertText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  successButton: {
    backgroundColor: '#d4af37',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  successButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
