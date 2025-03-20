import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    identifier: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setErrorMessage(''); // Clear error when user starts typing
  };

  const validateIdentifier = (identifier) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    
    return emailRegex.test(identifier) || usernameRegex.test(identifier);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = () => {
    if (!form.identifier || !form.password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (!validateIdentifier(form.identifier)) {
      setErrorMessage('Please enter a valid email address or username');
      return;
    }

    if (!validatePassword(form.password)) {
      setErrorMessage(
        'Your password input is incorrect..'
      );
      return;
    }

    // If login is successful (you can adjust this to check credentials)
    setErrorMessage('');
    router.push('/dashboard');
  };

  return (
    <LinearGradient
      colors={['#94C999', '#7FB084', '#629467', '#437347']}
      style={styles.container}
    >
      <View style={styles.logo}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logoImage} 
        />
      </View>

      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={24} color="gray" style={styles.icon} />
        <TextInput
          placeholder="Email or Username"
          style={styles.input}
          autoCapitalize="none"
          onChangeText={text => handleChange('identifier', text)}
        />
      </View>
      
      <View style={styles.passwordContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="gray" style={styles.icon} />
        <TextInput
          placeholder="Password"
          style={styles.passwordInput}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          onChangeText={text => handleChange('password', text)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push('/forgot-password')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'OpenSans',
    fontSize: 16
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  passwordInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'OpenSans',
    fontSize: 16
  },
  eyeIcon: {
    paddingHorizontal: 10
  },
  icon: {
    marginRight: 10
  },
  button: {
    backgroundColor: '#809a03',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'OpenSans-Bold'
  },
  link: {
    marginTop: 10,
    color: '#000',
    fontFamily: 'OpenSans',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  forgotPassword: {
    marginTop: 5,
    marginBottom: 10,
    color: '#000',
    textDecorationLine: 'underline',
    textAlign: 'right',
    fontFamily: 'OpenSans',
    fontSize: 14
  },
  logo: {
    width: 115,
    height: 100,
    marginBottom: 10,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  errorMessage: {
    color: '#ff4d4d',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'OpenSans'
  }
});

export default Login;
