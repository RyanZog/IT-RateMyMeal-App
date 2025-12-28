import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMeals } from '../../context/MealsContext';
import { PLACEHOLDER_IMAGE_URL } from '../../lib/database';

export default function MealDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { meals, deleteMeal } = useMeals();
  
  // Trouver le plat correspondant a l'ID
  const meal = meals.find(m => m.id === parseInt(id as string));
  
  const handleDelete = async () => {
    if (!meal) return;
    
    // Affiche une alerte de confirmation (React Native)
    Alert.alert(
      'Supprimer le repas',
      `Êtes-vous sûr de vouloir supprimer "${meal.nom}" ?`,
      [
        {
          text: 'Annuler',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: async () => {
            await deleteMeal(meal.id);
            router.back();
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  if (!meal) {
    return (
      <View style={styles.container}>
        <Text>Ce plat n'existe pas</Text>
      </View>
    );
  }

  // Vérifier si c'est une vraie photo ou le placeholder
  const isPlaceholder = !meal.imageUrl || meal.imageUrl === PLACEHOLDER_IMAGE_URL;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Image avec fallback */}
        <View style={styles.imageContainer}>
          {meal.imageUrl ? (
            <>
              <Image source={{ uri: meal.imageUrl }} style={styles.image} />
              {isPlaceholder && (
                <View style={styles.placeholderOverlay}>
                  <Text style={styles.placeholderText}>📷</Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.noImageContainer}>
              <Text style={styles.noImageText}>📷</Text>
              <Text style={styles.noImageLabel}>Pas de photo</Text>
            </View>
          )}
        </View>
        
        {/* Informations du repas */}
        <View style={styles.infoContainer}>
          <Text style={styles.mealName}>{meal.nom}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {meal.note}/5</Text>
            <View style={styles.ratingBar}>
              <View style={[styles.ratingFill, { width: `${(meal.note / 5) * 100}%` }]} />
            </View>
          </View>
          
          <View style={styles.details}>
            <Text style={styles.detailTitle}>📝 Informations</Text>
            <Text style={styles.detailText}>🍽️ Nom: <Text style={styles.detailValue}>{meal.nom}</Text></Text>
            <Text style={styles.detailText}>⭐ Note: <Text style={styles.detailValue}>{meal.note} étoiles</Text></Text>
            <Text style={styles.detailText}>🆔 ID: <Text style={styles.detailValue}>{meal.id}</Text></Text>
          </View>

          {/* Boutons d'action */}
          <View style={styles.buttonContainer}>
            <Pressable 
              style={[styles.button, styles.updateButton]} 
              onPress={() => router.push(`/edit/${meal.id}`)}
            >
              <Text style={styles.buttonText}>✏️ Modifier</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.button, styles.deleteButton]} 
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>🗑️ Supprimer</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingBottom: 30,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 80,
    opacity: 0.6,
  },
  noImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  noImageText: {
    fontSize: 60,
    marginBottom: 10,
  },
  noImageLabel: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  mealName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  rating: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '600',
  },
  ratingBar: {
    width: 200,
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  ratingFill: {
    height: '100%',
    backgroundColor: '#FF9800',
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  detailValue: {
    fontWeight: '600',
    color: '#333',
  },
  buttonContainer: {
    gap: 10,
    marginTop: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  updateButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});