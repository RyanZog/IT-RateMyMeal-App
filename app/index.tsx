//je dois gerer le type de Image 
 
import MealCard from "@/components/Mealcard";
import { useRouter } from "expo-router";
import { ActivityIndicator, Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { useMeals } from "../context/MealsContext";

export default function Index() {
  const { meals, clearAllMeals, isLoading } = useMeals();
  const router = useRouter();

  const handleClearAll = () => {
    Alert.alert(
      'Vider tous les repas',
      'Êtes-vous sûr ? Cette action est irréversible.',
      [
        {
          text: 'Annuler',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Vider',
          onPress: async () => {
            try {
              await clearAllMeals();
              Alert.alert('Succès', 'Tous les repas ont été supprimés.');
            } catch (error) {
              Alert.alert('Erreur', 'Impossible de vider la base de données.');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="RateMyMeal"/>
      
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="coral" />
          <Text style={styles.loadingText}>Traitement...</Text>
        </View>
      )}
      
      <ScrollView style={styles.content}>
        <Text style={styles.welcome}>Bienvenue sur RateMyMeal</Text>
        
        {meals.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>🍽️</Text>
            <Text style={styles.emptyStateTitle}>Aucun repas</Text>
            <Text style={styles.emptyStateSubtext}>Commencez à ajouter vos repas favoris !</Text>
          </View>
        ) : (
          <FlatList
            data={meals}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MealCard 
                id={item.id}        
                name={item.nom} 
                note={item.note} 
                imageUrl={item.imageUrl}
              />
            )}
            contentContainerStyle={styles.mealsSection}
            scrollEnabled={false}
          />
        )}
        
        {/* Bouton pour ajouter un plat */}
        <Pressable 
          style={styles.addButton}
          onPress={() => router.push('/add')}
        >
          <Text style={styles.addButtonText}>+ Ajouter un nouveau repas</Text>
        </Pressable>

        {/* Bouton pour vider tout */}
        {meals.length > 0 && (
          <Pressable 
            style={styles.clearButton}
            onPress={handleClearAll}
          >
            <Text style={styles.clearButtonText}>🗑️ Vider tous les repas</Text>
          </Pressable>
        )}
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  welcome: {
    fontSize: 18,
    marginVertical: 20,
    fontWeight: '500',
    textAlign: 'center'
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateText: {
    fontSize: 60,
    marginBottom: 10,
  },
  emptyStateTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#bbb',
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
  },
  clearButton: {
    backgroundColor: '#FF6B6B',
    padding: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
