import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

function ForgotPassword({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Forgot Password page</Text>
    </View>
  );
}

export default ForgotPassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
