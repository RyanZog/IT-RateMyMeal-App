import { useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useMeals } from '../../context/MealsContext';

export default function MealDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { meals } = useMeals();
  
  // Trouver le plat correspondant à l'ID
  const meal = meals.find(m => m.id === parseInt(id as string));
  
  if (!meal) {
    return (
      <View style={styles.container}>
        <Text>Ce plat n'existe pas</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    
      
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {meal.image && (
            <Image source={meal.image} style={styles.image} />
          )}
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.mealName}>{meal.nom}</Text>
          <Text style={styles.rating}>⭐ {meal.note}/5</Text>
          
          <View style={styles.details}>
            <Text style={styles.detailTitle}>Informations</Text>
            <Text style={styles.detailText}>Nom: {meal.nom}</Text>
            <Text style={styles.detailText}>Note: {meal.note} étoiles</Text>
            <Text style={styles.detailText}>ID: {meal.id}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  mealName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  backButton: {
    backgroundColor: 'coral',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 50,
  },
});