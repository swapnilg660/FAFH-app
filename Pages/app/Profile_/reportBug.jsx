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
} from "native-base";
import { SafeAreaView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

function ReportBug({ navigation }) {
  const { colors } = useTheme();
  const initialValues = {
    comment: "",
    title: "",
  };

  const validationSchema = Yup.object({
    comment: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
  });

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.setSubmitting(true);
    setTimeout(() => {
      formikActions.setSubmitting(false);
      toast.show({
        placement: "top",
        render: () => (
          <ToastComponent
            state={true ? "Success" : "Error"}
            message={true ? "Profile Updated Successfully" : res}
          />
        ),
      });
      navigation.goBack();
    }, 2000);
    // actions.resetForm()
  };

  useEffect(() => {});

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
                      height={200}
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

                  <Box>
                    <VStack space={1}>
                      <Heading
                        style={{ fontFamily: "Poppins-SemiBold" }}
                        color={"black"}
                        fontSize={"lg"}
                      >
                        Attach a screenshot
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
                            console.log("hello");
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
                  </Box>

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
