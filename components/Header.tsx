import React from "react";
import { StyleSheet, Text, View } from "react-native";

//definition du props
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
        height: 90,
        paddingTop: 40,
        backgroundColor: "coral",
        width: '100%'
    }
    ,
    title:{
        textAlign: "center",
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    }
})