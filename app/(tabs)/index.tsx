import MealCard from "@/components/Mealcard";
import { useRouter } from "expo-router";
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { useMeals } from "../../context/MealsContext";

export default function Journal() {
  const { meals, clearAllMeals, isLoading } = useMeals();
  const router = useRouter();

  const handleClearAll = () => {
    Alert.alert(
      'Delete all meals',
      'Are you sure? This action is irreversible.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await clearAllMeals();
              Alert.alert('Success', 'All meals have been deleted.');
            } catch (error) {
              Alert.alert('Error', 'Unable to delete the database.');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title="🍽️ My Journal"/>
      
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="coral" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
      
      {meals.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>📭</Text>
          <Text style={styles.emptyStateTitle}>No meals recorded</Text>
          <Text style={styles.emptyStateSubtext}>Press "Add" to start</Text>
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
          scrollEnabled={true}
        />
      )}

      {/* Bouton pour vider tout */}
      {meals.length > 0 && (
        <Pressable 
          style={styles.clearButton}
          onPress={handleClearAll}
        >
          <Text style={styles.clearButtonText}>🗑️ Delete History</Text>
        </Pressable>
      )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 0,
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
    zIndex: 100,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyStateIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  emptyStateSubtext: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
  },
  mealsSection: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingBottom: 80,
  },
  clearButton: {
    backgroundColor: '#FF6B6B',
    margin: 15,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
