import MealCard from "@/components/Mealcard";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
type Meal = {
  id: number;
  nom: string;
  note: number;
  image?: string; // optionnel pour les nouveaux plats
};
export default function Index() {
  const [meals, setMeals] = useState<Meal[]>([
    { id: 1, nom: "Pizza", note: 4.5, image: require("../assets/meal/PizzaMargherita.jpg") },
    { id: 2, nom: "Pasta", note: 4.0, image: require("../assets/meal/Pasta.jpg") },
    { id: 3, nom: "Salad", note: 3.5, image: require("../assets/meal/salad.jpg") },
  ]);
  const addMeal = (nom: string, note: number) =>{
    const newMeal: Meal ={
      id: meals.length +1,
      nom: nom,
      note: note
    };
    setMeals([...meals, newMeal]);
  }

  return (
    <View style={styles.container}>
      <Header title="RateMyMeal"/>
      <Text style = {styles.welcome} >Bienvenue sur RateMyMeal</Text>
      {meals.map((meal) => (
        <MealCard key={meal.id} name={meal.nom} note={meal.note} image={meal.image}/>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#f5f5f5'
  },
  welcome: {
    fontSize: 18,
    marginVertical: 20,
    fontWeight: '500'
  }
})

