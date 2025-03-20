import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    Alert.alert('Success', 'A password reset link has been sent to your email.Please check the message to email you provide');
    router.push('/login');
  };

  return (
    <LinearGradient 
    colors={['#94C999', '#7FB084', '#629467', '#437347']}
    style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>
      
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={24} color="gray" style={styles.icon} />
        <TextInput 
          placeholder="Email" 
          style={styles.input} 
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
        />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
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
    backgroundColor: '#2E593F'
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'OpenSans'
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    fontFamily: 'OpenSans'
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
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'OpenSans'
  },
  button: {
    backgroundColor: '#809a03',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'OpenSans'
  }
});

export default ForgotPassword;
