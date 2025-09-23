import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
export default function Index() {
  return (
    <View style={styles.container}>
      <Header title="RateMyMeal"/>
      <Text>Bienvenue sur RateMyMeal</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
})