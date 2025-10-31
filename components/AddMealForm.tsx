import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type AddMealFormProps = {
  onAddMeal: (nom: string, note: number) => void;
};

const AddMealForm = ({ onAddMeal }: AddMealFormProps) => {
  const [nom, setNom] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const handleAddMeal = () => {
    if (nom.trim() !== "" && note.trim() !== "") {
      const noteNumber = parseFloat(note);
      if (noteNumber >= 0 && noteNumber <= 5) {
        onAddMeal(nom.trim(), noteNumber);
        setNom(""); 
        setNote(""); 
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajouter un nouveau repas</Text>

      <View style={styles.form}>
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
      </View>

      <Text style={styles.infoText}>
        Les plats sont ajoutés dynamiquement 
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "coral",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
    fontStyle: 'italic'
  }
});

export default AddMealForm;
