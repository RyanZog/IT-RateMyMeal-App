import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { useMeals } from '../../context/MealsContext';

export default function StatsScreen() {
  const { meals, isLoading } = useMeals();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="coral" />
      </View>
    );
  }

  const totalMeals = meals.length;
  const averageRating = totalMeals > 0 
    ? (meals.reduce((sum, meal) => sum + meal.note, 0) / totalMeals).toFixed(2)
    : 0;

  const highestRated = totalMeals > 0
    ? meals.reduce((max, meal) => meal.note > max.note ? meal : max)
    : null;

  const lowestRated = totalMeals > 0
    ? meals.reduce((min, meal) => meal.note < min.note ? meal : min)
    : null;

  const ratingDistribution = {
    5: meals.filter(m => m.note === 5).length,
    4: meals.filter(m => m.note >= 4 && m.note < 5).length,
    3: meals.filter(m => m.note >= 3 && m.note < 4).length,
    2: meals.filter(m => m.note >= 2 && m.note < 3).length,
    1: meals.filter(m => m.note >= 1 && m.note < 2).length,
    0: meals.filter(m => m.note < 1).length,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title="📊 Statistics" />
        <ScrollView style={styles.content}>
        {/* Summary Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📈 Summary</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total meals recorded</Text>
            <Text style={styles.statValue}>{totalMeals}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Average rating</Text>
            <Text style={styles.statValue}>{averageRating} ⭐</Text>
          </View>
        </View>

        {/* Best and Worst Meals */}
        {highestRated && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🏆 Best & Worst</Text>
            <View style={styles.mealRow}>
              <Text style={styles.mealLabel}>Best meal</Text>
              <Text style={styles.mealValue}>{highestRated.nom}</Text>
              <Text style={styles.mealRating}>⭐ {highestRated.note}/5</Text>
            </View>
            {lowestRated && (
              <>
                <View style={styles.divider} />
                <View style={styles.mealRow}>
                  <Text style={styles.mealLabel}>Lowest rated meal</Text>
                  <Text style={styles.mealValue}>{lowestRated.nom}</Text>
                  <Text style={styles.mealRating}>⭐ {lowestRated.note}/5</Text>
                </View>
              </>
            )}
          </View>
        )}

        {/* Rating Distribution */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Rating Distribution</Text>
          {[5, 4, 3, 2, 1, 0].map((rating) => (
            <View key={rating} style={styles.distributionRow}>
              <Text style={styles.ratingLabel}>{rating === 0 ? 'No rating' : `${rating}⭐`}</Text>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      width: totalMeals > 0 ? `${(ratingDistribution[rating as keyof typeof ratingDistribution] / totalMeals) * 100}%` : '0%',
                    },
                  ]}
                />
              </View>
              <Text style={styles.count}>
                {ratingDistribution[rating as keyof typeof ratingDistribution]}
              </Text>
            </View>
          ))}
        </View>

        {/* Empty State */}
        {totalMeals === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No meals recorded</Text>
            <Text style={styles.emptySubtext}>Start adding meals to see your statistics</Text>
          </View>
        )}
        </ScrollView>
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
  },
  content: {
    flex: 1,
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'coral',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  mealRow: {
    paddingVertical: 15,
  },
  mealLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  mealValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  mealRating: {
    fontSize: 14,
    color: 'coral',
    fontWeight: '600',
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  ratingLabel: {
    width: 60,
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  barContainer: {
    flex: 1,
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: 'coral',
  },
  count: {
    width: 30,
    textAlign: 'right',
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
