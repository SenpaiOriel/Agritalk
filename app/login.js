import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLanguage } from './context/LanguageContext';
import { translations } from './translations/translations';

const Login = () => {
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const [form, setForm] = useState({
    identifier: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setErrorMessage('');
  };

  const validateIdentifier = (identifier) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(identifier);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = () => {
    if (!form.identifier || !form.password) {
      setErrorMessage(t.fillAllFields);
      return;
    }

    if (!validateIdentifier(form.identifier)) {
      setErrorMessage(t.invalidEmail);
      return;
    }

    if (!validatePassword(form.password)) {
      setErrorMessage(t.invalidPassword);
      return;
    }

    setErrorMessage('');
    setIsLoading(true);
    
    // Simulate server request
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <ImageBackground source={require('../assets/bg.jpg')} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        {errorMessage ? (
          <View style={styles.alertContainer}>
            <Ionicons name="alert-circle" size={20} color="#fff" style={styles.alertIcon} />
            <Text style={styles.alertText}>{errorMessage}</Text>
          </View>
        ) : null}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="gray" style={styles.icon} />
          <TextInput
            placeholder={t.email}
            style={styles.input}
            autoCapitalize="none"
            onChangeText={text => handleChange('identifier', text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="gray" style={styles.icon} />
          <TextInput
            placeholder={t.password}
            style={styles.input}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            onChangeText={text => handleChange('password', text)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => router.push('/forgot-password')}>
          <Text style={styles.forgotPassword}>{t.forgotPassword}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>{t.login}</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.registerText}>{t.noAccount} <Text style={styles.registerLink} onPress={() => router.push('/register')}>{t.register}</Text></Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 130,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
 formContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 25,
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
    paddingHorizontal: 10
  },
  icon: {
    marginRight: 10,
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
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14,
  },
  registerLink: {
    color: 'black',
  },
  forgotPassword: {
    marginBottom: 10,
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
    alignContent:"right"
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
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
  buttonDisabled: {
    opacity: 0.7,
  },
});

export default Login;
