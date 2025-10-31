import AddMealForm from "@/components/AddMealForm";
import MealCard from "@/components/Mealcard";
import { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";

type Meal = {
  id: number;
  nom: string;
  note: number;
  image?: string;
};

export default function Index() {
  const [meals, setMeals] = useState<Meal[]>([
    { id: 1, nom: "Pizza", note: 4.5, image: require("../assets/meal/PizzaMargherita.jpg") },
    { id: 2, nom: "Pasta", note: 4.0, image: require("../assets/meal/Pasta.jpg") },
    { id: 3, nom: "Salad", note: 3.5, image: require("../assets/meal/salad.jpg") },
  ]);

  const addMeal = (nom: string, note: number) => {
    const newMeal: Meal = {
      id: meals.length + 1,
      nom: nom,
      note: note
    };
    setMeals([...meals, newMeal]);
  };

  return (
    <View style={styles.container}>
      <Header title="RateMyMeal"/>
      
      <ScrollView style={styles.content}>
        <Text style={styles.welcome}>Bienvenue sur RateMyMeal</Text>
        
        
        <FlatList
          data={meals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MealCard 
              id={item.id}        
              name={item.nom} 
              note={item.note} 
              image={item.image}
            />
          )}
          contentContainerStyle={styles.mealsSection}
          scrollEnabled={false} // Désactive le scroll interne
        />
        
        {/* Formulaire d'ajout */}
        <AddMealForm onAddMeal={addMeal} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    flex: 1,
  },
  welcome: {
    fontSize: 18,
    marginVertical: 20,
    fontWeight: '500',
    textAlign: 'center'
  },
  mealsSection: {
    paddingHorizontal: 10,
  }
});
