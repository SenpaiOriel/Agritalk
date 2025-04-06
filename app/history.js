import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal,ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useLanguage } from './context/LanguageContext';
import { translations } from './translations/translations';

const ScanHistoryScreen = () => {
  const [scanHistory, setScanHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const handleAddScan = (uri) => {
    setScanHistory((prevHistory) => [...prevHistory, uri]);
    setModalVisible(true); 
  };

  const handleCaptureImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      handleAddScan(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.history}</Text>
      </View>

      {/* Screen Content */}
      <View style={styles.content}>
        <Text style={styles.infoText}>{t.noReviews}</Text>
      </View>
    </ScrollView>
  );
};

export default ScanHistoryScreen;

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
    color: 'white',
    marginLeft: 15,
    fontFamily: 'OpenSans'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'OpenSans'
  },
});
