import React from "react";
import { StyleSheet, Text, View } from "react-native";
//creation d'un props pour le component
type PropsHeader ={
    title: string;
}
//component pour le titre de l'App
const Header =({title}: PropsHeader) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};
export default Header;
const styles = StyleSheet.create({
    header:{
        height: 80,
        paddingTop: 38,
        backgroundColor: "coral"
    }
    ,
    title:{
        textAlign: "center",
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    }
})