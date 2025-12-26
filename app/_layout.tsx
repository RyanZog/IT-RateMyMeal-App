import { Stack } from 'expo-router';
import { MealsProvider } from '../context/MealsContext';

export default function RootLayout() {
  return (
    <MealsProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'RateMyMeal',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="add" 
          options={{ 
            title: 'Ajouter un repas',
            headerStyle: {
              backgroundColor: 'coral',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
        />
        <Stack.Screen 
          name="meal/[id]" 
          options={{ 
            title: 'Détails du plat',
            headerStyle: {
              backgroundColor: 'coral',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
        />
        <Stack.Screen 
          name="edit/[id]" 
          options={{ 
            title: 'Modifier le repas',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
        />
      </Stack>
    </MealsProvider>
  );
}
