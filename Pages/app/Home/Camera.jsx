import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Center, Icon, IconButton } from "native-base";
import { AntDesign } from "@expo/vector-icons";

export default function UploadPicture({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  //   const [type, setType] = useState(CameraType.back);

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
  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} ratio={"16:9"}>
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
              console.log("hello");
              cameraRef.current.takePictureAsync({
                quality: 0.5,
                base64: true,
                exif: true,
                onPictureStaken: (picture) => {
                  console.log("Picture",picture);
                  navigation.goBack();
                },
              });
            }}
          />
        </Center>
      </Camera>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: "white",
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
