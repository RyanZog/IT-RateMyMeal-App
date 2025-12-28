import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  addMeal as addMealToDb,
  deleteAllMeals,
  deleteMeal as deleteMealFromDb,
  getAllMeals,
  initializeDatabase,
  updateMeal as updateMealInDb
} from "../lib/database";

export type Meal = {
  id: number;
  nom: string;
  note: number;
  imageUrl?: string;
};

// Context type definition
type MealsContextType = {
  meals: Meal[];
  addMeal: (nom: string, note: number, imageUrl?: string) => Promise<void>;
  deleteMeal: (id: number) => Promise<void>;
  updateMeal: (id: number, nom: string, note: number, imageUrl?: string) => Promise<void>;
  clearAllMeals: () => Promise<void>;
  isLoading: boolean;
};

// Context manager for meals
const MealsContext = createContext<MealsContextType | undefined>(undefined);

// Manage meal state and images
export function MealsProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize database and load data on startup
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        // Initialize database
        await initializeDatabase();

        // Load all meals from database
        const mealsFromDb = await getAllMeals();
        setMeals(mealsFromDb as Meal[]);
      } catch (error) {
        console.error('Error setting up database:', error);
        setMeals([]);
      } finally {
        setIsLoading(false);
      }
    };

    setupDatabase();
  }, []);

  const addMeal = async (nom: string, note: number, imageUrl?: string) => {
    try {
      // Check if a meal with the same name already exists (case-insensitive)
      const isDuplicate = meals.some(
        meal => meal.nom.toLowerCase() === nom.toLowerCase()
      );
      
      if (isDuplicate) {
        throw new Error(`A meal named "${nom}" already exists!`);
      }

      setIsLoading(true);
      
      // Add to database
      const id = await addMealToDb(nom, note, imageUrl);
      
      if (id) {
        // Also add to React state for immediate update
        const newMeal: Meal = {
          id: id as number,
          nom,
          note,
          imageUrl,
        };
        setMeals((prev) => [...prev, newMeal]);
      }
    } catch (error) {
      console.error('Error adding meal:', error);
      throw error; // Re-throw error for the form
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMeal = async (id: number) => {
    try {
      setIsLoading(true);
      
      // Delete from database
      const success = await deleteMealFromDb(id);
      
      if (success) {
        // Also delete from React state
        setMeals((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (error) {
      console.error('Error deleting meal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMeal = async (id: number, nom: string, note: number, imageUrl?: string) => {
    try {
      // Check if another meal has the same name
      const isDuplicate = meals.some(
        meal => meal.id !== id && meal.nom.toLowerCase() === nom.toLowerCase()
      );
      
      if (isDuplicate) {
        throw new Error(`Another meal named "${nom}" already exists!`);
      }

      setIsLoading(true);
      
      // Update in database
      const success = await updateMealInDb(id, nom, note, imageUrl);
      
      if (success) {
        // Also update in React state
        setMeals((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, nom, note, imageUrl } : m
          )
        );
      }
    } catch (error) {
      console.error('Error updating meal:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearAllMeals = async () => {
    try {
      setIsLoading(true);
      
      // Completely empty the database
      await deleteAllMeals();
      
      // Also empty the React state
      setMeals([]);
    } catch (error) {
      console.error('Error clearing all meals:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MealsContext.Provider value={{ meals, addMeal, deleteMeal, updateMeal, clearAllMeals, isLoading }}>
      {children}
    </MealsContext.Provider>
  );
}

// Custom hook to access meal context
export function useMeals() {
  const context = useContext(MealsContext);
  // Ensure context is used within the provider
  if (!context) throw new Error("useMeals must be used within MealsProvider");
  return context;
}
