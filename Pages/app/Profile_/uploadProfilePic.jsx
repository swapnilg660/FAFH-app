import { Box, Button, Center, Modal, Text, Image, Pressable, Spinner, HStack } from "native-base";
import React, { useContext, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
// import { Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import uploadFile from "../../../services/testUploadFile";
import { ProfileContext } from "./profileStack";
import { uploadAvatar } from "../../../services/mongoDB/users";
import AuthContext from "../../../hooks/context";
import { set } from "react-native-reanimated";

function UploadProfilePic({ isOpen, setIsOpen }) {
  const [image, setImage] = React.useState(null);
  const [isImage, setIsImage] = React.useState(false);
  const [imageObject, setImageObject] = React.useState(null);
  const { setProfilePicture } = React.useContext(ProfileContext);
  const { getUser, setUserProfileData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // base64: true,
      exif: true,
    });

    if (!result.canceled) {
      console.log("Image result: " + JSON.stringify(result));
      setImage(result.assets[0].uri);
      setImageObject(result.assets[0]);
    }
  };

  useEffect(() => {
    let isImage = image == null ? false : true;
    setIsImage(isImage);
  }, [image]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Select an image</Modal.Header>
        <Modal.Body>
          {console.log("Image: " + image)}
          {image != null ? (
            <Center rounded={"full"}>
              <Image source={{ uri: image }} alt="Alternate Text" size="2xl" rounded={"full"} />
            </Center>
          ) : (
            <Pressable
              _pressed={{
                opacity: 0.5,
              }}
              onPress={pickImage}
            >
              <Center borderColor={"#289B7C"} borderWidth={1} borderStyle="dashed" width={"100%"} height="180px">
                <FontAwesome name="image" size={45} color="#289B7C50" />
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 18,
                  }}
                >
                  Upload a file
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 14,
                    color: "#8F8F8F",
                    textAlign: "center",
                  }}
                >
                  {`Supported Formats: jpg,png\nmax size: 2mb`}
                </Text>
              </Center>
            </Pressable>
          )}
        </Modal.Body>
        <Modal.Footer>
          <HStack space={2}>
            {isImage && (
              <Button
                colorScheme="danger"
                onPress={() => {
                  setImage(null);
                }}
              >
                Clear
              </Button>
            )}

            {image && (
              <Button
                colorScheme="secondary"
                onPress={() => {
                  pickImage();
                }}
              >
                Change photo
              </Button>
            )}

            <Button
              disabled={!isImage}
              // variant={image ? "solid" : "ghost"}
              variant="solid"
              colorScheme={!isImage ? "muted" : "primary"}
              onPress={async () => {
                setIsLoading(true);
                uploadAvatar(imageObject)
                  .then((e) => console.log(e))
                  .catch((e) => console.log(e));
                getUser(setUserProfileData).then(() => {
                  setIsLoading(false);
                  setProfilePicture(image);
                  setIsOpen(false);
                });
              }}
            >
              {isLoading ? <Spinner size="sm" color={"white"} /> : "Save"}
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default UploadProfilePic;
