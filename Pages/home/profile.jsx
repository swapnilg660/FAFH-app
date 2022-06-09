import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../../assets/colors/colors";

function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          height: 50,
        }}
      >
        Profile page
        <Pressable
          onPress={() => {
            console.log("Profile")
          }}
        >
          <Text>We are here for now</Text>
        </Pressable>
      </Text>
    </View>
  );
}

export default React.memo(Profile);
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
  },
});
