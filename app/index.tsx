//je dois gerer le type de Image 
 
import MealCard from "@/components/Mealcard";
import { useRouter } from "expo-router";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { useMeals } from "../context/MealsContext";

export default function Index() {
  const { meals } = useMeals();
  const router = useRouter();

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
        
        {/* Bouton pour ajouter un plat */}
        <Pressable 
          style={styles.addButton}
          onPress={() => router.push('/add')}
        >
          <Text style={styles.addButtonText}>+ Ajouter un nouveau repas</Text>
        </Pressable>
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
  },
  addButton: {
    backgroundColor: 'coral',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
