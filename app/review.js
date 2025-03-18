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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FeedbackScreen = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const inputRef = useRef(null);
  const router = useRouter();

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
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            const updatedReviews = reviews.filter((review) => review.id !== id);
            setReviews(updatedReviews);
            saveReviews(updatedReviews);
          },
          style: 'destructive',
        },
      ]
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
            Alert.alert('Options', 'Do you want to Edit or delete this review?', [
              {
                text: 'Edit',
                onPress: () => handleEditReview(item),
              },
              {
                text: 'Delete',
                onPress: () => handleDeleteReview(item.id),
                style: 'destructive',
              },
              { text: 'Cancel', style: 'cancel' },
            ])
          }
        >
          <Ionicons name="ellipsis-vertical" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Feedback Text */}
      <Text style={styles.reviewText}>
        {item.feedback || 'No comment provided.'}
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
        <Text style={styles.headerTitle}>Feedback</Text>
      </View>

      {/* Feedback Card */}
      <View style={styles.card}>
        <Ionicons name="leaf" size={40} color="#4CAF50" style={styles.icon} />
        <Text style={styles.title}>How do you rate our Application?</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={40}
                color={star <= rating ? '#FFD700' : '#CCC'}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Why this rating?"
          value={feedback}
          onChangeText={setFeedback}
          multiline
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={selectedReview ? handleUpdateReview : handleSubmit}
        >
          <Text style={styles.submitText}>
            {selectedReview ? 'Update' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* List of Reviews */}
      <View style={styles.reviewsContainer}>
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={renderReview}
          contentContainerStyle={styles.reviewList}
        />
      </View>

      {/* Success Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={40} color="#4CAF50" />
            <Text style={styles.modalText}>Thank you for your feedback!</Text>
            <TouchableOpacity style={styles.okButton} onPress={closeModal}>
              <Text style={styles.okText}>OK</Text>
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
    height: 70,
    backgroundColor: '#3b591e',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 1, // Ensure header is above other elements
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
    shadowColor: '#1B5E20',
    shadowOffset: { width: 5, height: 4 },
    shadowOpacity: 3,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 2, // Ensure card is above the header
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 80,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#1B5E20',
    paddingVertical: 12,
    borderRadius: 8,
  },
  submitText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reviewsContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  reviewList: {
    paddingBottom: 20,
  },
  reviewItem: {
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#1B5E20',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  okText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    alignSelf: 'center',
  },
});