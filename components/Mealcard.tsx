import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
type PropsMeal = {
    name: string,
    note: number,
    image: string 
};
const MealCard =({name,note,image}: PropsMeal) =>{ 
    return(
        <View style={styles.card}>
           <Image style={styles.image}
              source={image}
           />
           <Text>Nom:{name}</Text>
           <Text>Note:{note}</Text>
        </View>
    );
}
export default MealCard;
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
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
        borderRadius: 10
    },
    text: {
        fontSize: 16,
        marginTop: 10
    }
});