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
import { Ionicons } from '@expo/vector-icons';

const Register = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = () => {
    if (!form.firstName || !form.lastName || !form.username || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    Alert.alert('Success', 'Registration Successful');
    router.replace('/dashboard'); 
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Register</Text>
      <TextInput 
        placeholder="First Name" 
        style={styles.input} 
        onChangeText={text => handleChange('firstName', text)} 
      />
      <TextInput 
        placeholder="Last Name" 
        style={styles.input} 
        onChangeText={text => handleChange('lastName', text)} 
      />
      <TextInput 
        placeholder="Username" 
        style={styles.input} 
        onChangeText={text => handleChange('username', text)} 
      />
      <TextInput 
        placeholder="Email" 
        style={styles.input} 
        keyboardType="email-address" 
        onChangeText={text => handleChange('email', text)} 
      />
      <TextInput 
        placeholder="Phone Number" 
        style={styles.input} 
        keyboardType="phone-pad" 
        onChangeText={text => handleChange('phone', text)} 
      />


      <View style={styles.passwordContainer}>
        <TextInput 
          placeholder="Password" 
          style={styles.passwordInput} 
          secureTextEntry={!showPassword} 
          onChangeText={text => handleChange('password', text)} 
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons 
            name={showPassword ? "eye-off" : "eye"} 
            size={24} 
            color="gray" 
          />
        </TouchableOpacity>
      </View>

     
      <View style={styles.passwordContainer}>
        <TextInput 
          placeholder="Confirm Password" 
          style={styles.passwordInput} 
          secureTextEntry={!showConfirmPassword} 
          onChangeText={text => handleChange('confirmPassword', text)} 
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Ionicons 
            name={showConfirmPassword ? "eye-off" : "eye"} 
            size={24} 
            color="gray" 
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/index')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#84AA80'
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
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff'
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
    fontWeight: 'bold'
  },
  link: {
    marginTop: 10,
    color: '#000'
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
  }
});
