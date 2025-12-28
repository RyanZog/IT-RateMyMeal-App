import { Stack } from 'expo-router';
import { MealsProvider } from '../context/MealsContext';

export default function RootLayout() {
  return (
    <MealsProvider>
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="meal/[id]" 
          options={{ 
            title: 'Meal Details',
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
            title: 'Edit Meal',
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
