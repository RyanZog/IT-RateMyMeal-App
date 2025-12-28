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

//definition du type du contexte
type MealsContextType = {
  meals: Meal[];
  addMeal: (nom: string, note: number) => Promise<void>;
  deleteMeal: (id: number) => Promise<void>;
  updateMeal: (id: number, nom: string, note: number) => Promise<void>;
  clearAllMeals: () => Promise<void>;
  isLoading: boolean;
};

//le chef d'orchestre pour gerer les repas
const MealsContext = createContext<MealsContextType | undefined>(undefined);

//je dois gerer l'etat des repas notamment les images pour les ajouts et suppresions
export function MealsProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialise la BD et charge les données au démarrage
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        // Initialise la base de données
        await initializeDatabase();

        // Charge tous les repas depuis la BD
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

  const addMeal = async (nom: string, note: number) => {
    try {
      // Vérifie si un repas avec le même nom existe déjà (case-insensitive)
      const isDuplicate = meals.some(
        meal => meal.nom.toLowerCase() === nom.toLowerCase()
      );
      
      if (isDuplicate) {
        throw new Error(`Un repas nommé "${nom}" existe déjà!`);
      }

      setIsLoading(true);
      
      // Ajoute à la BD
      const id = await addMealToDb(nom, note);
      
      if (id) {
        // Ajoute aussi à l'état React pour mise à jour immédiate
        const newMeal: Meal = {
          id: id as number,
          nom,
          note,
        };
        setMeals((prev) => [...prev, newMeal]);
      }
    } catch (error) {
      console.error('Error adding meal:', error);
      throw error; // Relance l'erreur pour le formulaire
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMeal = async (id: number) => {
    try {
      setIsLoading(true);
      
      // Supprime de la BD
      const success = await deleteMealFromDb(id);
      
      if (success) {
        // Supprime aussi de l'état React
        setMeals((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (error) {
      console.error('Error deleting meal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMeal = async (id: number, nom: string, note: number) => {
    try {
      // Vérifie si un autre repas a le même nom
      const isDuplicate = meals.some(
        meal => meal.id !== id && meal.nom.toLowerCase() === nom.toLowerCase()
      );
      
      if (isDuplicate) {
        throw new Error(`Un autre repas nommé "${nom}" existe déjà!`);
      }

      setIsLoading(true);
      
      // Met à jour dans la BD
      const success = await updateMealInDb(id, nom, note);
      
      if (success) {
        // Met à jour aussi dans l'état React
        setMeals((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, nom, note } : m
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
      
      // Vide complètement la BD
      await deleteAllMeals();
      
      // Vide aussi l'état React
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

//hook personnalise pour acceder au contexte des repas
export function useMeals() {
  const context = useContext(MealsContext);
  // s'assure que le contexte est utilise dans le provider
  if (!context) throw new Error("useMeals must be used within MealsProvider");
  return context;
}
