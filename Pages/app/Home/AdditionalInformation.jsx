import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { Formik } from "formik";
import {
  Box,
  Button,
  Center,
  CheckIcon,
  Fab,
  FormControl,
  Heading,
  Icon,
  Input,
  Row,
  ScrollView,
  Select,
  Slide,
  Spinner,
  Text,
  useToast,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { useContext, useEffect } from "react";
import ToastComponent from "../../../services/CustomToast";
import useCountries from "use-countries";
import CountryFlag from "react-native-country-flag";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AuthContext from "../../../hooks/context";
import { getUser, updateUser } from "../../../services/mongoDB/users";

export default function AdditionalInformation({ navigation, setShowModal }) {
  const { saveAdditionalInformation, userToken, setUserProfileData } = useContext(AuthContext);
  [countriesToBeDisplayed, setCountriesToBeDisplayed] =  useState([]);
  const { window_height } = useWindowDimensions();
  const toast = useToast();
  const initialValues = {
    country: "",
    industry: "",
    profession: "",
    jobTime: "",
    height: "",
    heightUnit: "cm",
    weight: "",
    weightUnit: "kg",
  };
  // const saveAdditionalInformation = useContext(AuthContext);

  const handleSubmit = (data, formikAction) => {
    console.log(data);
    updateUser(userToken, data);

    formikAction.setSubmitting(false);
    setShowModal(false);
    getUser(setUserProfileData);
    // formikAction.resetForm();
    // close the modal on success
    // toast.show({
    //   placement: "top",
    //   render: () => (
    //     <ToastComponent
    //       state={res === "Success" ? "Success" : "Error"}
    //       message={res === "Success" ? "Logged in Successfully" : res}
    //     />
    //   ),
    // });

    // .catch((err) => {
    //   console.log(err);
    //   formikAction.setSubmitting(false);
    //   toast.show({
    //     placement: "top",
    //     render: () => (
    //       <ToastComponent
    //         state="Error"
    //         message="Something went wrong, please try again"
    //       />
    //     ),
    //   });
    // })
    // .finally(() => {
    //   formikAction.setSubmitting(false);
    // });
  };

  return (
    <ScrollView px={5} backgroundColor={"primary.50"}>
      <Box p="2" rounded="lg">
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={(values, formikActions) => {
            handleSubmit(values, formikActions);
          }}
        >
          {({ handleChange, setFieldValue, handleBlur, handleSubmit, values, touched, errors, isSubmitting }) => {
            const { country, jobTime, profession, industry, weight, height, weightUnit, heightUnit } = values;

            return (
              <VStack
                space="2"
                h={window_height}
                backgroundColor={"white"}
                p={3}
                mt={10}
                borderRadius={20}
                // borderWidth={1}
              >
                <Center mb={2}>
                  <Heading fontWeight={"400"} fontSize={"2xl"} color={"darkText"}>
                    Additional Information
                  </Heading>
                  <Text fontWeight={"200"} textAlign={"center"} color={"darkText"} m={4}>
                    This information is need for the application to work best for you 😉
                  </Text>
                </Center>
                <FormControl isRequired>
                  <FormControl.Label fontWeight={"300"}>
                    <Text color={"black"}>In which country do you reside?</Text>
                  </FormControl.Label>
                  <SelectCountry country={country} setFieldValue={setFieldValue} />
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    Please make a selection!
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired>
                  <FormControl.Label>In which industry do you work?</FormControl.Label>
                  <Select
                    borderColor={"primary.100"}
                    selectedValue={industry}
                    accessibilityLabel="Choose your industry"
                    fontWeight={"300"}
                    _selectedItem={{
                      bg: "primary.100",
                      endIcon: <CheckIcon size={5} />,
                      borderRadius: "20",
                    }}
                    mt={1}
                    onValueChange={(itemValue) => setFieldValue("industry", itemValue)}
                    placeholder="Choose an Industry"
                    // minWidth="64"
                  >
                    <Select.Item label="Agriculture" value="Agriculture" />
                    <Select.Item label="Commerce" value="Commerce" />
                    <Select.Item label="Chemical" value="Chemical" />
                    <Select.Item label="Construction" value="Construction" />
                    <Select.Item label="Health" value="Health" />
                    <Select.Item label="Education" value="Education" />
                    <Select.Item label="Information Technology" value="Information Technology" />
                  </Select>
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    Please make a selection!
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired>
                  <FormControl.Label>What is your current job title?</FormControl.Label>
                  <Input
                    borderColor={"primary.100"}
                    value={profession}
                    onChangeText={handleChange("profession")}
                    onBlur={handleBlur("profession")}
                    p={2}
                    fontWeight={"300"}
                    fontSize={"md"}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormControl.Label>How long have you been working?</FormControl.Label>
                  <Select
                    borderColor={"primary.100"}
                    selectedValue={jobTime}
                    accessibilityLabel="Choose your industry"
                    fontWeight={"300"}
                    _selectedItem={{
                      bg: "primary.100",
                      endIcon: <CheckIcon size={5} />,
                      borderRadius: "20",
                    }}
                    mt={1}
                    onValueChange={(itemValue) => setFieldValue("jobTime", itemValue)}
                    placeholder="Choose a time frame"
                    minWidth="64"
                  >
                    <Select.Item label="1 - 3 years" value="1-3" />
                    <Select.Item label="3 - 5 years" value="3-5" />
                    <Select.Item label="5 - 10 years" value="5-10" />
                    <Select.Item label="10 - 15 years" value="10-15" />
                    <Select.Item label="15 - 20 years" value="15-20" />
                    <Select.Item label="20+ years" value="20+" />
                  </Select>
                </FormControl>
                <Row space={2}>
                  <FormControl width={"50%"} isInvalid={touched.weight && errors.weight}>
                    <FormControl.Label>
                      <Text color={"black"}>Weight</Text>
                    </FormControl.Label>
                    <Input
                      value={weight}
                      onValueChange={(itemValue) => setFieldValue("weight", itemValue)}
                      onBlur={handleBlur("weight")}
                      placeholder="0.0"
                      fontWeight={"300"}
                      fontSize={"md"}
                      rightElement={
                        <FormControl backgroundColor={"primary.600"} width={"50%"} p={0}>
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
                    <FormControl.ErrorMessage>{touched.weight && errors.weight}</FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl width={"50%"} isInvalid={touched.height && errors.height}>
                    <FormControl.Label>
                      <Text color={"black"}>Height</Text>
                    </FormControl.Label>
                    <Input
                      value={height}
                      onChangeText={(itemValue) => setFieldValue("height", itemValue)}
                      onBlur={handleBlur("height")}
                      placeholder="0.0"
                      fontWeight={"300"}
                      fontSize={"md"}
                      rightElement={
                        <FormControl backgroundColor={"primary.600"} width={"50%"} p={0}>
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
                    <FormControl.ErrorMessage>{touched.height && errors.height}</FormControl.ErrorMessage>
                  </FormControl>
                </Row>

                <Button shadow={3} size="md" colorScheme="primary" mt={5} onPress={!isSubmitting ? handleSubmit : null}>
                  {isSubmitting ? <Spinner size="sm" color={"white"} /> : "Save"}
                </Button>
                <Button
                  colorScheme="secondary"
                  backgroundColor={"secondary.400"}
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Skip
                </Button>
              </VStack>
            );
          }}
        </Formik>
      </Box>
    </ScrollView>
  );
}

const SelectCountry = ({ country, setFieldValue }) => {
  const { countries } = useCountries();
  useEffect(() => {}, []);

  return (
    <Select
      borderColor={"primary.100"}
      selectedValue={country}
      accessibilityLabel="In which country do you reside?"
      placeholder="Choose a Country"
      fontWeight={"300"}
      _selectedItem={{
        bg: "primary.100",
        endIcon: <CheckIcon size={5} />,
        borderRadius: "20",
      }}
      mt={1}
      onValueChange={(itemValue) => setFieldValue("country", itemValue)}
      _actionSheetBody={{
        ListHeaderComponent: (
          <FormControl>
            <FormControl.Label>Search for a country</FormControl.Label>
            <Input
              p={2}
              placeholder="Search..."
              onChangeText={(e) => {
                setCountriesToBeDisplayed(() =>
                  countries.filter((country) => country.name.toLowerCase().includes(e.toLowerCase()))
                );
              }}
            />
          </FormControl>
        ),
      }}
    >
      {countries.map((country, index) => (
        <Select.Item
          key={Math.floor(Math.random() * 100000)}
          leftIcon={<CountryFlag key={index} isoCode={country.code} size={25} />}
          label={country.name}
          value={country.code}
        />
      ))}
    </Select>
  );
};
