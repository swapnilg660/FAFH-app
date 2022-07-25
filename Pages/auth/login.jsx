import React, { useState, useContext } from "react";
import { GoogleIcon, FacebookIcon } from "../../Components/customSvgIcon";
import AuthContext from "../../hooks/context";
import { MaterialIcons } from "@expo/vector-icons";

import { StyleSheet, View, SafeAreaView } from "react-native";
import AnimatedCheckbox from "react-native-checkbox-reanimated";
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
  Divider,
  Text,
  Icon,
  Pressable,
  Row,
  useTheme,
  Checkbox,
  Spinner,
} from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";
import ToastComponent from "../../services/CustomToast";

function Login({ navigation }) {
  const { signIn } = React.useContext(AuthContext);

  // UI utilities
  const [show, setShow] = useState(true);
  const { colors } = useTheme();
  const [linkColor, setLinkColor] = useState(colors["black"][500]);
  const [feedback, setFeedback] = useState(null);
  const toast = useToast();

  //form states
  const initialValues = {
    email: "",
    password: "",
  };
  const [checked, setChecked] = useState(true);

  const handleCheckboxPress = () => {
    setChecked((prev) => {
      return !prev;
    });
  };

  const handleSubmit = (data, formikActions) => {
    signIn({
      ...data,
      stayLoggedIn: checked,
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
    email: Yup.string().trim().email("Invalid email").required("Required"),
    password: Yup.string()
      .trim()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
  });

  return (
    <ScrollView border="2" bg={"primary.100"} safeAreaTop pt={10}>
      <Center mt={20} mb={10}>
        <Heading
          style={{ fontFamily: "Poppins-Medium" }}
          fontSize={"2xl"}
          fontStyle="italic"
          color={"darkText"}
        >
          Login to your account
        </Heading>
      </Center>
      <Box mx="5" bg="white" p="4" rounded="lg">
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
            const { email, password } = values;
            return (
              <>
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
                    placeholder="example@gmail.com"
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

                <Pressable
                  onPress={handleCheckboxPress}
                  w="40%"
                  my={2}
                  display="flex"
                >
                  <Row alignItems={"center"}>
                    <Center w={5} h={5} m={1}>
                      <AnimatedCheckbox
                        checked={checked}
                        highlightColor={colors["primary"][100]}
                        checkmarkColor={colors["secondary"][500]}
                        boxOutlineColor={colors["secondary"][500]}
                      />
                    </Center>

                    <Text
                      color={"black"}
                      style={{ fontFamily: "Poppins-Regular" }}
                    >
                      Remember Me
                    </Text>
                  </Row>
                </Pressable>

                <Button
                  shadow={3}
                  _text={{
                    style: {
                      fontFamily: "Poppins-SemiBold",
                    },
                    fontSize: "xl",
                  }}
                  size="sm"
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
                <Pressable
                  onPress={() => {
                    navigation.navigate("ForgotPassword");
                  }}
                  onPressIn={() => {
                    setLinkColor(colors["secondary"][500]);
                  }}
                >
                  <Text
                    textAlign="right"
                    style={{ fontFamily: "Poppins-Regular", color: linkColor }}
                  >
                    Forgot Password
                  </Text>
                </Pressable>
                <Divider my={7} bg="gray.500" />
                <Row space="md" justifyContent={"center"} alignItems="center">
                  <Pressable
                    onPress={() => {
                      googleSignIn();
                    }}
                  >
                    <GoogleIcon width="70" />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      //Login code
                      console.log("Fb Login");
                    }}
                  >
                    <FacebookIcon width="70" />
                  </Pressable>
                </Row>

                <Row space="2" justifyContent={"center"} alignItems="center">
                  <Text style={{ fontFamily: "Poppins-SemiBold" }}>
                    Don't have an account ?
                  </Text>
                  <Pressable
                    onPress={() => {
                      console.log("Go to register page");
                      navigation.navigate("Register");
                    }}
                  >
                    <Text
                      color={"secondary.500"}
                      my="5"
                      style={{ fontFamily: "Poppins-SemiBold" }}
                    >
                      Register
                    </Text>
                  </Pressable>
                </Row>
              </>
            );
          }}
        </Formik>
      </Box>
    </ScrollView>
  );
}

export default React.memo(Login);

// Old CSS
const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    marginLeft: 20,
    marginTop: 40,
    fontFamily: "Inter-Black",
  },
  loginInputContainer: {
    marginTop: 35,
    padding: 20,
    position: "relative",
    borderRadius: 10,
  },
  checkbox: {
    height: 30,
    width: 30,
  },
  buttonWrapper: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  SocialContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialLoginContainer: {
    width: 55,
    padding: 5,
    marginHorizontal: 10,
    marginTop: 20,
    alignItems: "center",
    borderRadius: 90,
  },
  DontHaveAccount: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  DontHaveAccountText: {
    fontFamily: "Inter-ExtraLight",
    fontSize: 15,
    marginHorizontal: 10,
  },

  //divider style
  mainContainer: {
    marginTop: 30,
    height: 10,
    width: "100%",
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

// function Divider({ text, withText }) {
//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.divider}></View>
//       {withText ? <Text style={styles.text}>{text}</Text> : null}
//       {withText ? <View style={styles.divider}></View> : null}
//     </View>
//   );
// }

// Old code
{
  /* <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.loginInputContainer}>
          <InputText
            label="Email"
            placeholder="example@email.com"
            setValue={setEmail}
            value={email}
            required={true}
            type="email"
          />
          <InputText
            label="Password"
            placeholder="Password"
            setValue={setPassword}
            required={true}
            value={password}
            type="password"
          />
          <View
            style={{
              marginTop: 20,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable
              onPress={() => handleCheckboxPress()}
              style={styles.checkbox}
            >
              <AnimatedCheckbox
                checked={rememberMe}
                highlightColor={colors.primary}
                checkmarkColor={colors.secondary}
                boxOutlineColor={colors.primary}
              />
            </Pressable>
            <Text style={styles.DontHaveAccountText}>Remember Me</Text>
          </View>

          <View style={styles.buttonWrapper}>
            <Pressable
              onPress={() => {
                //Login code
                //Add form validation before submitting
                signIn({ email, password, stayLoggedIn: rememberMe });
              }}
            >
              <Text style={styles.loginText}>{"Login"}</Text>
            </Pressable>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}
          >
            <Text
              style={[
                styles.DontHaveAccountText,
                { textAlign: "right", marginTop: 20, color: colors.primary },
              ]}
            >
              Forgot Password ?
            </Text>
          </Pressable>
          <Divider withText={true} text="Or" />
          <View style={styles.SocialContainer}>
            <Pressable
              style={styles.socialLoginContainer}
              onPress={() => {
                //Login code
                googleSignIn();
              }}
            >
              <GoogleIcon width="70" />
            </Pressable>
            <Pressable
              style={styles.socialLoginContainer}
              onPress={() => {
                //Login code
                console.log("Fb Login");
              }}
            >
              <FacebookIcon width="70" />
            </Pressable>
          </View>
          <View style={styles.DontHaveAccount}>
            <Text style={styles.DontHaveAccountText}>
              Don't have an account ?
            </Text>
            <Pressable
              onPress={() => {
                console.log("Go to register page");
                navigation.navigate("Register");
              }}
            >
              <Text style={styles.DontHaveAccountLink}>Register</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView> */
}
