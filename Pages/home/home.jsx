import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/colors/colors";

function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* home title */}
      <View>
          <Image style={styles.headerImage} source={require("../../assets/images/FAFH_Logo.png")} />
          <Text style={styles.title}>Food away from home</Text>
      </View>

      {/* Daily activities cards */}
      <View style={styles.dailyActivitiesContainer}>


      </View>
      
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  headerImage: {
    width: 50,
    height: 71,
  },
  headerTitle: {},

  // Daily activities cards
  dailyActivitiesContainer: {},

});
