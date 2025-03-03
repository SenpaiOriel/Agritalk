import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const FeedbackScreen = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Ionicons name="leaf" size={40} color="#4CAF50" style={styles.icon} />
        <Text style={styles.title}>How do you rate our Application?</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Ionicons name={star <= rating ? "star" : "star-outline"} size={40} color={star <= rating ? "#FFD700" : "#CCC"} />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Tell us more (optional):</Text>
        <TextInput
          style={styles.input}
          placeholder="Why this rating?"
          value={feedback}
          onChangeText={setFeedback}
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={30} color="#4CAF50" />
            <Text style={styles.modalText}>Thank you for your feedback! We appreciate your input.</Text>
            <TouchableOpacity style={styles.okButton} onPress={() => setModalVisible(false)}>
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
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#84AA80',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
    
  },
  backButton: {
    padding: 10,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    elevation: 1,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 80,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#1B5E20',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  submitText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  okText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
