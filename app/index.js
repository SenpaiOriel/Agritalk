import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

const LoadingScreen = () => {
  const router = useRouter();
  
  // Animated values for three dots
  const dot1Anim = useRef(new Animated.Value(1)).current;
  const dot2Anim = useRef(new Animated.Value(0.2)).current;
  const dot3Anim = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    const animateDots = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot1Anim, {
            toValue: 0.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Anim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Anim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot1Anim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Anim, {
            toValue: 0.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Anim, {
            toValue: 0.2,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDots();

    // Redirect after 3 seconds
    setTimeout(() => {
      router.replace('/login');
    }, 5000);

  }, []);

  return (
    <View style={styles.container}>
      {/* Round Logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      
      {/* Loading Dots */}
      <View style={styles.loader}>
        <Animated.View style={[styles.dot, { opacity: dot1Anim }]} />
        <Animated.View style={[styles.dot, { opacity: dot2Anim }]} />
        <Animated.View style={[styles.dot, { opacity: dot3Anim }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E593F',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#84AA80',
  },
  loader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60, 
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: '#000',
  },
});

export default LoadingScreen;
