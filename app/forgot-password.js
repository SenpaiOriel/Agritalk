import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ImageBackground 
} from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLanguage } from './context/LanguageContext';
import { translations } from './translations/translations';

const ForgotPassword = () => {
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendCode = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      Alert.alert('Error', t.fillAllFields);
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Error', t.invalidEmail);
      return;
    }

    setIsCodeSent(true);
    Alert.alert('Success', t.verificationCodeSent);
  };

  const handleVerifyCode = () => {
    if (!code) {
      Alert.alert('Error', t.fillAllFields);
      return;
    }
    
    Alert.alert('Success', t.codeVerified);
    router.push('/reset-password');
  };

  return (
    <ImageBackground source={require('../assets/bg.jpg')} style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      
      <Text style={styles.title}>{t.forgotPasswordTitle}</Text>
      
      {!isCodeSent ? (
        <>
          <Text style={styles.subtitle}>{t.enterEmail}</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color="gray" style={styles.icon} />
            <TextInput 
              placeholder={t.email} 
              style={styles.input} 
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSendCode}>
            <Text style={styles.buttonText}>{t.sendCode}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>{t.enterCode}</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="key-outline" size={24} color="gray" style={styles.icon} />
            <TextInput 
              placeholder={t.enterCode} 
              style={styles.input} 
              keyboardType="numeric"
              onChangeText={text => setCode(text)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
            <Text style={styles.buttonText}>{t.verifyCode}</Text>
          </TouchableOpacity>
        </>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
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
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20
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
    marginLeft: 10
  },
  button: {
    backgroundColor: '#d4af37',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default ForgotPassword;
