import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ScrollView 
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const router = useRouter();
  const [language, setLanguage] = useState("EN");

  // Toggle Language
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "EN" ? "TL" : "EN"));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          {/* Language Toggle (Top Right) */}
          <TouchableOpacity style={styles.languageToggle} onPress={toggleLanguage}>
            <MaterialIcons name="g-translate" size={24} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            {/* Logo */}
            <Image source={require("../assets/logo.png")} style={styles.logo} />

            {/* Title (Below Logo) */}
            <Text style={styles.headerTitle}>
              {language === "EN"
                ? "Guard Your Crops,"
                : "Bantayan ang Iyong Pananim, "}
            </Text>
            <Text style={styles.headerTitle}>
              {language === "EN"
                ? "Grow with Confidence!"
                : " Lumago nang May Kumpiyansa!"}
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
                <Text style={styles.cardTitle}>{language === "EN" ? "Corn" : "Mais"}</Text>
                <Text style={styles.cardSubtitle}>
                  {language === "EN"
                    ? "Capture image of a leaf to know more about your crop's condition"
                    : "Kuhanan ng larawan ang dahon upang malaman ang kalagayan ng iyong pananim"}
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
                <Text style={styles.cardTitle}>{language === "EN" ? "Rice" : "Palay"}</Text>
                <Text style={styles.cardSubtitle}>
                  {language === "EN"
                    ? "Capture image of a leaf to know more about your crop's condition"
                    : "Kuhanan ng larawan ang dahon upang malaman ang kalagayan ng iyong pananim"}
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
                <Text style={styles.cardTitle}>{language === "EN" ? "Tomato" : "Kamatis"}</Text>
                <Text style={styles.cardSubtitle}>
                  {language === "EN"
                    ? "Capture image of a leaf to know more about your crop's condition"
                    : "Kuhanan ng larawan ang dahon upang malaman ang kalagayan ng iyong pananim"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/history")} style={styles.navItem}>
          <Ionicons name="time" size={24} color="black" />
          <Text style={styles.navText}>{language === "EN" ? "History" : "Kasaysayan"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/review")} style={styles.navItem}>
          <Ionicons name="star" size={24} color="black" />
          <Text style={styles.navText}>{language === "EN" ? "Ratings" : "Rating"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/about")} style={styles.navItem}>
          <Ionicons name="information-circle" size={24} color="black" />
          <Text style={styles.navText}>{language === "EN" ? "About" : "Tungkol"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login")} style={styles.navItem}>
          <Ionicons name="log-out" size={24} color="black" />
          <Text style={styles.navText}>{language === "EN" ? "Logout" : "Logout"}</Text>
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
    padding: 10,
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
    maxWidth: "90%", // Prevents overflow
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
