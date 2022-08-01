import React, { useState, useContext, useRef, useEffect } from "react";
import AuthContext from "../../hooks/context";
import { MaterialIcons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { googleSignIn } from "../../services/auth";
import {
  Box,
  Center,
  FormControl,
  Heading,
  Input,
  ScrollView,
  useToast,
  Button,
  Text,
  Icon,
  Pressable,
  Row,
  useTheme,
  Spinner,
  StatusBar,
  View,
  Select,
  CheckIcon,
  WarningOutlineIcon,
  VStack,
  Image,
  HStack,
} from "native-base";
import CountryFlag from "react-native-country-flag";
import useCountries from "use-countries";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Foundation } from "@expo/vector-icons";

import ToastComponent from "../../services/CustomToast";
import { Animated, Button as RnButton } from "react-native";
import { Item } from "react-native-paper/lib/typescript/components/List/List";

function Register({ navigation }) {
  //Animations
  const popInAnimation = useRef(new Animated.Value(500)).current;
  const scrollRef = useRef();
  const AdditionalInfoRef = useRef(new Animated.Value(0)).current;
  const [isAdditionalInfoVisible, setAdditionalInfoVisible] = useState(false);
  const [AdditionalInfoLoading, setAdditionalInfoLoading] = useState(false);
  const showAdditionalInfo = () => {
    setAdditionalInfoLoading(true);
    Animated.spring(AdditionalInfoRef, {
      toValue: 1,
      useNativeDriver: true,
    }).start((finished) => {
      if (finished) {
        setAdditionalInfoLoading(false);
        setAdditionalInfoVisible(true);
        scrollRef.current.scrollTo({
          y: 900,
          animated: true,
        });
      } else {
        setAdditionalInfoVisible(false);
      }
    });
  };

  // UI utilities
  const [show, setShow] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const toast = useToast();

  //form states
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cell: "",
    doB: moment().format("MMMM Do YYYY"),
    gender: "",
    height: "",
    heightUnit: "cm",
    weight: "",
    weightUnit: "kg",
  };

  const { signUp } = React.useContext(AuthContext);
  const handleSubmit = (data, formikActions) => {
    console.log("SUBMITTED:", data);
    signUp({
      ...data,
      stayLoggedIn: true,
    }).then((res) => {
      formikActions.setSubmitting(false);
      setFeedback(res);
      toast.show({
        placement: "top",
        render: () => (
          <ToastComponent
            state={res === "Success" ? "Success" : "Error"}
            message={res === "Success" ? "Logged in Successfully" : res}
          />
        ),
      });
    });
  };

  // Object for error handling
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required("Required")
      .min(3, "Must be at least 3 characters"),
    email: Yup.string().trim().email("Invalid email").required("Required"),
    password: Yup.string()
      .trim()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .trim()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    // cell: Yup.string().matches(new RegExp("[0-9]{10}"), "Invalid Cell Number"),
    cell: Yup.string().required("Required"),
    doB: Yup.string().required("Required"),
    height: Yup.number()
      .typeError("The Height must be a number")
      .min(1, "Must be at least 1"),
    weight: Yup.number()
      .typeError("The Weight must be a number")
      .min(1, "Must be at least 1"),
  });

  useEffect(() => {
    Animated.timing(popInAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // console.log("AdditionalInfoRef:",typeof AdditionalInfoRef._value);

    //fix memory leak
    return () => {};
  }, []);
  return (
    <>
      <StatusBar />
      <ScrollView
        ref={scrollRef}
        bg="primary.50"
        onScroll={(event) => {
          const scrolling = event.nativeEvent.contentOffset.y;
          if (scrolling > 0) {
            navigation.setOptions({
              headerShown: false,
            });
          } else {
            navigation.setOptions({
              headerShown: true,
            });
          }
        }}
      >
        <Center mt={10} mb={10}>
          <Heading fontSize={"xl"} fontStyle="italic" color={"darkText"}>
            Hello!
          </Heading>

          <Text fontWeight={"200"} color={"darkText"} m={4}>
            Welcome to Food Away From Home.
          </Text>
          <Heading fontWeight={"400"} fontSize={"2xl"} color={"darkText"}>
            Register an Account
          </Heading>
        </Center>
        <Animated.View style={{ transform: [{ translateY: popInAnimation }] }}>
          <Box mx="5" bg="white" p="4" mt={0} rounded="lg">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, formikActions) => {
                handleSubmit(values, formikActions);
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
                const {
                  name,
                  email,
                  password,
                  confirmPassword,
                  cell,
                  doB,
                  weight,
                  height,
                  gender,
                } = values;
                return (
                  <>
                    <FormControl
                      isRequired
                      isInvalid={touched.name && errors.name}
                    >
                      <FormControl.Label>
                        <Text color={"black"}>Name & Surname</Text>
                      </FormControl.Label>
                      <Input
                        borderColor={"primary.100"}
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
                    <FormControl
                      isRequired
                      isInvalid={touched.email && errors.email}
                    >
                      <FormControl.Label>
                        <Text color={"black"}>Email</Text>
                      </FormControl.Label>
                      <Input
                        borderColor={"primary.100"}
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
                    <FormControl
                      isRequired
                      isInvalid={touched.password && errors.password}
                    >
                      <FormControl.Label>
                        <Text color={"black"}>Password</Text>
                      </FormControl.Label>
                      <Input
                        value={password}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        secureTextEntry={show}
                        p={2}
                        placeholder="password"
                        placeholderTextColor="gray.400"
                        _input={{ color: "black" }}
                        fontWeight={"300"}
                        fontSize={"md"}
                        InputRightElement={
                          <Icon
                            as={
                              <MaterialIcons
                                name={show ? "visibility" : "visibility-off"}
                              />
                            }
                            size={5}
                            mr="2"
                            color="muted.400"
                            onPress={() => setShow(!show)}
                          />
                        }
                      />
                      <FormControl.ErrorMessage>
                        {touched.password && errors.password}
                      </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl
                      isRequired
                      isInvalid={
                        touched.confirmPassword && errors.confirmPassword
                      }
                    >
                      <FormControl.Label>
                        <Text color={"black"}>Confirm Password</Text>
                      </FormControl.Label>
                      <Input
                        value={confirmPassword}
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        secureTextEntry={show}
                        p={2}
                        placeholder="confirmPassword"
                        placeholderTextColor="gray.400"
                        _input={{ color: "black" }}
                        fontWeight={"300"}
                        fontSize={"md"}
                        InputRightElement={
                          <Icon
                            as={
                              <MaterialIcons
                                name={show ? "visibility" : "visibility-off"}
                              />
                            }
                            size={5}
                            mr="2"
                            color="muted.400"
                            onPress={() => setShow(!show)}
                          />
                        }
                      />
                      <FormControl.ErrorMessage>
                        {touched.confirmPassword && errors.confirmPassword}
                      </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl
                      isRequired
                      isInvalid={touched.cell && errors.cell}
                    >
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
                              // selectedValue={values.weightUnit}
                              // defaultValue={values.weightUnit}
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
                    </FormControl>
                    <DatePickerComponent
                      doB={doB}
                      setFieldValue={setFieldValue}
                      handleSubmit={handleSubmit}
                    />
                    <Row space={2}>
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
                    </Row>
                    <FormControl maxW="300" isRequired>
                      <FormControl.Label fontWeight={"300"}>
                        <Text color={"black"}>Gender</Text>
                      </FormControl.Label>
                      <Select
                        selectedValue={gender}
                        minWidth="200"
                        accessibilityLabel="Choose your gender"
                        placeholder="Choose your Gender"
                        fontWeight={"300"}
                        _selectedItem={{
                          bg: "primary.100",
                          endIcon: <CheckIcon size={5} />,
                          borderRadius: "20",
                        }}
                        mt={1}
                        onValueChange={(itemValue) =>
                          setFieldValue("gender", itemValue)
                        }
                      >
                        <Select.Item label="Male" value="M" />
                        <Select.Item label="Female" value="F" />
                        <Select.Item label="Other" value="O" />
                        <Select.Item label="Prefer not to say" value="C" />
                      </Select>
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}
                      >
                        Please make a selection!
                      </FormControl.ErrorMessage>
                    </FormControl>
                    <Row
                      space="2"
                      justifyContent={"center"}
                      alignItems="center"
                    >
                      <Text>Already have an account?</Text>
                      <Pressable
                        onPress={() => {
                          navigation.navigate("Login");
                        }}
                      >
                        <Text color={"secondary.500"} my="5">
                          Login
                        </Text>
                      </Pressable>
                    </Row>
                    <Button
                      shadow={3}
                      size="md"
                      colorScheme="secondary"
                      background={"secondary.400"}
                      my={5}
                      onPress={!isSubmitting ? handleSubmit : null}
                    >
                      {isSubmitting ? (
                        <Spinner size="sm" color={"white"} />
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </>
                );
              }}
            </Formik>
          </Box>
        </Animated.View>
      </ScrollView>
    </>
  );
}

export default React.memo(Register);

export const DatePickerComponent = ({ handleSubmit, doB, setFieldValue }) => {
  const { colors } = useTheme();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [color, setColor] = useState(colors["primary"]["600"]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setFieldValue("doB", moment(date).format("MMMM Do YYYY"));
    hideDatePicker();
  };

  return (
    <>
      <FormControl>
        <FormControl.Label>
          <Text>Date of Birth</Text>
        </FormControl.Label>
        <Row>
          <Input
            isDisabled={true}
            value={doB}
            p={2}
            _input={{ color: "black" }}
            fontWeight={"300"}
            fontSize={"md"}
            width="80%"
          />
          <Pressable
            p="2"
            onPress={() => {
              showDatePicker();
            }}
            onPressIn={() => {
              setColor(colors["primary"]["800"]);
            }}
            onPressOut={() => {
              setColor(colors["primary"]["600"]);
            }}
          >
            <Foundation name="calendar" size={50} color={color} />
          </Pressable>
        </Row>
      </FormControl>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};
