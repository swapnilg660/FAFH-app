import {
  Box,
  Button,
  ScrollView,
  VStack,
  Text,
  HStack,
  Center,
} from "native-base";
import React, { useState, useEffect, useContext } from "react";
// import styles from "react-native-animated-input/src/AnimatedInput/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "../../../hooks/context";
import {
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { Platform, StyleSheet, View } from "react-native";
// import colors from assets/colors/colors.js
import { useTheme } from "native-base";
import { Avatar } from "react-native-paper";
import { Card, Title, Paragraph } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { WeightIcon } from "../../../Components/customSvgIcon";
import { getUser } from "../../../services/mongoDB/users";

function Profile({ navigation }) {
  const { signOut, userToken } = useContext(AuthContext);
  const { colors } = useTheme();
  const [user, setUser] = useState({});

  const getuserData = async () => {
    await getUser()
      .then((res) => {
        console.log("userData:", res);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getuserData();
  }, []);

  return (
    <>
      {Platform.OS === "ios" && (
        <SafeAreaView
          style={{ backgroundColor: colors["primary"]["600"] }}
        ></SafeAreaView>
      )}
      <ScrollView background={"primary.600"} flex={1} pt={1}>
        <VStack space="5" m={0}>
          <HStack
            alignItems={"center"}
            m={"20px"}
            mb={"80px"}
            justifyContent={"space-between"}
          >
            <Text
              style={{ fontFamily: "Poppins-SemiBold" }}
              color={"white"}
              fontSize="20"
            >
              Hi, {user?.fullName?.split(" ")[0]}
            </Text>
            <MaterialIcons
              name="more-vert"
              size={25}
              color={colors["light"]["100"]}
            />
          </HStack>

          {/* secondary container */}

          <VStack bg={"white"} height="full" p={2} borderTopRadius="3xl">
            <View style={styles.avatarContainer}>
              <Avatar.Image
                size={120}
                source={require("../../../assets/images/profile.png")}
                style={styles.profileAvatar}
              />
            </View>
            {/* First card */}
            <HStack
              justifyContent={"space-between"}
              alignItems={"flex-start"}
              p={5}
              bg={"primary.50"}
              shadow={2}
              rounded={"lg"}
              mb={5}
            >
              <Center>
                <MaterialCommunityIcons
                  name="card-account-details-outline"
                  size={24}
                  color={colors["secondary"]["500"]}
                />
              </Center>
              <Box style={{ width: "50%" }}>
                <Text style={{ fontFamily: "Poppins-ExtraLight" }}>
                  Full name
                </Text>
                <Text style={{ fontFamily: "Poppins-Medium" }}>
                  {user?.fullName}
                </Text>
              </Box>
              <VStack alignItems={"flex-end"}>
                <Text style={{ fontFamily: "Poppins-Regular" }}>
                  {user?.dateOfBirth}
                </Text>
                <Foundation
                  name="female-symbol"
                  size={24}
                  color={colors["secondary"]["500"]}
                />
              </VStack>
            </HStack>

            {/* second card */}
            <HStack
              justifyContent={"space-between"}
              alignItems={"flex-start"}
              p={5}
              bg={"primary.50"}
              shadow={2}
              rounded={"lg"}
              mb={5}
            >
              <Center>
                <MaterialCommunityIcons
                  name="phone"
                  size={24}
                  color={colors["secondary"]["500"]}
                />
              </Center>
              <Box /* style={{ width: "50%" }} */>
                <Text style={{ fontFamily: "Poppins-ExtraLight" }}>
                  Contact
                </Text>
                <Text style={{ fontFamily: "Poppins-Medium" }}>
                  {user?.phoneNumber}
                </Text>
              </Box>
              <VStack alignItems={"flex-end"}>
                <Text style={{ fontFamily: "Poppins-Regular" }}>
                  {user?.email}
                </Text>
                <Feather
                  name="mail"
                  size={24}
                  color={colors["secondary"]["500"]}
                />
              </VStack>
            </HStack>

            {/* Third card */}
            <HStack
              justifyContent={"space-between"}
              alignItems={"flex-start"}
              p={5}
              bg={"primary.50"}
              shadow={2}
              rounded={"lg"}
              mb={5}
            >
              <Center>
                <WeightIcon fill={colors["secondary"]["500"]} />
              </Center>
              <Box>
                <Text style={{ fontFamily: "Poppins-ExtraLight" }}>Weight</Text>
                <Text style={{ fontFamily: "Poppins-Medium" }}>
                  {user ? user?.weight : "--"} {user ? user?.weightUnit : "--"}
                </Text>
              </Box>
              <Box>
                <Text style={{ fontFamily: "Poppins-ExtraLight" }}>Height</Text>
                <Text style={{ fontFamily: "Poppins-Medium" }}>
                  {user ? user?.height : "--"} {user ? user?.heightUnit : "--"}
                </Text>
              </Box>
              <VStack alignItems={"flex-end"}>
                <Text
                  color={"secondary.500"}
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  BMI
                </Text>
                <Text
                  color={"secondary.500"}
                  style={{ fontFamily: "Poppins-Regular" }}
                >
                  20.3
                </Text>
              </VStack>
            </HStack>
            {/* Fourth Card */}
            <HStack
              justifyContent={"flex-start"}
              space={10}
              alignItems={"flex-start"}
              p={5}
              bg={"primary.50"}
              shadow={2}
              rounded={"lg"}
              mb={5}
            >
              <Center>
                <MaterialIcons
                  name="work"
                  size={28}
                  color={colors["secondary"]["500"]}
                />
              </Center>
              <Box>
                <Text style={{ fontFamily: "Poppins-ExtraLight" }}>
                  Industry
                </Text>
                <Text style={{ fontFamily: "Poppins-Medium" }}>
                  Information Technology
                </Text>
              </Box>
            </HStack>
            <Center>
              <Button
                mb={20}
                colorScheme="danger"
                onPress={() => signOut()}
                rightIcon={
                  <AntDesign name="logout" size={24} color={colors["white"]} />
                }
              >
                Log out
              </Button>
            </Center>
            {/* <Button
              colorScheme="primary"
              onPress={ async () => {
                var myHeaders = new Headers();
                myHeaders.append("accept", "text/plain");

                var requestOptions = {
                  method: "GET",
                  headers: myHeaders,
                  redirect: "follow",
                };

                await fetch("https://fafh-backend.herokuapp.com/fafh", requestOptions)
                  .then((response) => response.text())
                  .then((result) => console.log(result))
                  .catch((error) => console.log("error", error));
              }}
            >
              Primary
            </Button> */}

            <Center>
              <Text color={"muted.300"} style={{ fontFamily: "Poppins-Light" }}>
                ©4IR Pioneers 2022
              </Text>
            </Center>
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
}

export default React.memo(Profile);

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    top: -50,
  },

  // logout button
  logoutButton: {
    width: "100%",
    backgroundColor: "orange",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  logoutButtonText: {
    color: "orange",
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
  },
});

const clientId = "566fc69429f04271b1a6486bce4b3dae";
const clientSecret = "d89cebc2727e4a6085e6d51978ea88bf";
const authorize = () => {
  let formData = new FormData();
  formData.append("grant_type", "client_credentials");
  formData.append("user", clientId);
  formData.append("password", clientSecret);
  formData.append("scope", "basic");

  fetch("https://oauth.fatsecret.com/connect/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
    });
};
