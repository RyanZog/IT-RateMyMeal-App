# 📱 RateMyMeal - Guide du Projet Complet

**Dernière mise à jour :** 18 décembre 2025  
**Langue :** Français

---

## 🎯 **VISION DU PROJET**

RateMyMeal est une application mobile **journal personnel de repas**. L'utilisateur peut :
- 📸 Prendre ou importer des photos de plats
- 📝 Donner un nom et une note (0-5) à chaque plat
- 💾 Sauvegarder dans une base de données locale
- 👀 Consulter l'historique de tous ses repas
- 🗑️ Supprimer des repas

---

## 🏗️ **ARCHITECTURE GÉNÉRALE**

### Structure du Projet
```
app/
├── _layout.tsx          # Navigation Stack + MealsProvider
├── index.tsx            # Écran d'accueil (liste des repas)
├── add.tsx              # Écran d'ajout de repas
└── meal/
    └── [id].tsx         # Écran de détail d'un repas

components/
├── Header.tsx           # Titre personnalisé
├── Mealcard.tsx         # Carte d'un repas
└── AddMealForm.tsx      # Formulaire (optionnel, peut être dans add.tsx)

context/
└── MealsContext.tsx     # État global + base de données

assets/
└── meal/                # Images statiques

PROJECT_GUIDE.md         # Ce fichier
```

### Communication Composants
```
_layout.tsx (MealsProvider enveloppe tout)
    ↓
Tous les composants ont accès à useMeals()
    ↓
État centralisé dans MealsContext
    ↓
Modifications mises à jour partout automatiquement
```

---

## 📊 **LES MILESTONES**

### ✅ **Milestone 1 : Interface Statique** 
**État :** COMPLÉTÉ

- [x] Composant Header
- [x] Composant MealCard
- [x] Écran index avec 3 plats de démonstration

**Fichiers concernés :** `components/Header.tsx`, `components/Mealcard.tsx`, `app/index.tsx`

---

### ✅ **Milestone 2 : Interactivité de Base**
**État :** COMPLÉTÉ

- [x] Formulaire d'ajout fonctionnel
- [x] Communication parent/enfant via props
- [x] État centralisé
- [x] Affichage avec FlatList optimisée

**Fichiers concernés :** `context/MealsContext.tsx`, `app/add.tsx`, `components/AddMealForm.tsx`

---

### ✅ **Milestone 3 : Navigation Multi-écrans**
**État :** COMPLÉTÉ

- [x] Stack Navigation avec Expo Router
- [x] Écran de détail avec paramètres d'URL
- [x] Navigation cliquable (MealCard → détail)
- [x] Bouton retour automatique
- [x] État global partagé entre écrans

**Fichiers concernés :** `app/_layout.tsx`, `app/meal/[id].tsx`, `components/Mealcard.tsx`

---

### 🔄 **Milestone 4 : Persistance des Données**
**État :** EN ATTENTE

**Concepts :** SQLite local, useEffect, gestion du cycle de vie

**À faire :**
1. Installer et configurer `expo-sqlite/next`
2. Initialiser la base de données au démarrage
3. Créer la table `meals (id INTEGER PRIMARY KEY, nom TEXT, note REAL, imageUri TEXT)`
4. Modifier MealsContext pour :
   - Charger les données depuis la DB au démarrage (useEffect)
   - Sauvegarder les plats dans la DB lors de l'ajout
5. Ajouter un bouton "Supprimer" sur l'écran de détail

**Progression :** [ ] Not Started

---

### 🔄 **Milestone 5 : Capture d'Images**
**État :** EN ATTENTE

**Concepts :** expo-image-picker, gestion des permissions, stockage local

**À faire :**
1. Installer `expo-image-picker`
2. Mettre à jour le type `Meal` pour gérer les images correctement
3. Ajouter un bouton "Prendre une photo" dans l'écran d'ajout
4. Gérer les permissions (caméra + galerie)
5. Stocker l'URI de l'image dans la base de données
6. Afficher l'image dans MealCard et le détail

**Note :** Pour maintenant, laisser `image?: any`. On raffinera au Milestone 5.

**Progression :** [ ] Not Started

---

### 🔄 **Milestone 6 : Build et Distribution**
**État :** EN ATTENTE

**Concepts :** EAS Build, génération APK/IPA, installation physique

**À faire :**
1. Configurer le projet avec `eas build:configure`
2. Générer un APK avec `eas build --platform android`
3. Installer sur un téléphone physique
4. Tester en conditions réelles

**Progression :** [ ] Not Started

---

## 🛠️ **NOTRE MÉTHODE DE TRAVAIL**

### Vous me demandez...
```
"Peux-tu m'aider à [tâche spécifique] ?"
```

### Je vais répondre comme un **superviseur/camarade** :

1. **Comprendre le problème** → Je lis le code/contexte
2. **Expliquer clairement** → Avant de coder, j'explique le "pourquoi"
3. **Progresser étape par étape** → Pas de tout faire d'un coup
4. **Vous laisser programmer** → Je vous guide, je ne code que si nécessaire
5. **Valider ensemble** → On teste et on s'assure que c'est bon

### Nos principes :

- ✅ **Étape par étape** → Un concept à la fois
- ✅ **Clarté avant code** → Comprendre avant implémenter
- ✅ **Votre progression** → Je vous pousse à réfléchir
- ✅ **Documentation** → On documente le code
- ✅ **Tests** → On teste chaque changement

---

## 📝 **LES PROMPTS À UTILISER**

### Pour demander de l'aide sur un Milestone :
```
"Je veux progresser sur le Milestone [numéro]. 
Peux-tu m'expliquer étape par étape ce qu'il faut faire ?"
```

### Pour un problème spécifique :
```
"J'ai un problème avec [composant].
Peux-tu m'aider à déboguer ? Voici le problème : [description]"
```

### Pour expliquer un concept :
```
"Je ne comprends pas [concept].
Peux-tu m'l'expliquer simplement ?"
```

### Pour une fonctionnalité :
```
"Je veux ajouter [fonctionnalité].
Comment je dois m'y prendre ?"
```

### Pour validation :
```
"J'ai implémenté [truc]. Est-ce bon ? Ça fonctionne bien ?"
```

### Pour une révision complète :
```
"Fais-moi une révision du Milestone [numéro].
Qu'est-ce qui fonctionne bien ? Qu'est-ce qui pourrait s'améliorer ?"
```

---

## 📋 **CRITÈRES DE SUCCÈS**

### Par Milestone :

#### Milestone 1 ✅
- [ ] Header visible avec titre
- [ ] 3 MealCards affichées
- [ ] Images locales présentes
- [ ] Styles appliqués correctement

#### Milestone 2 ✅
- [ ] Formulaire d'ajout fonctionnel
- [ ] Plat ajouté apparaît dans la liste
- [ ] Validation des données (note 0-5)
- [ ] Champs réinitialisés après ajout

#### Milestone 3 ✅
- [ ] Clic sur carte → navigation vers détail
- [ ] Écran de détail affiche les bonnes infos
- [ ] Bouton retour fonctionne
- [ ] Plats ajoutés aparaissent dans le détail

#### Milestone 4 🔄
- [ ] Base de données créée et initialisée
- [ ] Plats chargés depuis DB au démarrage
- [ ] Nouvel ajout sauvegardé en DB
- [ ] Bouton supprimer fonctionne
- [ ] Données persistent après fermeture/réouverture

#### Milestone 5 🔄
- [ ] Bouton "Prendre une photo" présent
- [ ] Permissions gérées correctement
- [ ] Photo prise et sauvegardée
- [ ] Image affichée dans card et détail
- [ ] Données persistent en DB

#### Milestone 6 🔄
- [ ] Configuration EAS complétée
- [ ] Build Android généré
- [ ] APK installé sur téléphone
- [ ] Toutes les fonctionnalités marchent sur le téléphone

---

## 🔍 **POINTS D'ATTENTION**

### Images (Milestone 5)
**À NE PAS faire maintenant :** Toucher au système d'images complètement  
**À faire pour l'instant :** Laisser `image?: any` et continuer  
**À faire au M5 :** Utiliser `expo-image-picker` et définir le type correctement

### Base de données (Milestone 4)
**À vérifier :**
- Les migrations de DB si on change le schéma
- La synchronisation entre l'état React et la DB
- Les erreurs SQL (créer la table qu'une fois)

### Navigation (Milestone 3)
**À vérifier :**
- Les paramètres passent correctement
- Le bouton retour ne crée pas de doubles écrans
- Le contexte est accessible partout

---

## 📞 **COMMENT COMMUNIQUER**

### Avant chaque Milestone :
Vous : "Je veux faire le Milestone [X]. C'est quoi les étapes ?"  
Moi : Je vous explique simplement, étape par étape

### Pendant le Milestone :
Vous : "J'ai fait la step 1, ça marche. Et la step 2, comment ?"  
Moi : Je vous explique la suivante

### Après le Milestone :
Vous : "J'ai fini le Milestone [X]. C'est bon ?"  
Moi : Je valide, je signale les améliorations possibles

### En cas de bug :
Vous : "Ça ne marche pas quand je..."  
Moi : Je vous aide à déboguer ensemble

---

## 🎓 **CE QUE VOUS APPRENEZ**

Par Milestone, vous maîtrisez :

- **M1-2 :** React, composants, état, communication
- **M3 :** Navigation, Expo Router, paramètres d'URL
- **M4 :** Bases de données, SQLite, persistence
- **M5 :** Permissions natives, appareil photo
- **M6 :** Build et distribution

---

## 📦 **DÉPENDANCES CLÉS**

```json
{
  "expo-router": "Pour la navigation",
  "expo-sqlite": "Pour la base de données (Milestone 4)",
  "expo-image-picker": "Pour l'appareil photo (Milestone 5)",
  "react-native": "Framework de base"
}
```

---

## ✨ **PROCHAINES ÉTAPES**

1. ✅ Vérifier que M1-3 fonctionne bien
2. 🔄 Préparation Milestone 4 (SQLite)
3. 🔄 Préparation Milestone 5 (Images)
4. 🔄 Préparation Milestone 6 (Build)

---

**Vous êtes prêt pour le Milestone 4 ? Dites-moi ! 🚀**
