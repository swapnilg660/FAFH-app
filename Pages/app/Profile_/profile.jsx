import React, { useContext, useEffect } from "react";
import { ScrollView, Animated } from "react-native";
import {
  Center,
  HStack,
  VStack,
  Text,
  Button,
  Pressable,
  useTheme,
  Heading,
  Avatar,
  Icon,
  Box,
  Actionsheet,
} from "native-base";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  MaterialIcons,
  Zocial,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AgeIconProfile,
  GenderIconProfile,
  HeightIconProfile,
  WeightIconProfile,
} from "../../../Components/customSvgIcon";
import { useWindowDimensions } from "react-native";
import AuthContext from "../../../hooks/context";
import UploadProfilePic from "./uploadProfilePic";

function Profile({ navigation }) {
  const { colors } = useTheme();
  const { height, width } = useWindowDimensions();
  const { signOut, userToken } = useContext(AuthContext);
  const scrollY = new Animated.Value(0);

  const [editActionSheet, setEditActionSheet] = React.useState(false);
  const [openPic, setOpenPic] = React.useState(false);

  const extraData = [
    {
      title: "Email",
      icon: <Zocial name="email" size={18} color={colors.white} />,
      value: "sammicaheal@gmail.com",
    },
    {
      title: "Phone",
      icon: <MaterialIcons name="phone" size={18} color={colors.white} />,
      value: "+1 234 567 890",
    },
    {
      title: "About",
      icon: <Entypo name="info" size={18} color={colors.white} />,
      value: "FERL, Food Away From Home",
    },
  ];

  const [bmi, setBmi] = React.useState(0);
  const generateBmi = () => {
    let bmi = Math.floor(Math.random() * (40 - 10 + 1)) + 10;
    setBmi(bmi);
  };
  const getBmiColorAndText = (bmi) => {
    return bmi < 17
      ? {
          bmiColor: colors.red[200],
          bmiText: "Underweight",
          textColor: colors.red[500],
        }
      : bmi < 25
      ? {
          bmiColor: colors.primary[30],
          bmiText: "Healthy Weight",
          textColor: colors.primary[600],
        }
      : bmi < 30
      ? {
          bmiColor: colors.secondary[100],
          bmiText: "Overweight",
          textColor: colors.secondary[600],
        }
      : {
          bmiColor: colors.red[200],
          bmiText: "Obese",
          textColor: colors.red[500],
        };
  };
  useEffect(() => {
    generateBmi();
    //cleanup
    return () => {};
  }, []);

  return (
    <SafeAreaView>
      <Box pb={2} bg={"white"}>
        <HStack
          space="3"
          alignItems="center"
          justifyContent={"space-between"}
          my={3}
          mx={5}
        >
          <Heading style={{ fontFamily: "Poppins-SemiBold" }}>Profile</Heading>
          <Pressable
            _pressed={{
              opacity: 0.5,
            }}
            rounded={"full"}
            onPress={() => {
              setEditActionSheet((prev) => !prev);
            }}
          >
            <Center
              borderWidth={1}
              rounded="full"
              borderColor={"muted.400"}
              p="2"
            >
              <FontAwesome5 name="cog" size={24} color="black" />
            </Center>
          </Pressable>
        </HStack>

        <HStack space="3" alignItems="center" justifyContent={"center"} m={2}>
          <Pressable
            _pressed={{
              opacity: 0.5,
            }}
            rounded="full"
            position={"relative"}
            justifyContent="center"
            alignItems={"center"}
            onPress={() => {
              setOpenPic(true);
            }}
          >
            <Center position={"absolute"} zIndex="3" opacity={0.7}>
              <AntDesign
                name="camera"
                size={34}
                color={colors.primary["100"]}
              />
            </Center>

            <Avatar
              size={"xl"}
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            >
              SM
            </Avatar>
          </Pressable>
          <UploadProfilePic showUpload={openPic} setShowUpload={setOpenPic} />

          <VStack>
            <Heading
              style={{
                fontFamily: "Poppins-SemiBold",
              }}
              fontSize={"3xl"}
            >
              Sam Micheal
            </Heading>
            <Text color={"muted.500"}>Jnr Business Analyst</Text>
          </VStack>
        </HStack>
      </Box>
      <ScrollView
        onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={32}
      >
        {/* Profile Options */}
        <VStack space="3" p={3} h={height * 1.15} bg={"white"}>
          <Pressable
            onPress={() => {
              generateBmi();
            }}
          >
            <HStack
              bg={getBmiColorAndText(bmi).bmiColor}
              rounded={"lg"}
              p={2}
              space="7"
              px={5}
              alignItems="center"
            >
              <Center>
                <FontAwesome5
                  name="weight"
                  size={19}
                  color={colors.primary["600"]}
                />
              </Center>
              <VStack>
                <Heading style={{ fontFamily: "Poppins-Light" }}>BMI</Heading>
                <Text alignSelf={"flex-end"}>{bmi}</Text>
              </VStack>
              <Text color={getBmiColorAndText(bmi).textColor} pl={"20%"}>
                {getBmiColorAndText(bmi).bmiText}
              </Text>
            </HStack>
          </Pressable>

          <HStack
            // bg={"muted.100"}
            rounded={"lg"}
            p={2}
            space="7"
            px={5}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <HStack space="3" alignItems="center">
              <WeightIconProfile />
              <VStack>
                <Heading
                  style={{
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Weight
                </Heading>
                <Text
                  color="muted.500"
                  style={{
                    fontStyle: "italic",
                  }}
                >
                  55 kg
                </Text>
              </VStack>
            </HStack>
            <HStack space="3" alignItems="center">
              <HeightIconProfile />
              <VStack>
                <Heading
                  style={{
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Height
                </Heading>
                <Text
                  color="muted.500"
                  style={{
                    fontStyle: "italic",
                  }}
                >
                  163 cm
                </Text>
              </VStack>
            </HStack>
          </HStack>
          <HStack
            // bg={"muted.100"}
            rounded={"lg"}
            p={2}
            space="7"
            px={5}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <HStack space="3" alignItems="center">
              <GenderIconProfile />
              <VStack>
                <Heading
                  style={{
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Gender
                </Heading>
                <Text
                  color="muted.500"
                  style={{
                    fontStyle: "italic",
                  }}
                >
                  Female
                </Text>
              </VStack>
            </HStack>
            <HStack space="3" alignItems="center">
              <AgeIconProfile />
              <VStack>
                <Heading
                  style={{
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  Age
                </Heading>
                <Text
                  color="muted.500"
                  style={{
                    fontStyle: "italic",
                  }}
                >
                  25 Years
                </Text>
              </VStack>
            </HStack>
          </HStack>
          {extraData.map((item, index) => {
            return (
              <HStack
                // bg={"muted.100"}
                // borderWidth={1}
                rounded={"lg"}
                p={2}
                space="7"
                px={5}
                alignItems="center"
                justifyContent={"space-between"}
                key={index}
              >
                <HStack space="3" alignItems="center">
                  <Center bg="primary.600" p="1.5" rounded="full">
                    {item.icon}
                  </Center>

                  <VStack>
                    <Heading
                      style={{
                        fontFamily: "Poppins-Regular",
                      }}
                    >
                      {item.title}
                    </Heading>
                    <Text
                      color="muted.500"
                      style={{
                        fontStyle: "italic",
                      }}
                    >
                      {item.value}
                    </Text>
                  </VStack>
                </HStack>
              </HStack>
            );
          })}
          <Center>
            <Button
              my={10}
              colorScheme="secondary"
              onPress={() => signOut()}
              rightIcon={
                <AntDesign name="logout" size={24} color={colors["white"]} />
              }
            >
              Log out
            </Button>
          </Center>
          <Center>
            <Text color={"muted.400"} style={{ fontFamily: "Poppins-Light" }}>
              ©4IR Pioneers 2022
            </Text>
          </Center>
        </VStack>
      </ScrollView>

      <Actionsheet
        isOpen={editActionSheet}
        onClose={() => setEditActionSheet(false)}
        // bg={"primary.600"}
      >
        <Actionsheet.Content bg={"primary.600"}>
          {[
            {
              title: "Edit Profile",
              route: "editProfile",
              icon: (
                <FontAwesome5
                  name="user-edit"
                  size={24}
                  color={colors["white"]}
                />
              ),
            },
            {
              title: "Change Password",
              route: "changePassword",
              icon: <AntDesign name="lock" size={24} color={colors["white"]} />,
            },
            {
              title: "Delete Account",
              route: "deleteAccount",
              icon: (
                <MaterialIcons
                  name="delete"
                  size={24}
                  color={colors["white"]}
                />
              ),
            },
          ].map((item, index) => {
            return (
              <Actionsheet.Item
                bg={
                  item.route == "deleteAccount" ? "danger.700" : "primary.600"
                }
                _text={{ color: "white" }}
                key={index}
                rounded={"lg"}
                onPress={() => {
                  //   navigation.navigate(item.route);
                  console.log(item.route);
                  //   setEditActionSheet(false);
                }}
                // endIcon={item.icon}
                leftIcon={item.icon}
              >
                {item.title}
              </Actionsheet.Item>
            );
          })}
        </Actionsheet.Content>
      </Actionsheet>
    </SafeAreaView>
  );
}

export default Profile;
