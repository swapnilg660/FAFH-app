import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../../assets/colors/colors";
import {SafeAreaView} from "react-native-safe-area-context";

function Profile({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          height: 50,
        }}
      >
        Profile page
        <Pressable
          onPress={() => {
            console.log("Profile");
            navigation.toggleDrawer();
          }}
        >
          <Text>We are here for now</Text>
        </Pressable>
      </Text>
    </SafeAreaView>
  );
}

export default React.memo(Profile);
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
  },
});
