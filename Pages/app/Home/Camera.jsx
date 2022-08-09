import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Camera } from "expo-camera";
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  IconButton,
  useTheme,
  VStack,
} from "native-base";
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AlertComponent from "../../../Components/alert";
import { recogniseFood } from "../../../services/foodAI/FoodDatabase";
import { HomeContext } from "../../../hooks/context";

export default function UploadPicture({ navigation, route }) {
  const { foodType } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  const { colors } = useTheme();
  const { winHeight, winWidth } = useWindowDimensions();
  const { setFoundFood } = useContext(HomeContext);

  const ratio = ["16:9", "1:1", "4:3"];
  const [currentRatio, setCurrentRatio] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [modal, setModal] = useState(false);

  let takePicture = async () => {
    if (cameraRef) {
      let options = {
        quality: 0.5,
        exif: true,
        imageType: "jpg",
        copyToCacheDirectory: false,
      };
      let newPhoto = await cameraRef.current.takePictureAsync(options);
      console.log("photo", newPhoto);
      recogniseFood(newPhoto, setFoundFood);
      setPhoto(newPhoto.uri);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    return () => {};
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (photo) {
    let savePhoto = async () => {
      // save picture to the db here
      setModal(true);
    };
    let retakePhoto = async () => {
      setPhoto(null);
    };
    return (
      <>
        <SafeAreaView></SafeAreaView>
        <VStack h={winHeight} w={winWidth} flex={1} bg={"secondary.30"}>
          <Image
            source={{ uri: photo }}
            alt="Image Preview"
            style={{
              alignSelf: "stretch",
              flex: 1,
            }}
          />
          <Center position={"absolute"} bottom={0} w={"100%"}>
            <Button.Group m={1}>
              <Button
                colorScheme="secondary"
                onPress={() => {
                  retakePhoto();
                }}
                leftIcon={
                  <MaterialCommunityIcons
                    name="camera-retake"
                    size={24}
                    color={colors["white"]}
                  />
                }
              >
                Retake
              </Button>
              <Button
                colorScheme="primary"
                onPress={() => {
                  savePhoto();
                }}
                leftIcon={
                  <Ionicons
                    name="checkmark-circle-sharp"
                    size={24}
                    color={colors["white"]}
                  />
                }
              >
                Save
              </Button>
            </Button.Group>
          </Center>
        </VStack>
        <AlertComponent
          setModalVisible={setModal}
          modalVisible={modal}
          bg={"white"}
          message={"Food Captured Successfully!"}
          action={[
            {
              label: "Okay",
              onPress: () => {
                setTimeout(() => {
                  navigation.navigate("ConfirmMeal", {
                    foodType: foodType,
                    photo: photo,
                  });
                }, 500);
              },
            },
          ]}
        />
      </>
    );
  }

  return (
    <Box style={styles.container} flex={1} bg={"secondary.30"}>
      <Camera ref={cameraRef} style={styles.camera} ratio={ratio[currentRatio]}>
        <HStack
          space="3"
          justifyContent={"space-between"}
          alignItems="center"
          p={2}
        >
          <Center rounded={"full"}>
            <IconButton
              pl={3}
              rounded={"full"}
              variant={"ghost"}
              icon={
                <MaterialIcons
                  name="arrow-back-ios"
                  size={24}
                  color={colors["white"]}
                />
              }
              onPress={() => {
                navigation.goBack();
              }}
            />
          </Center>
          <Center rounded={"full"}>
            <IconButton
              pl={3}
              rounded={"full"}
              variant={"ghost"}
              icon={
                <MaterialIcons
                  name="aspect-ratio"
                  size={24}
                  color={colors["white"]}
                />
              }
              onPress={() => {
                setCurrentRatio((prev) =>
                  prev + 1 < ratio.length ? prev + 1 : 0
                );
              }}
            />
          </Center>
        </HStack>

        <Center
          bg="transparent"
          w={"100%"}
          p="2"
          position={"absolute"}
          bottom={5}
        >
          <IconButton
            rounded={"full"}
            w={50}
            variant="solid"
            icon={
              <Icon size="2xl" as={AntDesign} name="camera" color="white" />
            }
            onPress={() => {
              takePicture().then(() => {
                console.log(photo);
              });
            }}
          />
        </Center>
      </Camera>
    </Box>
  );
}
const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});
