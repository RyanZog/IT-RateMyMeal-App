import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type PropsMeal = {
  id: number;
  name: string;
  note: number;
  imageUrl?: string;
};

const MealCard = ({ id, name, note, imageUrl }: PropsMeal) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({ pathname: "/meal/[id]", params: { id } });
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
      {!imageUrl && (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>📷</Text>
        </View>
      )}
      <Text style={styles.text}>Nom: {name}</Text>
      <Text style={styles.text}>Note: {note}/5</Text>
      <Text style={styles.tapHint}>👆 Appuyer pour voir les détails</Text>
    </Pressable>
  );


};

export default MealCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  placeholderImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 48,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
  tapHint: {
    fontSize: 12,
    color: "coral",
    textAlign: "center",
    marginTop: 10,
    fontStyle: "italic",
  },
});
