import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          height: 50,
        }}
      >
        Home page
      </Text>
    </View>
  );
}

export default Home;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
});
