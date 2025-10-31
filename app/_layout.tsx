import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'RateMyMeal',
          headerShown: false 
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
    </Stack>
  );
}
