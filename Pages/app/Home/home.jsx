import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import {
  Text,
  useTheme,
  Button,
  ScrollView,
  Box,
  HStack,
  Actionsheet,
  VStack,
  Center,
} from "native-base";
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
import { Alert, Modal } from "react-native";
import AdditionalInformation from "./AdditionalInformation";
import * as SecureStore from "expo-secure-store";
import {
  FAFH_logo,
  RecordFoodIcon,
  StepsIcon,
} from "../../../Components/customSvgIcon";
import { SafeAreaView } from "react-native-safe-area-context";

function Home({ navigation }) {
  const { colors } = useTheme();
  const { height, width } = useWindowDimensions();
  const data = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8],
  };

  // Type of food ActionSheet variables
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  // Additional Information Modal
  const [modalVisible, setModalVisible] = useState(false);
  const userFirstTime = async () => {
    const userFirstTime = JSON.parse(
      await SecureStore.getItemAsync("userFirstTime")
    );

    if (userFirstTime) {
      setModalVisible(true);
      SecureStore.deleteItemAsync("userFirstTime");
    }
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
  useEffect(() => {
    userFirstTime();
    return () => {
      console.log("unmounting");
    };
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <HStack p={2} alignItems={"center"} justifyContent={"space-around"}>
          <FAFH_logo fill={colors.primary[600]} />
          <Text fontSize={"2xl"} style={{ fontFamily: "Poppins-SemiBold" }}>
            Food Away From Home
          </Text>
        </HStack>

        {/* Daily activities cards */}
        <Box bg={"primary.30"} style={styles.dailyActivitiesContainer}>
          <HStack py={2}>
            <VStack w="55%" ml={7}>
              <Text style={styles.activitiesTitle}>Daily Activities</Text>
              <HStack w={"100%"} justifyContent={"space-between"}>
                <TouchableOpacity>
                  <StepsIcon />
                  <Text style={styles.activitiesText}>2500</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="clock"
                    size={24}
                    color={colors["warning"]["500"]}
                  />
                  <Text style={styles.activitiesText}>30</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="fire"
                    size={24}
                    color={colors["yellow"]["500"]}
                  />
                  <Text style={styles.activitiesText}>150</Text>
                </TouchableOpacity>
              </HStack>
            </VStack>
            <Center >
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
            </Center>
          </HStack>

          {/* Activities and tips container */}
          <View style={styles.activitiesAndTipsContainer}>
            {/* Tips of the day */}
            <View style={styles.tipsContainer}>
              <View style={styles.messageContainer}>
                <Text style={styles.tipsTitle}>Tip of the Day!</Text>
                <Text style={styles.tipsText}>"Drink more water"</Text>
              </View>
              <Image
                style={styles.tipsImage}
                source={require("../../../assets/images/standing.png")}
              />
              <Ionicons
                name="ios-close-circle-sharp"
                size={24}
                color={colors["warning"]["500"]}
              />
            </View>
            {/* Indicators container */}
            <VStack>
              <Box bg={"primary.50"} shadow={1} p={2} my={5} rounded="md">
                <HStack space={2} p={3} alignItems="center">
                  <MaterialCommunityIcons
                    name="clock-check-outline"
                    size={20}
                    color={colors["secondary"]["600"]}
                  />
                  <Text style={{ fontFamily: "Poppins-Regular" }} fontSize="18">
                    Active time
                  </Text>
                </HStack>
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
              </Box>
              {/* second card */}
              <Card style={styles.indicatorCard}>
                <Title style={styles.cardTitle}>
                  <Ionicons
                    name="restaurant-outline"
                    size={20}
                    color={colors["warning"]["500"]}
                  />
                  Food
                </Title>
                <Card.Content style={styles.cardContent}>
                  <View>
                    <Text>
                      <Title>0</Title> cal
                    </Text>
                  </View>
                  <View>
                    <Button
                      borderColor={colors["secondary"]["600"]}
                      borderWidth={0.5}
                      // leftIcon={
                      //   <RecordFoodIcon fill={colors["primary"]["700"]} />
                      // }
                      colorScheme="tertiary"
                      onPress={() => {
                        setActionSheetVisible(true);
                      }}
                      _text={{
                        style: { fontFamily: "Poppins-Regular" },
                        color: colors["secondary"]["600"],
                      }}
                    >
                      Record Food
                    </Button>
                  </View>
                </Card.Content>
              </Card>
              <Actionsheet
                isOpen={actionSheetVisible}
                onClose={() => {
                  setActionSheetVisible(false);
                }}
              >
                <Actionsheet.Content>
                  {["Breakfast", "Lunch", "Dinner", "Snack", "Drink"].map(
                    (item) => {
                      return (
                        <Actionsheet.Item
                          key={item}
                          onPress={() => {
                            setActionSheetVisible(false);
                            // navigate to record food screen with params
                            navigation.navigate("RecordFood", {
                              foodType: item,
                              calories: "",
                              date: "",
                              time: "",
                              location: "",
                              notes: "",
                            });
                          }}
                        >
                          {item}
                        </Actionsheet.Item>
                      );
                    }
                  )}
                </Actionsheet.Content>
              </Actionsheet>

              {/* second card */}
              <Card style={[styles.indicatorCard, { paddingBottom: 30 }]}>
                <View style={styles.cardContent}>
                  <Title style={styles.cardTitle}>
                    <Ionicons
                      name="bicycle-outline"
                      size={30}
                      color={colors["warning"]["500"]}
                    />{" "}
                    Physical activity
                  </Title>
                  <Card.Content>
                    <Button
                      borderColor={colors["secondary"]["600"]}
                      borderWidth={0.5}
                      // leftIcon={
                      //   <RecordFoodIcon fill={colors["primary"]["700"]} />
                      // }
                      colorScheme="tertiary"
                      onPress={() => {
                        Alert.alert(
                          "Physical activity",
                          "Feature coming soon !",
                          [
                            {
                              text: "Cancel",
                              style: "cancel",
                            },
                            {
                              text: "OK",
                              onPress: () => {
                                console.log("OK Pressed");
                              },
                            },
                          ],
                          { cancelable: false }
                        );
                      }}
                      _text={{
                        style: { fontFamily: "Poppins-Regular" },
                        color: colors["secondary"]["600"],
                      }}
                    >
                      View History
                    </Button>
                  </Card.Content>
                </View>
              </Card>
            </VStack>
          </View>
        </Box>
        {/* Additional Information Modal */}

        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <AdditionalInformation setShowModal={setModalVisible} />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

export default React.memo(Home);
const styles = StyleSheet.create({
  // Daily activities cards
  dailyActivitiesContainer: {
    // backgroundColor: "rgba(76, 203, 112, 0.12);",
    // padding: 30,
    marginTop: 10,
    borderRadius: 30,
  },
  innerContainer: {
    borderWidth: 0.5,
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
    borderWidth:1
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
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    height: "100%",
    borderRadius: 30,
  },
  tipsContainer: {
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
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Poppins-SemiBold",
  },
  tipsText: {
    color: "white",
    fontFamily: "Poppins-Regular",
  },

  // Indicators container (card list)

  indicatorCard: {
    backgroundColor: "#F2FFFC",
    marginBottom: 20,
    elevation: 3,
    padding: 5,
  },
  cardTitle: {
    color: "black",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    padding: 10,
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  interLight: {
    fontFamily: "Poppins-Light",
  },
});
