import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Keyboard,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from './context/LanguageContext';
import { translations } from './translations/translations';

const FeedbackScreen = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const storedReviews = await AsyncStorage.getItem('reviews');
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
  };

  const saveReviews = async (newReviews) => {
    try {
      await AsyncStorage.setItem('reviews', JSON.stringify(newReviews));
    } catch (error) {
      console.error('Failed to save reviews:', error);
    }
  };

  const handleStarPress = (star) => {
    setRating(star);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    if (rating > 0) {
      const newReview = {
        id: Date.now().toString(),
        rating,
        feedback,
      };

      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      saveReviews(updatedReviews);

      setModalVisible(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setRating(0);
    setFeedback('');
    Keyboard.dismiss();
  };

  const handleDeleteReview = (id) => {
    Alert.alert(
      '🗑️ Tanggalin ang Review',
      'Hindi na maaaring ibalik ang aksyong ito.',
      [
        { 
          text: '↩️ Panatilihin',
          style: 'cancel',
        },
        {
          text: '🗑️ Tanggalin',
          onPress: () => {
            const updatedReviews = reviews.filter((review) => review.id !== id);
            setReviews(updatedReviews);
            saveReviews(updatedReviews);
            Alert.alert(
              '✅ Tagumpay',
              'Na-tanggal ang review',
              [{ text: 'OK' }],
              { 
                cancelable: true,
                titleStyle: { fontFamily: 'OpenSans-Bold' },
                messageStyle: { fontFamily: 'OpenSans' }
              }
            );
          },
          style: 'destructive',
        },
      ],
      { 
        cancelable: true,
        titleStyle: { fontFamily: 'OpenSans-Bold' },
        messageStyle: { fontFamily: 'OpenSans' }
      }
    );
  };

  const handleEditReview = (review) => {
    setSelectedReview(review);
    setRating(review.rating);
    setFeedback(review.feedback);
  };

  const handleUpdateReview = () => {
    if (selectedReview) {
      const updatedReviews = reviews.map((review) =>
        review.id === selectedReview.id
          ? { ...review, rating, feedback }
          : review
      );
      setReviews(updatedReviews);
      saveReviews(updatedReviews);
      setSelectedReview(null);
      setRating(0);
      setFeedback('');
      Keyboard.dismiss();
      Alert.alert(
        '✅ Success',
        'Review updated',
        [{ text: 'OK' }],
        { 
          cancelable: true,
          titleStyle: { fontFamily: 'OpenSans-Bold' },
          messageStyle: { fontFamily: 'OpenSans' }
        }
      );
    }
  };

  const renderReview = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        {/* Star Rating */}
        <View style={styles.starContainer}>
          {[...Array(5)].map((_, i) => (
            <Ionicons
              key={i}
              name={i < item.rating ? 'star' : 'star-outline'}
              size={20}
              color={i < item.rating ? '#FFD700' : '#CCC'}
            />
          ))}
        </View>

        {/* Three Dots Menu */}
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              '✏️ Mga Aksyon sa Review',
              'Pumili ng aksyon:',
              [
                {
                  text: '📝 I-edit',
                  onPress: () => handleEditReview(item),
                  style: 'default',
                },
                {
                  text: '🗑️ Tanggalin',
                  onPress: () => handleDeleteReview(item.id),
                  style: 'destructive',
                },
                {
                  text: '❌ Kanselahin',
                  style: 'cancel',
                },
              ],
              { 
                cancelable: true,
                titleStyle: { fontFamily: 'OpenSans-Bold' },
                messageStyle: { fontFamily: 'OpenSans' }
              }
            )
          }
        >
          <Ionicons name="ellipsis-vertical" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Feedback Text */}
      <Text style={styles.reviewText}>
        {item.feedback || t.noComment}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.feedback}</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Feedback Card */}
        <View style={styles.card}>
          <Image source={require('../assets/logo.png')} style={[styles.icon, { width: 100, height: 77, alignSelf: 'center', marginBottom: 10, opacity: 1 }]} />
          <Text style={styles.title}>{t.experience}</Text>
          <Text style={styles.subtitle}>{t.feedbackHelp}</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity 
                key={star} 
                onPress={() => handleStarPress(star)}
                style={styles.starButton}
              >
                <Ionicons
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={45}
                  color={star <= rating ? '#FFD700' : '#CCC'}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingText}>
            {rating === 0 ? t.tapToRate :
             rating === 1 ? t.poor :
             rating === 2 ? t.fair :
             rating === 3 ? t.good :
             rating === 4 ? t.veryGood : t.excellent}
          </Text>
          <Text style={styles.feedbackLabel}>{t.shareThoughts}</Text>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder={t.tellUs}
            value={feedback}
            onChangeText={setFeedback}
            multiline
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={[styles.submitButton, rating === 0 && styles.submitButtonDisabled]}
            onPress={selectedReview ? handleUpdateReview : handleSubmit}
            disabled={rating === 0}
          >
            <Text style={styles.submitText}>
              {selectedReview ? t.updateReview : t.submitReview}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Reviews Header */}
        <View style={styles.reviewsHeader}>
          <Text style={styles.reviewsTitle}>{t.communityReviews}</Text>
          <Text style={styles.reviewsSubtitle}>{t.seeOthers}</Text>
        </View>

        {/* List of Reviews */}
        <View style={styles.reviewsContainer}>
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id}
            renderItem={renderReview}
            contentContainerStyle={styles.reviewList}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={styles.emptyReviews}>
                <Ionicons name="chatbubble-outline" size={50} color="#CCC" />
                <Text style={styles.emptyReviewsText}>{t.noReviews}</Text>
                <Text style={styles.emptyReviewsSubtext}>{t.beFirst}</Text>
              </View>
            }
          />
        </View>
      </ScrollView>

      {/* Success Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
            </View>
            <Text style={styles.modalTitle}>{t.thankYou}</Text>
            <Text style={styles.modalText}>{t.feedbackHelps}</Text>
            <TouchableOpacity style={styles.okButton} onPress={closeModal}>
              <Text style={styles.okText}>{t.continue}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingTop: 0,
  },
  header: {
    width: '100%',
    height: 65,
    backgroundColor: '#C2A868',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    zIndex: 0,
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
  },
  backButton: {
    padding: 8,
    marginTop: -10,  
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'OpenSans',
    marginLeft: 10,
    marginBottom:10
  },
  card: {
    backgroundColor: '#E0E0E0',
    padding: 25,
    paddingBottom: 30,
    borderRadius: 20,
    width: '92%',
    alignSelf: 'center',
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#4CAF50',
    zIndex: 2,
    position: 'relative',
    bottom: 15
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#2E593F',
    fontFamily: 'OpenSans',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'OpenSans',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  starButton: {
    padding: 5,
  },
  ratingText: {
    fontSize: 18,
    color: '#2E593F',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
  feedbackLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'OpenSans',
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
    fontSize: 16,
    fontFamily: 'OpenSans',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#C2A868',
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: '#CCC',
    elevation: 0,
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'OpenSans',
  },
  reviewsContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  reviewList: {
    paddingBottom: 20,
  },
  reviewItem: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 12,
    borderRadius: 15,
    elevation: 2,
    marginHorizontal: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'OpenSans',
  },
  reviewsHeader: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E593F',
    fontFamily: 'OpenSans',
  },
  reviewsSubtitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'OpenSans',
  },
  emptyReviews: {
    alignItems: 'center',
    padding: 30,
  },
  emptyReviewsText: {
    fontSize: 18,
    color: '#666',
    marginTop: 15,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
  emptyReviewsSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    fontFamily: 'OpenSans',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderColor:'#4CAF50'
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
    elevation: 5,
  },
  modalIconContainer: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
    borderColor:'#4CAF50',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E593F',
    marginBottom: 10,
    fontFamily: 'OpenSans',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: 'OpenSans',
  },
  okButton: {
    backgroundColor: '#C2A868',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 3,
  },
  okText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
    marginTop: 0,
    zIndex: 2,
  },
});