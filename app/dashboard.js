import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Animated,
  Easing,
  Dimensions 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.7;

const HomeScreen = () => {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [drawerAnim] = useState(new Animated.Value(-DRAWER_WIDTH));

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(drawerAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(drawerAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu} style={styles.burgerButton}>
          <View style={styles.burgerIcon}>
            <View style={[styles.burgerLine, { width: 26 }]} />
            <View style={[styles.burgerLine, { width: 32 }]} />
            <View style={[styles.burgerLine, { width: 20 }]} />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guard Your Crops,</Text>
        <Text style={styles.headerTitle}>Grow with Confidence!</Text>
         <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>


      
        <View style={styles.content}>

          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/camera', params: { crop: 'Corn' } })}
          >
            <View style={styles.cardContent}>
              <Image source={require('../assets/mais.webp')} style={styles.cardLogo} />
              <View style={styles.cardRight}>
                <Text style={styles.cardTitle}>
                  Corn <Text style={styles.italic}>(Mais)</Text>
                </Text>
                <Text style={styles.cardSubtitle}>
                  Capture image of a leaf to know more about
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Rice Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/camera', params: { crop: 'Rice' } })}
          >
            <View style={styles.cardContent}>
              <Image source={require('../assets/palay.jpg')} style={styles.cardLogo} />
              <View style={styles.cardRight}>
                <Text style={styles.cardTitle}>
                  Rice <Text style={styles.italic}>(Palay)</Text>
                </Text>
                <Text style={styles.cardSubtitle}>
                  Capture image of a leaf to know more about
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Tomato Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/camera', params: { crop: 'Tomato' } })}
          >
            <View style={styles.cardContent}>
              <Image source={require('../assets/kamatis.webp')} style={styles.cardLogo} />
              <View style={styles.cardRight}>
                <Text style={styles.cardTitle}>
                  Tomato <Text style={styles.italic}>(Kamatis)</Text>
                </Text>
                <Text style={styles.cardSubtitle}>
                  Capture image of a leaf to know more about
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
     
  
      {menuVisible && (
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPress={toggleMenu} 
        />
      )}

  
      <Animated.View style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}>
        <View style={styles.drawerHeader}>
          <TouchableOpacity onPress={toggleMenu} style={styles.iconWrapper}>
            <Ionicons name="arrow-back" size={32} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.drawerContent}>
          <TouchableOpacity
            style={styles.largeCard}
            onPress={() => {
              toggleMenu();
              router.push('/history');
            }}
          >
            <Text style={styles.largeCardText}>Record History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.largeCard}
            onPress={() => {
              toggleMenu();
              router.push('/review');
            }}
          >
            <Text style={styles.largeCardText}>View Ratings / Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.largeCard}
            onPress={() => {
              toggleMenu();
              router.push('/about');
            }}
          >
            <Text style={styles.largeCardText}>About App</Text>
          </TouchableOpacity>

  <TouchableOpacity
            style={styles.largeCard}
            onPress={() => {
              toggleMenu();
              router.push('/login');
            }}
          >
            <Text style={styles.largeCardText}>Logout</Text>
          </TouchableOpacity>  

        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    backgroundColor: '#3E6E53F7',
    paddingTop: 60,
    paddingBottom: 75,
    alignItems: 'flex-start',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: 'relative',
    paddingLeft: 20,
    marginBottom: 20,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'left',
    marginBottom: 5,
    fontFamily: 'OpenSans',
  },
  burgerButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    zIndex: 10,
  },
  burgerIcon: {
    width: 32,
    height: 24,
    justifyContent: 'space-between',
  },
  burgerLine: {
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    marginTop: -60,
    alignItems: 'center',
    zIndex: 2,
  },
  card: {
    backgroundColor: '#D5EBDF',
    width: '90%',
    borderRadius: 20,
    marginBottom: 15,
    padding: 20,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#d5e8c0',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardRight: {
    flex: 1,
    marginLeft: 15,
    alignItems: 'center',
  },
  cardLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#84AA80',
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'OpenSans',
  },
  italic: {
    fontStyle: 'italic',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'OpenSans',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 100,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#fffe',
    zIndex: 101,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 50,
    paddingBottom: 10,
    paddingTop: 15,
  },
  iconWrapper: {
    marginRight: 175,
    padding: 3,
    
  },
  drawerContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  largeCard: {
    backgroundColor: '#E5F1E0',
    width: '100%',
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  largeCardText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'OpenSans',
  },
  logo: {
    position: 'absolute',
    top: 10,
    right: 20,
    width: 58,
    height: 50,
  },
});
