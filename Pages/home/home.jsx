import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../assets/colors/colors";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { useWindowDimensions } from "react-native";

function Home({ navigation }) {
  const { height, width } = useWindowDimensions();
  const data = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8],
  };
  const chartConfig = {
    fillShadowGradientFrom: "#FFEC19",
    fillShadowGradientFromOpacity: 0.5,
    fillShadowGradientTo: "#FFEC19",
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.0,
    color: (opacity) => `rgba(255, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.9,
    // useShadowColorFromDataset: false, // optional
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* home title */}
      <View style={styles.headerContainer}>
        <Image
          style={styles.headerImage}
          source={require("../../assets/images/FAFH_Logo.png")}
        />
        <Text style={styles.headerTitle}>Food away from home</Text>
      </View>

      {/* Daily activities cards */}
      <View style={styles.dailyActivitiesContainer}>
        <View style={styles.cardContent}>
          <View style={styles.innerContainer}>
            <Text style={styles.activitiesTitle}>Daily Activities</Text>
            <View style={styles.activitiesDetails}>
              <TouchableOpacity>
                <Image
                  style={styles.activitiesImage}
                  source={require("../../assets/images/steps.png")}
                />
                <Text style={styles.activitiesText}>2500</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="clock"
                  size={24}
                  color={colors.warningDark}
                />
                <Text style={styles.activitiesText}>30</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="fire"
                  size={24}
                  color={colors.warningLight}
                />
                <Text style={styles.activitiesText}>150</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ position: "relative" }}>
            <ProgressChart
              data={data}
              width={width * 0.4}
              height={height * 0.15}
              strokeWidth={6}
              radius={18}
              chartConfig={chartConfig}
              hideLegend={true}
              barPercentage={0}
            />
          </View>
        </View>

        {/* Activities and tips container */}
        <View style={styles.activitiesAndTipsContainer}>
          {/* Tips of the day */}
          <View style={styles.tipsConatiner}>
            <View style={styles.messageContainer}>
              <Text style={styles.tipsTitle}>Tip of the Day!</Text>
              <Text style={styles.tipsText}>"Drink more water"</Text>
            </View>
            <Image
              style={styles.tipsImage}
              source={require("../../assets/images/standing.png")}
            />
            <Ionicons
              name="ios-close-circle-sharp"
              size={24}
              color={colors.warningDark}
            />
          </View>
          {/* Indicators container */}
          <View style={styles.indicatorsContainer}>
            <Card style={styles.indicatorCard}>
              <Title style={styles.cardTitle}>
                <MaterialCommunityIcons
                  name="clock-check-outline"
                  size={20}
                  color={colors.warningDark}
                />{" "}
                Active time
              </Title>
              <Card.Content style={styles.cardContent}>
                <View>
                  <Text style={styles.interLight}>
                    <Title>30</Title>/60mins
                  </Text>
                </View>
                <View>
                  <Text style={styles.interLight}>
                    1234 kcal <Title>|</Title> 1.56 km
                  </Text>
                </View>
              </Card.Content>
            </Card>
            {/* second card */}
            <Card style={styles.indicatorCard}>
              <Title style={styles.cardTitle}>
                <Ionicons
                  name="restaurant-outline"
                  size={20}
                  color={colors.warningDark}
                />{" "}
                Food
              </Title>
              <Card.Content style={styles.cardContent}>
                <View>
                  <Text>
                    <Title>0</Title> cal
                  </Text>
                </View>
                <View>
                  <TouchableOpacity style={styles.homeButtons}>
                    <Text style={styles.homeButtonsText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
            {/* second card */}
            <Card style={[styles.indicatorCard, { paddingBottom: 30 }]}>
              <View style={styles.cardContent}>
                <Title style={styles.cardTitle}>
                  <Ionicons
                    name="bicycle-outline"
                    size={30}
                    color={colors.warningDark}
                  />{" "}
                  Physical activity
                </Title>
                <Card.Content>
                  <TouchableOpacity style={styles.homeButtons}>
                    <Text style={styles.homeButtonsText}>View history</Text>
                  </TouchableOpacity>
                </Card.Content>
              </View>
            </Card>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default React.memo(Home);
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundDark,
    flex: 1,
  },

  // logo and name conainer
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
  headerImage: {
    width: 45,
    height: 65,
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
  },

  // Daily activities cards
  dailyActivitiesContainer: {
    backgroundColor: "rgba(76, 203, 112, 0.12);",
    // padding: 30,
    marginTop: 10,
    borderRadius: 30,
  },
  innerContainer: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // marginTop: 20,
    padding: 0,
    width: "60%",
    paddingTop: 0,
    paddingLeft: 30,
  },
  activitiesDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  activitiesTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    marginBottom: 20,
  },
  activitiesImage: {
    width: 24,
    height: 24,
  },
  activitiesText: {
    // fontSize: 18,
    fontWeight: "600",
    marginTop: 5,
    fontFamily: "Poppins-SemiBold",
  },
  diagramContainer: {},

  // Activities and tips container
  activitiesAndTipsContainer: {
    backgroundColor: "rgba(228, 224, 224, 0.7)",
    width: "100%",
    padding: 20,
    height: "100%",
    borderRadius: 30,
  },
  tipsConatiner: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#289B7C",
    padding: 18,
    borderRadius: 30,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  messageContainer: {
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  tipsTitle: {
    color: colors["textLight"],
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Poppins-SemiBold",
  },
  tipsText: {
    color: colors["textLight"],
    fontFamily: "Poppins-Regular",
  },

  // Indicators container (card list)
  indicatorsContainer: {
    marginTop: 20,
  },
  indicatorCard: {
    backgroundColor: "#F2FFFC",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 5,
  },
  cardTitle: {
    color: colors.text,
    fontFamily: "Inter-ExtraLight",
    fontSize: 16,
    padding: 10,
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  homeButtons: {
    width: 113,
    backgroundColor: "#FBFBFB",
    padding: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  homeButtonsText: {
    color: "rgba(102, 101, 101, 0.8)",
    fontFamily: "Inter-Regular",
  },
  interLight: {
    fontFamily: "Inter-Light",
  },
});
