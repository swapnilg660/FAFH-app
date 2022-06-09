import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

function ForgotPassword({ navigation }) {
  return (
    < >
      <SafeAreaView style={styles.container}>
        <Text>Forgot Password page</Text>
      </SafeAreaView>
    </>
  );
}

export default React.memo(ForgotPassword);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
