import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMeals } from '../../context/MealsContext';
import { PLACEHOLDER_IMAGE_URL } from '../../lib/database';

export default function AddMealScreen() {
  const router = useRouter();
  const { addMeal } = useMeals();
  const [nom, setNom] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const verifyPermissions = async () => {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await ImagePicker.requestCameraPermissionsAsync();
      if (newStatus !== 'granted') {
        Alert.alert('Permission Denied', 'You must allow camera access to use this feature.');
        return false;
      }
    }
    return true;
  };

  const handlePickImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setImageUrl(result.assets[0].uri);
    }
  };

  const handleAddMeal = async () => {
    if (nom.trim() !== "" && note.trim() !== "") {
      const noteNumber = parseFloat(note);
      if (noteNumber >= 0 && noteNumber <= 5) {
        try {
          await addMeal(nom.trim(), noteNumber, imageUrl || PLACEHOLDER_IMAGE_URL);
          setNom("");
          setNote("");
          setImageUrl("");
          Alert.alert('Success', 'Meal added successfully!');
          router.push('/');
        } catch (error: any) {
          Alert.alert('Error', error.message);
        }
      } else {
        Alert.alert('Error', 'Rating must be between 0 and 5');
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.form}>
        <Text style={styles.title}>➕ Add a Meal</Text>

        {/* Image Preview */}
        <View style={styles.imagePreview}>
          {imageUrl ? (
            <>
              <Image source={{ uri: imageUrl }} style={styles.previewImage} />
              <Pressable 
                style={styles.removeImageBtn}
                onPress={() => setImageUrl("")}
              >
                <Text style={styles.removeImageText}>✕</Text>
              </Pressable>
            </>
          ) : (
            <View style={styles.emptyImageBox}>
              <Text style={styles.cameraIcon}>📷</Text>
              <Text style={styles.cameraText}>No photo</Text>
            </View>
          )}
        </View>

        {/* Take Photo Button */}
        <Pressable 
          style={styles.cameraButton}
          onPress={handlePickImage}
        >
          <Text style={styles.cameraButtonText}>📸 Take a photo</Text>
        </Pressable>

        {/* Input Fields */}
        <TextInput
          style={styles.input}
          value={nom}
          onChangeText={setNom}
          placeholder="Meal name"
          placeholderTextColor="#ccc"
        />

        {/* Rating with Stars */}
        <View style={styles.ratingSection}>
          <Text style={styles.ratingLabel}>Rating (0-5) ⭐</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable
                key={star}
                onPress={() => setNote(star.toString())}
                style={styles.starButton}
              >
                <Text style={[
                  styles.star,
                  parseInt(note) >= star ? styles.starFilled : styles.starEmpty
                ]}>
                  ★
                </Text>
              </Pressable>
            ))}
          </View>
          {note && <Text style={styles.noteValue}>{note}/5</Text>}
        </View>

        {/* Save Button */}
        <Pressable 
          style={styles.addButton}
          onPress={handleAddMeal}
        >
          <Text style={styles.addButtonText}>✓ Save Meal</Text>
        </Pressable>

        <Pressable 
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  imagePreview: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  removeImageBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  emptyImageBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  cameraIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  cameraText: {
    fontSize: 16,
    color: '#999',
  },
  cameraButton: {
    backgroundColor: 'coral',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cameraButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  ratingSection: {
    marginBottom: 25,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  starButton: {
    padding: 10,
  },
  star: {
    fontSize: 40,
  },
  starFilled: {
    color: '#FFD700',
  },
  starEmpty: {
    color: '#ccc',
  },
  noteValue: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});
