import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type Meal = {
    nom: string;
    note: number;
}

const AddMealForm = () => {
    const [nom, setNom] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const [meals, setMeals] = useState<Meal[]>([]);

    const handleAddMeal = () => {
        if (nom.trim() !== "" && note.trim() !== "") {
            const noteNumber = parseFloat(note);
            if (noteNumber >= 0 && noteNumber <= 5) {
                const newMeal: Meal = {
                    nom: nom.trim(),
                    note: noteNumber
                };
                setMeals([...meals, newMeal]);
                setNom(""); // réinitialisation
                setNote(""); // réinitialisation
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
                
                <Pressable 
                    style={styles.button}
                    onPress={handleAddMeal}
                >
                    <Text style={styles.buttonText}>Ajouter</Text>
                </Pressable>
            </View>

            <View style={styles.mealList}>
                {meals.length === 0 ? (
                    <Text style={styles.emptyText}>Aucun repas ajouté</Text>
                ) : (
                    meals.map((meal, index) => (
                        <Text key={index} style={styles.mealItem}>
                            {meal.nom} - Note: {meal.note}/5
                        </Text>
                    ))
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    form: {
        gap: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: 'coral',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    mealList: {
        marginTop: 20,
    },
    mealItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
    },
});

export default AddMealForm;
