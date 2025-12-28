import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { PLACEHOLDER_IMAGE_URL } from "../lib/database";

type PropsMeal = {
  id: number;
  name: string;
  note: number;
  imageUrl?: string;
};

const MealCard = ({ id, name, note, imageUrl }: PropsMeal) => {
  const router = useRouter();
  const isPlaceholder = !imageUrl || imageUrl === PLACEHOLDER_IMAGE_URL;

  const handlePress = () => {
    router.push({ pathname: "/meal/[id]", params: { id } });
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.imageWrapper}>
        {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} />}
        {!imageUrl && (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>📷</Text>
          </View>
        )}
        {isPlaceholder && (
          <View style={styles.nophotobadge}>
            <Text style={styles.badgeText}>⚠️ No photo</Text>
          </View>
        )}
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.text} numberOfLines={1}>🍽️ {name}</Text>
        <Text style={styles.rating}>⭐ {note}/5</Text>
        <Text style={styles.tapHint}>👆 Details</Text>
      </View>
    </Pressable>
  );
};

export default MealCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#f0f0f0",
  },
  placeholderImage: {
    width: "100%",
    height: 180,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  placeholderText: {
    fontSize: 48,
    opacity: 0.5,
  },
  nophotobadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 152, 0, 0.9)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    zIndex: 10,
  },
  badgeText: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },
  textContainer: {
    padding: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  rating: {
    fontSize: 14,
    color: "#FF9800",
    marginTop: 4,
    fontWeight: "500",
  },
  tapHint: {
    fontSize: 11,
    color: "#999",
    marginTop: 6,
    fontStyle: "italic",
  },
});
