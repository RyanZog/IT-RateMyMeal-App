import { openDatabaseAsync } from 'expo-sqlite';

// Image placeholder par défaut pour les repas sans photo
export const PLACEHOLDER_IMAGE_URL = 'https://via.placeholder.com/400x300/FFD700/333?text=Aucune+photo';

let db: any = null;

/**
 * Initialise la base de donnees
 * A appeler une seule fois au démarrage
 */
export async function initializeDatabase() {
  if (!db) {
    db = await openDatabaseAsync('rate-my-meal.db');
  }

  // Cree la table si elle n'existe pas
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS meals (
      id INTEGER PRIMARY KEY NOT NULL,
      nom TEXT NOT NULL,
      note REAL NOT NULL,
      imageUrl TEXT NOT NULL DEFAULT '${PLACEHOLDER_IMAGE_URL}'
    );
  `);
  
  // Migration: ajouter la colonne imageUrl si elle n'existe pas (pour les anciennes donnees)
  try {
    await db.execAsync(`
      ALTER TABLE meals ADD COLUMN imageUrl TEXT NOT NULL DEFAULT '${PLACEHOLDER_IMAGE_URL}';
    `);
  } catch (error) {
    // La colonne existe deja, pas d'erreur
  }
  
  console.log('✅ Database initialized successfully');
}

/**
 * Récupère tous les repas de la base de données
 */
export async function getAllMeals(): Promise<any[]> {
  if (!db) await initializeDatabase();
  
  try {
    const meals = await db.getAllAsync('SELECT * FROM meals ORDER BY id DESC');
    console.log(`✅ Fetched ${meals.length} meals`);
    return meals || [];
  } catch (error) {
    console.error('❌ Error fetching meals:', error);
    throw error;
  }
}

/**
 * Récupère un repas spécifique par son ID
 */
export async function getMealById(id: number): Promise<any> {
  if (!db) await initializeDatabase();
  
  try {
    const meal = await db.getFirstAsync('SELECT * FROM meals WHERE id = ?', [id]);
    console.log(`✅ Fetched meal ${id}:`, meal);
    return meal || null;
  } catch (error) {
    console.error('❌ Error fetching meal:', error);
    throw error;
  }
}

/**
 * Ajoute un nouveau repas a la base de donnees
 * @param nom - Nom du repas
 * @param note - Note du repas (0-5)
 * @param imageUrl - URL de l'image (optionnel, utilise placeholder par defaut)
 * @returns L'ID du repas insere ou null en cas d'erreur
 */
export async function addMeal(
  nom: string,
  note: number,
  imageUrl?: string
): Promise<number | null> {
  if (!db) await initializeDatabase();
  
  try {
    const result = await db.runAsync(
      'INSERT INTO meals (nom, note, imageUrl) VALUES (?, ?, ?)',
      [nom, note, imageUrl || PLACEHOLDER_IMAGE_URL]
    );
    console.log(`✅ Meal added with ID: ${result.lastInsertRowId}`);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('❌ Error adding meal:', error);
    throw error;
  }
}

/**
 * Met à jour un repas existant
 */
export async function updateMeal(
  id: number,
  nom: string,
  note: number,
  imageUrl?: string
): Promise<boolean> {
  if (!db) await initializeDatabase();
  
  try {
    const result = await db.runAsync(
      'UPDATE meals SET nom = ?, note = ?, imageUrl = ? WHERE id = ?',
      [nom, note, imageUrl || null, id]
    );
    console.log(`✅ Meal ${id} updated (${result.changes} rows changed)`);
    return result.changes > 0;
  } catch (error) {
    console.error('❌ Error updating meal:', error);
    throw error;
  }
}

/**
 * Supprime un repas par son ID
 */
export async function deleteMeal(id: number): Promise<boolean> {
  if (!db) await initializeDatabase();
  
  try {
    const result = await db.runAsync('DELETE FROM meals WHERE id = ?', [id]);
    console.log(`✅ Meal ${id} deleted (${result.changes} rows deleted)`);
    return result.changes > 0;
  } catch (error) {
    console.error('❌ Error deleting meal:', error);
    throw error;
  }
}

/**
 * Vide complètement la table meals
 */
export async function deleteAllMeals(): Promise<boolean> {
  if (!db) await initializeDatabase();
  
  try {
    const result = await db.runAsync('DELETE FROM meals');
    console.log(`✅ All meals deleted (${result.changes} rows deleted)`);
    return result.changes > 0;
  } catch (error) {
    console.error('❌ Error deleting all meals:', error);
    throw error;
  }
}

/**
 * Retourne des statistiques sur la base de donneaes
 */
export async function getDatabaseStats(): Promise<{ totalMeals: number; avgRating: number }> {
  if (!db) await initializeDatabase();
  
  try {
    const stats = await db.getFirstAsync(
      'SELECT COUNT(*) as count, AVG(note) as avgRating FROM meals'
    );
    console.log('✅ Database stats:', stats);
    return {
      totalMeals: stats?.count || 0,
      avgRating: stats?.avgRating || 0
    };
  } catch (error) {
    console.error('❌ Error getting stats:', error);
    throw error;
  }
}
