import React, { createContext, ReactNode, useContext, useState } from "react";
import { ImageRequireSource } from "react-native";

export type Meal = {
  id: number;
  nom: string;
  note: number;
  image?: ImageRequireSource | string; // L'image peut etre une source require ou une URL
};

//definition du type du contexte
type MealsContextType = {
  meals: Meal[];
  addMeal: (nom: string, note: number) => void;
  deleteMeal?: (id: number) => void;
};

//le chef d'orchestre pour gerer les repas
const MealsContext = createContext<MealsContextType | undefined>(undefined); // contexte initialement indefini

//je dois gerer l'etat des repas notamment les images pour les ajouts et suppresions
export function MealsProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: 1,
      nom: "Pizza",
      note: 4.5,
      image: require("../assets/meal/PizzaMargherita.jpg"),
    },
    {
      id: 2,
      nom: "Pasta",
      note: 4.0,
      image: require("../assets/meal/Pasta.jpg"),
    },
    {
      id: 3,
      nom: "Salad",
      note: 3.5,
      image: require("../assets/meal/salad.jpg"),
    },
  ]);

  const addMeal = (nom: string, note: number) => {
    const newMeal: Meal = {
      id: Date.now(),
      nom,
      note,
    };
    // mise a jour de l'etat des repas en ajoutant le nouveau repas avec le spread operator
    setMeals((prev) => [...prev, newMeal]);
  };

  const deleteMeal = (id: number) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    //fournir le contexte aux composants enfants
    <MealsContext.Provider value={{ meals, addMeal, deleteMeal }}>
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
