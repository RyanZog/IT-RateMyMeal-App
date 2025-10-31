import AddMealForm from "@/components/AddMealForm";
import MealCard from "@/components/Mealcard";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";

type Meal = {
  nom : string,
  note: number
};
const [meal, setMeal] = useState<Meal[]>([]); 
export default function Index() {
  return (
    

    <View style={styles.container}>
      <Header title="RateMyMeal"/>
      <Text style={styles.welcome}>Bienvenue sur RateMyMeal</Text>
      <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.cardContainer}>
          <MealCard name="Pizza" note={4.5} image={require('../assets/meal/PizzaMargherita.jpg')}/>
          <MealCard name="Pasta" note={4.0} image={require('../assets/meal/Pasta.jpg')}/>
          <MealCard name="Salad" note={3.5} image={require('../assets/meal/salad.jpg')}/>
        </View>
      </ScrollView>
      <AddMealForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  welcome: {
    fontSize: 18,
    marginVertical: 20,
    fontWeight: '500',
    textAlign: 'center'
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 10,
    gap: 15 // Espace entre les cartes
  }
});
