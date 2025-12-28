import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMeals } from '../../context/MealsContext';
import { PLACEHOLDER_IMAGE_URL } from '../../lib/database';

export default function EditMealScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { meals, updateMeal } = useMeals();
  
  const [nom, setNom] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Load meal data to edit
  useEffect(() => {
    const meal = meals.find(m => m.id === parseInt(id as string));
    if (meal) {
      setNom(meal.nom);
      setNote(meal.note.toString());
      setImageUrl(meal.imageUrl || PLACEHOLDER_IMAGE_URL);
      setIsLoading(false);
    }
  }, [id, meals]);

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

  const handleUpdateMeal = async () => {
    const mealId = parseInt(id as string);
    
    if (nom.trim() !== "" && note.trim() !== "") {
      const noteNumber = parseFloat(note);
      if (noteNumber >= 0 && noteNumber <= 5) {
        try {
          await updateMeal(mealId, nom.trim(), noteNumber, imageUrl || PLACEHOLDER_IMAGE_URL);
          router.back();
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

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Edit Meal</Text>

        <TextInput
          style={styles.input}
          value={nom}
          onChangeText={setNom}
          placeholder="Meal name"
        />

        <TextInput
          style={styles.input}
          value={note}
          onChangeText={setNote}
          placeholder="Rating (between 0 and 5)"
          keyboardType="numeric"
        />

        <Pressable style={styles.cameraButton} onPress={handlePickImage}>
          <Text style={styles.buttonText}>📷 Change Photo</Text>
        </Pressable>

        {imageUrl && (
          <View style={styles.imagePreview}>
            <Image source={{ uri: imageUrl }} style={styles.previewImage} />
          </View>
        )}

        <Pressable style={styles.button} onPress={handleUpdateMeal}>
          <Text style={styles.buttonText}>💾 Save Changes</Text>
        </Pressable>

        <Pressable 
          style={[styles.button, styles.cancelButton]} 
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  cameraButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    marginBottom: 15,
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#999',
  },
});
