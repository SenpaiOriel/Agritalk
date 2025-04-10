import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';
import { useLanguage } from './context/LanguageContext';
import { translations } from './translations/translations';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

export default function App() {
  const [facing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState(null);
  const cameraRef = useRef(null);
  const router = useRouter();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        translateY.value = withSpring(0, { damping: 50 });
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 50 });
      }
    });

  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>{t.fillAllFields}</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.buttonText}>{t.continue}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log('Photo captured:', photo.uri);
        setPhotoUri(photo.uri);
        // Show bottom sheet with spring animation
        translateY.value = withSpring(-SCREEN_HEIGHT / 2, { damping: 50 });
      } catch (error) {
        console.error('Failed to capture photo:', error);
        Alert.alert('Error', t.fillAllFields);
      }
    }
  }

  async function savePhotoToGallery(uri) {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', t.fillAllFields);
      return;
    }

    try {
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Success', t.fillAllFields);
    } catch (error) {
      console.error('Failed to save photo:', error);
      Alert.alert('Error', t.fillAllFields);
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {photoUri ? (
          // Photo preview screen with bottom sheet
          <View style={styles.previewContainer}>
            <Image source={{ uri: photoUri }} style={styles.previewImage} />
            
            <GestureDetector gesture={gesture}>
              <Animated.View style={[styles.bottomSheet, bottomSheetStyle]}>
                <View style={styles.line} />
                <View style={styles.predictionContent}>
                  <Text style={styles.predictionTitle}>Crop Predictions</Text>
                </View>
              </Animated.View>
            </GestureDetector>

            <TouchableOpacity style={styles.retakeButton} onPress={() => {
              setPhotoUri(null);
              translateY.value = withSpring(0, { damping: 50 });
            }}>
              <Text style={styles.buttonText}>{t.retakePhoto}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Camera view
          <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/dashboard')}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
          </CameraView>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 20,
  },
  captureButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#ff4757',
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#fff',
  },
  previewContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  previewImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'cover',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSheet: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    padding: 20,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 2,
  },
  predictionContent: {
    flex: 1,
    padding: 20,
  },
  predictionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  // predictionItem: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingVertical: 15,
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#eee',
  // },
  retakeButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#d4af37',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
});
