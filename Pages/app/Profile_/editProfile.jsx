import React, { useEffect } from "react";
import {
  Button,
  Center,
  HStack,
  Pressable,
  useTheme,
  Heading,
  Avatar,
  FormControl,
  Input,
  VStack,
  Text,
  Select,
  CheckIcon,
  Spinner,
  useToast,
} from "native-base";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as Yup from "yup";
import { Formik } from "formik";
import UploadProfilePic from "./uploadProfilePic";
import { ProfileContext } from "./profileStack";
import ToastComponent from "../../../services/CustomToast";
import AuthContext from "../../../hooks/context";

function EditProfile({ navigation, route }) {
  const { colors } = useTheme();
  const { actionType, userProfileData } = route.params;
  const [openImagePicker, setOpenImagePicker] = React.useState(false);
  const { profilePicture } = React.useContext(ProfileContext);
  const toast = useToast();
  const { setHasProfileChanged } = React.useContext(AuthContext);

  //form states
  const initialValues = {
    // current user's name
    name: userProfileData.fullName,
    email: userProfileData.email,
    height: `${userProfileData.height}`,
    heightUnit: "cm",
    weight: `${userProfileData.weight}`,
    weightUnit: "kg",
  };

  // Object for error handling
  const validationSchema = Yup.object({
    name: Yup.string().trim().min(3, "Must be at least 3 characters"),
    email: Yup.string().trim().email("Invalid email"),
    height: Yup.number()
      .typeError("The Height must be a number")
      .min(1, "Must be at least 1"),
    weight: Yup.number()
      .typeError("The Weight must be a number")
      .min(1, "Must be at least 1"),
  });

  useEffect(() => {
    setHasProfileChanged(false);
    return () => {
      // cleanup
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <HStack space="3" alignItems="center" my={6} mx={5}>
        <Pressable
          onPress={() => {
            navigation.goBack();
            setHasProfileChanged(true);
          }}
        >
          <Center bg="primary.600" p="2" pl={2.5} rounded="full">
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={colors["white"]}
            />
          </Center>
        </Pressable>
        <Heading style={{ fontFamily: "Poppins-SemiBold" }}>
          {actionType}
        </Heading>
      </HStack>

      <Pressable
        _pressed={{
          opacity: 0.5,
        }}
        rounded="full"
        position={"relative"}
        justifyContent="center"
        alignItems={"center"}
        onPress={() => {
          setOpenImagePicker(true);
        }}
      >
        <Center position={"absolute"} zIndex="3" opacity={0.7}>
          <AntDesign name="camera" size={34} color={colors.primary["100"]} />
        </Center>

        <Avatar
          size={"xl"}
          source={{
            uri: profilePicture ? profilePicture : userProfileData?.avatar,
          }}
        >
          SM
        </Avatar>
      </Pressable>
      <UploadProfilePic
        isOpen={openImagePicker}
        setIsOpen={setOpenImagePicker}
      />

      <VStack space="5" p={5}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikActions) => {
            // handleSubmit(values, formikActions);
            formikActions.setSubmitting(true);
            setTimeout(() => {
              formikActions.setSubmitting(false);
              toast.show({
                placement: "top",
                render: () => (
                  <ToastComponent
                    state={true ? "Success" : "Error"}
                    message={
                      true
                        ? "Profile Updated Successfully,\nRefresh to see the changes"
                        : res
                    }
                  />
                ),
              });
              navigation.goBack();
            }, 1000);
            // console.log(values);
          }}
        >
          {({
            handleChange,
            setFieldValue,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
            isSubmitting,
          }) => {
            const { name, email, cell, weight, height } = values;
            return (
              <>
                <FormControl isInvalid={touched.name && errors.name}>
                  <FormControl.Label>
                    <Text color={"black"}>Name & Surname</Text>
                  </FormControl.Label>
                  <Input
                    value={name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    p={2}
                    placeholder="Heritier Kaumbu"
                    placeholderTextColor="gray.400"
                    _input={{ color: "black" }}
                    fontWeight={"300"}
                    fontSize={"md"}
                  />
                  <FormControl.ErrorMessage>
                    {touched.name && errors.name}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.email && errors.email}>
                  <FormControl.Label>
                    <Text color={"black"}>Email</Text>
                  </FormControl.Label>
                  <Input
                    value={email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    p={2}
                    placeholder="email@example.com"
                    placeholderTextColor="gray.400"
                    _input={{ color: "black" }}
                    fontWeight={"300"}
                    fontSize={"md"}
                  />
                  <FormControl.ErrorMessage>
                    {touched.email && errors.email}
                  </FormControl.ErrorMessage>
                </FormControl>

                {/* <FormControl isInvalid={touched.cell && errors.cell}>
                  <FormControl.Label>
                    <Text color={"black"}>Cell.no</Text>
                  </FormControl.Label>
                  <Input
                    value={cell}
                    onChangeText={handleChange("cell")}
                    onBlur={handleBlur("cell")}
                    p={2}
                    placeholder="0123456789"
                    placeholderTextColor="gray.400"
                    _input={{ color: "black" }}
                    fontWeight={"300"}
                    fontSize={"md"}
                    rightElement={
                      <FormControl
                        backgroundColor={"primary.600"}
                        width={"30%"}
                        p={0}
                      >
                        <Select
                          maxWidth="80"
                          accessibilityLabel="Country code"
                          placeholder="Code"
                          placeholderTextColor={"white"}
                          onValueChange={(itemValue) => {
                            setFieldValue("weightUnit", itemValue);
                          }}
                          onBlur={handleBlur("weightUnit")}
                          _selectedItem={{
                            bg: "primary.100",
                            endIcon: <CheckIcon size={5} />,
                            borderRadius: "20",
                          }}
                          color={"white"}
                          borderColor={"primary.600"}
                        >
                          <Select.Item label="+91" value="India" />
                          <Select.Item label="+27" value="South Africa" />
                        </Select>
                      </FormControl>
                    }
                  />
                  <FormControl.ErrorMessage>
                    {touched.cell && errors.cell}
                  </FormControl.ErrorMessage>
                </FormControl> */}

                <HStack space={2}>
                  <FormControl
                    width={"50%"}
                    isInvalid={touched.weight && errors.weight}
                  >
                    <FormControl.Label>
                      <Text color={"black"}>Weight</Text>
                    </FormControl.Label>
                    <Input
                      value={weight}
                      onChangeText={handleChange("weight")}
                      onBlur={handleBlur("weight")}
                      placeholder="0.0"
                      fontWeight={"300"}
                      fontSize={"md"}
                      rightElement={
                        <FormControl
                          backgroundColor={"primary.600"}
                          width={"50%"}
                          p={0}
                        >
                          <Select
                            maxWidth="100"
                            accessibilityLabel="Measurement Unit"
                            placeholder="Unit"
                            placeholderTextColor={"white"}
                            selectedValue={values.weightUnit}
                            defaultValue={values.weightUnit}
                            onValueChange={(itemValue) => {
                              setFieldValue("weightUnit", itemValue);
                            }}
                            onBlur={handleBlur("weightUnit")}
                            _selectedItem={{
                              bg: "primary.100",
                              endIcon: <CheckIcon size={5} />,
                              borderRadius: "20",
                            }}
                            color={"white"}
                            borderColor={"primary.600"}
                          >
                            <Select.Item label="Kg" value="kg" />
                            <Select.Item label="Ibs" value="Ibs" />
                          </Select>
                        </FormControl>
                      }
                    />
                    <FormControl.ErrorMessage>
                      {touched.weight && errors.weight}
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl
                    width={"50%"}
                    isInvalid={touched.height && errors.height}
                  >
                    <FormControl.Label>
                      <Text color={"black"}>Height</Text>
                    </FormControl.Label>
                    <Input
                      value={height}
                      onChangeText={handleChange("height")}
                      onBlur={handleBlur("height")}
                      placeholder="0.0"
                      fontWeight={"300"}
                      fontSize={"md"}
                      rightElement={
                        <FormControl
                          backgroundColor={"primary.600"}
                          width={"50%"}
                          p={0}
                        >
                          <Select
                            maxWidth="100"
                            accessibilityLabel="Measurement Unit"
                            placeholder="Unit"
                            placeholderTextColor={"white"}
                            selectedValue={values.heightUnit}
                            defaultValue={values.heightUnit}
                            onValueChange={(itemValue) => {
                              setFieldValue("heightUnit", itemValue);
                            }}
                            onBlur={handleBlur("heightUnit")}
                            _selectedItem={{
                              bg: "primary.100",
                              endIcon: <CheckIcon size={5} />,
                              borderRadius: "20",
                            }}
                            color={"white"}
                            borderColor={"primary.600"}
                          >
                            <Select.Item label="Cm" value="cm" />
                            <Select.Item label="Feet" value="feet" />
                          </Select>
                        </FormControl>
                      }
                    />
                    <FormControl.ErrorMessage>
                      {touched.height && errors.height}
                    </FormControl.ErrorMessage>
                  </FormControl>
                </HStack>

                <Button
                  size="md"
                  colorScheme="secondary"
                  background={"secondary.400"}
                  my={5}
                  onPress={!isSubmitting ? handleSubmit : null}
                >
                  {isSubmitting ? (
                    <Spinner size="sm" color={"white"} />
                  ) : (
                    "Save"
                  )}
                </Button>
              </>
            );
          }}
        </Formik>

        {/* <FormControl isInvalid>
          <FormControl.Label>First Name</FormControl.Label>
          <Input p={2} placeholder="Is it react?" />
          <FormControl.HelperText>
            We'll keep this between us.
          </FormControl.HelperText>
          <FormControl.ErrorMessage>
            Something is wrong.
          </FormControl.ErrorMessage>
        </FormControl> */}
      </VStack>
    </SafeAreaView>
  );
}

export default EditProfile;
