import React, { useState, useContext, useRef, useEffect } from "react";
import AuthContext from "../../hooks/context";
import { MaterialIcons } from "@expo/vector-icons";

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
  Checkbox,
  Spinner,
  StatusBar,
  View,
} from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Foundation } from "@expo/vector-icons";

import ToastComponent from "../../services/CustomToast";
import { Animated, Button as RnButton } from "react-native";

function Register({ navigation }) {
  //Animations
  const popInAnimation = useRef(new Animated.Value(500)).current;

  const { signIn } = React.useContext(AuthContext);

  // UI utilities
  const [show, setShow] = useState(true);
  const { colors } = useTheme();
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
    weight: "",
  };

  const handleSubmit = (data, formikActions) => {
    signIn({
      ...data,
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
    cell: Yup.string().matches(new RegExp("[0-9]{10}"), "Invalid Cell Number"),
    doB: Yup.date()
      .default(function () {
        return new Date();
      })
      .required("Required"),
  });

  useEffect(() => {
    Animated.timing(popInAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <>
      <StatusBar />
      <ScrollView bg="primary.50">
        <Center mt={10} mb={10}>
          <Heading
            style={{ fontFamily: "Poppins-Medium" }}
            fontSize={"xl"}
            fontStyle="italic"
            color={"darkText"}
          >
            Hello!
          </Heading>

          <Text
            style={{ fontFamily: "Poppins-Light" }}
            color={"darkText"}
            m={4}
          >
            Welcome to Food Away From Home.
          </Text>
          <Heading
            style={{ fontFamily: "Poppins-Medium" }}
            fontSize={"2xl"}
            fontStyle="italic"
            color={"darkText"}
          >
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
                const { name, email, password, confirmPassword, cell, doB } =
                  values;
                return (
                  <>
                    <FormControl
                      isRequired
                      isInvalid={touched.name && errors.name}
                    >
                      <FormControl.Label>
                        <Text
                          color={"black"}
                          style={{ fontFamily: "Poppins-Regular" }}
                        >
                          Name & Surname
                        </Text>
                      </FormControl.Label>
                      <Input
                        value={name}
                        onChangeText={handleChange("name")}
                        onBlur={handleBlur("name")}
                        p={2}
                        placeholder="Heritier Kaumbu"
                        placeholderTextColor="gray.400"
                        _input={{ color: "black" }}
                        style={{ fontFamily: "Poppins-Regular" }}
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
                        <Text
                          color={"black"}
                          style={{ fontFamily: "Poppins-Regular" }}
                        >
                          Email
                        </Text>
                      </FormControl.Label>
                      <Input
                        value={email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        p={2}
                        placeholder="email@example.com"
                        placeholderTextColor="gray.400"
                        _input={{ color: "black" }}
                        style={{ fontFamily: "Poppins-Regular" }}
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
                        <Text
                          color={"black"}
                          style={{ fontFamily: "Poppins-Regular" }}
                        >
                          Password
                        </Text>
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
                        style={{ fontFamily: "Poppins-Regular" }}
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
                        <Text
                          color={"black"}
                          style={{ fontFamily: "Poppins-Regular" }}
                        >
                          Confirm Password
                        </Text>
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
                        style={{ fontFamily: "Poppins-Regular" }}
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
                        <Text
                          color={"black"}
                          style={{ fontFamily: "Poppins-Regular" }}
                        >
                          Cell.no
                        </Text>
                      </FormControl.Label>
                      <Input
                        value={cell}
                        onChangeText={handleChange("cell")}
                        onBlur={handleBlur("cell")}
                        p={2}
                        placeholder="0123456789"
                        placeholderTextColor="gray.400"
                        _input={{ color: "black" }}
                        style={{ fontFamily: "Poppins-Regular" }}
                        fontSize={"md"}
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
                    <Button
                      shadow={3}
                      _text={{
                        style: {
                          fontFamily: "Poppins-SemiBold",
                        },
                        fontSize: "lg",
                      }}
                      size="md"
                      colorScheme="secondary"
                      my={5}
                      onPress={!isSubmitting ? handleSubmit : null}
                    >
                      {isSubmitting ? (
                        <Spinner size="sm" color={"white"} />
                      ) : (
                        "LOGIN"
                      )}
                    </Button>
                    <Row
                      space="2"
                      justifyContent={"center"}
                      alignItems="center"
                    >
                      <Text style={{ fontFamily: "Poppins-SemiBold" }}>
                        Already have an account?
                      </Text>
                      <Pressable
                        onPress={() => {
                          navigation.navigate("Login");
                        }}
                      >
                        <Text
                          color={"secondary.500"}
                          my="5"
                          // mb={5}
                          style={{ fontFamily: "Poppins-SemiBold" }}
                        >
                          Login
                        </Text>
                      </Pressable>
                    </Row>
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
    console.log(
      "A date has been picked: ",
      moment(date).format("MMMM Do YYYY")
    );
    setFieldValue("doB", moment(date).format("MMMM Do YYYY"));
    hideDatePicker();
  };
  useEffect(() => {
    console.log(moment());
  }, []);

  return (
    <>
      <FormControl>
        <FormControl.Label>
          <Text color={"black"} style={{ fontFamily: "Poppins-Regular" }}>
            Date of Birth
          </Text>
        </FormControl.Label>
        <Row>
          <Input
            isDisabled={true}
            value={doB}
            p={2}
            _input={{ color: "black" }}
            style={{ fontFamily: "Poppins-Regular" }}
            fontSize={"md"}
            width="80%"
          />
          <Pressable
            p="2"
            onPress={() => {
              showDatePicker();
              console.log("pressed");
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
