import React,{ useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../assets/colors/colors";

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

export default React.memo(Home);
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
});
