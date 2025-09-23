import MealCard from "@/components/Mealcard";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
export default function Index() {
  return (
    <View style={styles.container}>
      <Header title="RateMyMeal"/>
      <Text style = {styles.welcome} >Bienvenue sur RateMyMeal</Text>
      <MealCard name="Pizza" note={4.5} image={require('../assets/meal/PizzaMargherita.jpg')}/>
      <MealCard name="Pasta" note={4.0} image={require('../assets/meal/Pasta.jpg')}/>
      <MealCard name="Salad" note={3.5} image={require('../assets/meal/salad.jpg')}/>
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