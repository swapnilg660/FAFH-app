import React, { useState, useEffect, useRef, useContext } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,
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
  Spinner,
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
import foodBg from "../../../assets/images/foodBg.jpg";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

export default function UploadPicture({ navigation, route }) {
  const { foodType } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  const { colors } = useTheme();
  const { winHeight, winWidth } = useWindowDimensions();
  const { setFoundFood, setError } = useContext(HomeContext);

  const ratio = ["16:9", "1:1", "4:3"];
  const [currentRatio, setCurrentRatio] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [photoToDisplay, setPhotoToDisplay] = useState(null);
  const [modal, setModal] = useState(false);
  const [takingPicture, setTakingPicture] = useState(false);

  let takePicture = async () => {
    if (cameraRef) {
      // get current pLatform
      // get current ratio

      let options = {
        quality: 1,
        exif: true,
        imageType: "jpg",
        base64: true,
        copyToCacheDirectory: false,
      };

      let newPhoto = await cameraRef.current.takePictureAsync(options);

      const resizedImage = await manipulateAsync(
        newPhoto.uri,
        [{ resize: { height: 3840, width: 2160 } }],
        { compress: 0.2, format: SaveFormat.JPEG }
      );
      setPhoto(resizedImage);

      // let newPhotoToDisplay = await cameraRef.current.takePictureAsync(
      //   options2
      // );
      setPhotoToDisplay(newPhoto);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    return () => {};
  }, [photo]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (photo && photoToDisplay) {
    let savePhoto = async () => {
      // save picture to the db here
      // recogniseFood(photo, setFoundFood);
      //navigate to ConfirmMeal screen
      recogniseFood(photo, setFoundFood, setError);
      setModal(true);
    };
    let retakePhoto = async () => {
      setPhoto(null);
      setPhotoToDisplay(null);
      setFoundFood([]);
    };

    return (
      <>
        <ImageBackground
          source={foodBg}
          style={{
            flex: 1,
            padding: 0,
            margin: 0,
          }}
        >
          <Image
            // source={{ uri: photoToDisplay.uri }}
            source={{ uri: "data:image/jpeg;base64," + photoToDisplay.base64 }}
            alt="Image Preview"
            style={{
              width: "100%",
              height: "100%",
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
        </ImageBackground>
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
                    photo: "data:image/jpeg;base64," + photoToDisplay.base64,
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
    <Box style={styles.container} flex={1} safeAreaTop>
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
            disabled={takingPicture}
            rounded={"full"}
            w={50}
            variant="solid"
            icon={
              takingPicture ? (
                <ActivityIndicator size="small" color={colors["white"]} />
              ) : (
                <Icon size="2xl" as={AntDesign} name="camera" color="white" />
              )
            }
            onPress={() => {
              setTakingPicture(true);
              takePicture().then(() => {
                setTakingPicture(false);
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
