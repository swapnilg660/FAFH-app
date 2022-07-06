import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/colors/colors";

function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          height: 50,
        }}
      >
        Home page
      </Text>
      <Button
        title="To Another screen"
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
      />
    </SafeAreaView>
  );
}

export default React.memo(Home);
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundDark,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
