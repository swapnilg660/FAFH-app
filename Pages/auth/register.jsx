import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

function Register({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Register page</Text>
    </View>
  );
}

export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
