import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useLanguage } from './context/LanguageContext';
import { translations } from './translations/translations';

const AboutScreen = () => {
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const handlePress = (url) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button and Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/dashboard')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.aboutTitle}</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>CropMD</Text>
        <Text style={styles.paragraph}>
          {t.welcome}
        </Text>
        <Text style={styles.paragraph}>
          {t.easyToUse}
        </Text>
        <Text style={styles.paragraph}>
          {t.mission}
        </Text>
        <Text style={styles.paragraph}>
          {t.support}
        </Text>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>{t.contactUs}</Text>
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handlePress('mailto:CropMD@gmail.com')}
          >
            <Ionicons name="mail" size={24} color="#84AA80" />
            <Text style={styles.contactText}>CropMD@gmail.com</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handlePress('https://www.facebook.com/')}
          >
            <FontAwesome name="facebook" size={24} color="#84AA80" />
            <Text style={styles.contactText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handlePress('tel:+1234567890')}
          >
            <Ionicons name="call" size={24} color="#84AA80" />
            <Text style={styles.contactText}>+639123456789</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
 header: {
    backgroundColor: '#C2A868',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'left',
    flex: 1,
    marginRight: 30, // Ensures the title stays centered
    fontFamily: 'OpenSans',
    marginLeft: 15
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'OpenSans'
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    lineHeight: 24,
    fontFamily: 'OpenSans'
  },
  contactSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#84AA80',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'OpenSans'
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'center',
    fontFamily: 'OpenSans'
  },
  contactText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
    fontFamily: 'OpenSans'
  },
});