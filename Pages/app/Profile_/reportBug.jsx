import {
  ScrollView,
  HStack,
  Heading,
  Pressable,
  Center,
  useTheme,
  Box,
  Text,
  Form,
  Input,
  FormControl,
  Icon,
  Button,
  VStack,
  Spinner,
  useToast,
  Image,
} from "native-base";
import { SafeAreaView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import ToastComponent from "../../../services/CustomToast";
import { reportBug } from "../../../services/mongoDB/users";

function ReportBug({ navigation }) {
  const { colors } = useTheme();
  const [images, setImages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      // base64: true,
      exif: true,
    });

    if (!result.cancelled) {
      if (result.selected) {
        setImages(result.selected);
      } else {
        setImages([result]);
      }
    }
  };

  const initialValues = {
    comment: "",
    title: "",
  };
  const toast = useToast();

  const validationSchema = Yup.object({
    comment: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
  });

  const handleSubmit = (values, actions) => {
    let bugData = {
      ...values,
      screenshots: images,
    };
    // console.log("DATA TO SEND TO REPORT BUG =>", bugData);
    actions.setSubmitting(true);
    reportBug(bugData).then(() => {
      actions.setSubmitting(false);
      toast.show({
        placement: "top",
        render: () => (
          <ToastComponent
            state={true ? "Success" : "Error"}
            message={true ? "Bug reported successfully" : res}
          />
        ),
      });
      navigation.goBack();
    });
  };
  useEffect(() => {
    return () => {
      setImages(null);
    };
  }, []);

  return (
    <>
      <SafeAreaView></SafeAreaView>
      <ScrollView bg="white">
        <HStack
          bg="white"
          space="3"
          alignItems="center"
          justifyContent={"flex-start"}
          pt={8}
          px={5}
        >
          <Pressable
            _pressed={{
              opacity: 0.5,
            }}
            rounded={"full"}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Center
              rounded="full"
              borderColor={"muted.400"}
              p="2"
              bg="primary.600"
            >
              <Ionicons name="chevron-back" size={24} color={colors.white} />
            </Center>
          </Pressable>
          <Heading style={{ fontFamily: "Poppins-SemiBold" }}>
            Report a bug
          </Heading>
        </HStack>
        {/* Formik form to report a bug */}
        <Box mx="5" bg="white" rounded="lg">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, formikActions) => {
              handleSubmit(values, formikActions);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
              isSubmitting,
            }) => {
              const { title, comment } = values;
              return (
                <>
                  <FormControl
                    isRequired
                    isInvalid={touched.title && errors.title}
                  >
                    <FormControl.Label>
                      <Text
                        color={"black"}
                        style={{ fontFamily: "Poppins-Regular" }}
                      >
                        Title
                      </Text>
                    </FormControl.Label>
                    <Input
                      value={title}
                      onChangeText={handleChange("title")}
                      onBlur={handleBlur("title")}
                      p={2}
                      placeholder="Enter a title"
                      placeholderTextColor="gray.400"
                      _input={{ color: "black" }}
                      style={{ fontFamily: "Poppins-Regular" }}
                      fontSize={"md"}
                    />
                    <FormControl.ErrorMessage>
                      {touched.title && errors.title}
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={touched.comment && errors.comment}
                  >
                    <FormControl.Label>
                      <Text
                        color={"black"}
                        style={{ fontFamily: "Poppins-Regular" }}
                      >
                        Comment
                      </Text>
                    </FormControl.Label>
                    <Input
                      multiline={true}
                      value={comment}
                      onChangeText={handleChange("comment")}
                      onBlur={handleBlur("comment")}
                      p={2}
                      placeholderTextColor="gray.400"
                      _input={{ color: "black" }}
                      style={{ fontFamily: "Poppins-Regular" }}
                      fontSize={"md"}
                    />
                    <FormControl.ErrorMessage>
                      {touched.comment && errors.comment}
                    </FormControl.ErrorMessage>
                  </FormControl>

                  <VStack>
                    <VStack space={1}>
                      <Heading
                        style={{ fontFamily: "Poppins-SemiBold" }}
                        color={"black"}
                        fontSize={"lg"}
                        pt={3}
                      >
                        Attach a screenshot
                        <Text fontSize={"sm"} fontStyle="italic">
                          (optional)
                        </Text>
                      </Heading>
                      <Text
                        style={{ fontFamily: "Poppins-Regular" }}
                        color={"black"}
                        fontSize={"md"}
                      >
                        You can attach a screenshot to help us understand the
                        issue better
                      </Text>
                      <Center>
                        <Button
                          colorScheme="primary"
                          onPress={() => {
                            pickImage();
                          }}
                          leftIcon={
                            <MaterialIcons
                              name="add-a-photo"
                              size={24}
                              color={colors.white}
                            />
                          }
                        >
                          Add a screenshot
                        </Button>
                      </Center>
                    </VStack>
                  </VStack>
                  <ScrollView horizontal mt={5}>
                    <HStack space="3" alignItems="center">
                      {images?.map((item, index) => {
                        return (
                          <Box
                            key={index}
                            borderColor="muted.400"
                            rounded="lg"
                            position={"relative"}
                          >
                            <Pressable
                              _pressed={{
                                bg: "red.900",
                              }}
                              bg="danger.700"
                              zIndex={1}
                              position={"absolute"}
                              top={2}
                              right={2}
                              rounded={"full"}
                              onPress={() => {
                                let newImages = images.filter(
                                  (image) => image.uri !== item.uri
                                );
                                setImages(newImages);
                              }}
                            >
                              <Center
                                rounded="full"
                                borderColor={"muted.400"}
                                p="2"
                              >
                                <Ionicons
                                  name="close"
                                  size={24}
                                  color={colors.white}
                                />
                              </Center>
                            </Pressable>
                            <Image
                              source={{
                                uri: item.uri,
                              }}
                              alt="Alternate Text"
                              resizeMode="cover"
                              borderRadius={10}
                              h={300}
                              w={300}
                            />
                          </Box>
                        );
                      })}
                    </HStack>
                  </ScrollView>

                  <Center>
                    <Button
                      shadow={3}
                      width="60%"
                      colorScheme="secondary"
                      my={5}
                      onPress={!isSubmitting ? handleSubmit : null}
                    >
                      {isSubmitting ? (
                        <Spinner size="sm" color={"white"} />
                      ) : (
                        "SUBMIT"
                      )}
                    </Button>
                  </Center>
                </>
              );
            }}
          </Formik>
        </Box>

        {/* Image Picker */}
      </ScrollView>
    </>
  );
}

export default ReportBug;
