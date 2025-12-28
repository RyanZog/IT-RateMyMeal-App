import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMeals } from '../context/MealsContext';
import { PLACEHOLDER_IMAGE_URL } from '../lib/database';

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
        Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès à la caméra pour utiliser cette fonctionnalité.');
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
          // imageUrl optionnelle : DB fournit le placeholder par défaut
          await addMeal(nom.trim(), noteNumber, imageUrl || PLACEHOLDER_IMAGE_URL);
          router.back();
        } catch (error: any) {
          Alert.alert('Erreur', error.message);
        }
      } else {
        Alert.alert('Erreur', 'La note doit être entre 0 et 5');
      }
    } else {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Ajouter un nouveau repas</Text>

        <TextInput
          style={styles.input}
          value={nom}
          onChangeText={setNom}
          placeholder="Nom du repas"
        />

        <TextInput
          style={styles.input}
          value={note}
          onChangeText={setNote}
          placeholder="Note (entre 0 et 5)"
          keyboardType="numeric"
        />

        <Pressable style={styles.cameraButton} onPress={handlePickImage}>
          <Text style={styles.buttonText}>📷 Prendre une photo</Text>
        </Pressable>

        {imageUrl && (
          <View style={styles.imagePreview}>
            <Image source={{ uri: imageUrl }} style={styles.previewImage} />
            <Pressable 
              style={styles.removeImageButton}
              onPress={() => setImageUrl("")}
            >
              <Text style={styles.removeImageText}>❌ Supprimer</Text>
            </Pressable>
          </View>
        )}

        <Pressable style={styles.button} onPress={handleAddMeal}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </Pressable>

        <Pressable 
          style={[styles.button, styles.cancelButton]} 
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Annuler</Text>
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
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  cameraButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
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
    borderRadius: 5,
    marginBottom: 10,
  },
  removeImageButton: {
    padding: 8,
    backgroundColor: '#ffebee',
    borderRadius: 5,
  },
  removeImageText: {
    color: '#c62828',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'coral',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
