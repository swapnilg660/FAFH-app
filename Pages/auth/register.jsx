import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, SafeAreaView } from "react-native";

function Register({ navigation }) {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text>Register page</Text>
        <Text>Remember me ?</Text>
      </SafeAreaView>
    </>
  );
}

export default React.memo(Register);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
