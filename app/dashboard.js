import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ScrollView,
  Modal,
  Animated
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLanguage } from './context/LanguageContext';
import { translations } from './translations/translations';

const HomeScreen = () => {
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedLang, setSelectedLang] = useState(language);

  const toggleLanguageMenu = () => {
    setShowLanguageMenu(!showLanguageMenu);
    setSelectedLang(language);
    Animated.timing(fadeAnim, {
      toValue: showLanguageMenu ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleLanguageSelect = (lang) => {
    setSelectedLang(lang);
  };

  const handleSelectPress = () => {
    if (selectedLang !== language) {
      toggleLanguage();
    }
    toggleLanguageMenu();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          {/* Language Toggle (Top Right) */}
          <TouchableOpacity 
            style={styles.languageToggle} 
            onPress={toggleLanguageMenu}
          >
            <MaterialIcons 
              name="g-translate" 
              size={24} 
              color="#FFF" 
            />
            <Text style={styles.languageText}>
              {language === "EN" ? "EN" : "TL"}
            </Text>
          </TouchableOpacity>

          <View style={styles.headerContent}>
            {/* Logo */}
            <Image source={require("../assets/logo.png")} style={styles.logo} />

            {/* Title (Below Logo) */}
            <Text style={styles.headerTitle}>
              {t.guardCrops}
            </Text>
            <Text style={styles.headerTitle}>
              {t.growConfidence}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Corn Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: "/camera", params: { crop: "Corn" } })}
          >
            <View style={styles.cardContent}>
              <Image source={require("../assets/mais.webp")} style={styles.cardLogo} />
              <View style={styles.cardRight}>
                <Text style={styles.cardTitle}>{t.corn}</Text>
                <Text style={styles.cardSubtitle}>
                  {t.captureLeaf}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Rice Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: "/camera", params: { crop: "Rice" } })}
          >
            <View style={styles.cardContent}>
              <Image source={require("../assets/palay.jpg")} style={styles.cardLogo} />
              <View style={styles.cardRight}>
                <Text style={styles.cardTitle}>{t.rice}</Text>
                <Text style={styles.cardSubtitle}>
                  {t.captureLeaf}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Tomato Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: "/camera", params: { crop: "Tomato" } })}
          >
            <View style={styles.cardContent}>
              <Image source={require("../assets/kamatis.webp")} style={styles.cardLogo} />
              <View style={styles.cardRight}>
                <Text style={styles.cardTitle}>{t.tomato}</Text>
                <Text style={styles.cardSubtitle}>
                  {t.captureLeaf}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleLanguageMenu}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={toggleLanguageMenu}
        >
          <Animated.View 
            style={[
              styles.languageMenu,
              { opacity: fadeAnim }
            ]}
          >
            <Text style={styles.modalTitle}>Please select prefer language</Text>
            
            <TouchableOpacity 
              style={[
                styles.languageOption,
                selectedLang === "EN" && styles.selectedLanguage
              ]}
              onPress={() => handleLanguageSelect("EN")}
            >
              <View style={styles.languageOptionContent}>
                <Image 
                  source={require("../assets/us.jpg")} 
                  style={styles.flagIcon}
                />
                <Text style={styles.languageOptionText}>English(US)</Text>
              </View>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity 
              style={[
                styles.languageOption,
                selectedLang === "TL" && styles.selectedLanguage
              ]}
              onPress={() => handleLanguageSelect("TL")}
            >
              <View style={styles.languageOptionContent}>
                <Image 
                  source={require("../assets/ph.jpg")} 
                  style={styles.flagIcon}
                />
                <Text style={styles.languageOptionText}>Tagalog(PH)</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.selectButton}
              onPress={handleSelectPress}
            >
              <Text style={styles.selectButtonText}>Select</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/history")} style={styles.navItem}>
          <Ionicons name="time" size={24} color="black" />
          <Text style={styles.navText}>{t.history}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/review")} style={styles.navItem}>
          <Ionicons name="star" size={24} color="black" />
          <Text style={styles.navText}>{t.ratings}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/about")} style={styles.navItem}>
          <Ionicons name="information-circle" size={24} color="black" />
          <Text style={styles.navText}>{t.about}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login")} style={styles.navItem}>
          <Ionicons name="log-out" size={24} color="black" />
          <Text style={styles.navText}>{t.logout}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  header: {
    backgroundColor: "#C2A868",
    paddingBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 10, 
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30
  },
  languageToggle: {
    position: "absolute",
    top: 15,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 20,
  },
  languageText: {
    color: '#FFF',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageMenu: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  modalTitle: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  languageOption: {
    padding: 10,
    borderRadius: 10,
  },
  selectedLanguage: {
    backgroundColor: 'rgba(194, 168, 104, 0.1)',
  },
  languageOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  flagIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  languageOptionText: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 10,
  },
  selectButton: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'flex-end',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  selectButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  headerContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  logo: {
    width: 60,
    height: 70,
    resizeMode: "contain",
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "600",
    textAlign: "left",
    maxWidth: "90%",
  },
  scrollContent: {
    paddingBottom: 80,
  },
  content: {
    alignItems: "center",
    marginTop: -10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    borderRadius: 15,
    marginBottom: 15,
    padding: 20,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardRight: {
    flex: 1,
    marginLeft: 15,
  },
  cardLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 3,
  },
});
