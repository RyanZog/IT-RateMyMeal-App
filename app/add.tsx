import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMeals } from '../context/MealsContext';

export default function AddMealScreen() {
  const router = useRouter();
  const { addMeal } = useMeals();
  const [nom, setNom] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const handleAddMeal = async () => {
    if (nom.trim() !== "" && note.trim() !== "") {
      const noteNumber = parseFloat(note);
      if (noteNumber >= 0 && noteNumber <= 5) {
        try {
          await addMeal(nom.trim(), noteNumber);
          // Retour à l'accueil après ajout
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
