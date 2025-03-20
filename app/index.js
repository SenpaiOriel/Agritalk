import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

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
    <LinearGradient
      colors={['#94C999', '#7FB084', '#629467', '#437347']}
      style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 115,
    height: 100,
    marginBottom: 30
  },
});

export default LoadingScreen;
