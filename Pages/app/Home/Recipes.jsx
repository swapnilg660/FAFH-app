import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Center,
  Heading,
  HStack,
  Input,
  Pressable,
  ScrollView,
  Text,
  useTheme,
} from "native-base";
import React from "react";
import { useWindowDimensions } from "react-native";

function Recipes({ navigation }) {
  const { height, width } = useWindowDimensions();
  const { colors } = useTheme();

  const [filterList, setFilterList] = React.useState(["All"]);
  const dataFilter = [
    "All",
    "Indian",
    "Chinese",
    "Italian",
    "Mexican",
    "Thai",
    "Japanese",
    "American",
    "French",
    "Spanish",
    "German",
    "Greek",
    "Nordic",
    "Eastern European",
    "Caribbean",
    "Middle Eastern",
    "South American",
    "African",
  ];
  return (
    <ScrollView flex={1} h={height}>
      <HStack space="3" alignItems="center" my={10} mx={5}>
        <Pressable
          onPress={() => {
            navigation.goBack();
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
        <Heading style={{ fontFamily: "Poppins-SemiBold" }}>Recipes</Heading>
      </HStack>

      {/* Search bar component with filter button */}
      <HStack
        space="3"
        alignItems="center"
        mx={5}
        justifyContent="space-between"
        // width={width}
      >
        <Input
          placeholder="Search recipes"
          leftElement={
            <Feather
              name="search"
              style={{ paddingLeft: 10 }}
              size={24}
              color={colors.primary["600"]}
            />
          }
          backgroundColor="white"
          borderRadius={"xl"}
          style={{ fontFamily: "Poppins-Light", fontSize: 18 }}
          flex={7}
        />
        <Pressable flex={1}>
          <Center bg="primary.600" p="2" pl={2.5} rounded="full">
            <MaterialIcons
              name="filter-list"
              size={21}
              color={colors["white"]}
            />
          </Center>
        </Pressable>
      </HStack>
      {/* Filter carrousel */}
      <HStack>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          {[
            ...filterList,
            ...dataFilter.filter((item) => !filterList.includes(item)),
          ].map((item, index) => (
            <Pressable
              onPress={() => {
                if (item != "All") {
                  setFilterList((prev) => {
                    if (prev.includes(item)) {
                      return prev.filter((i) => i !== item);
                    } else {
                      return [...prev, item];
                    }
                  });
                }
              }}
              key={index}
            >
              <Center
                backgroundColor={
                  filterList.includes(item) ? "primary.600" : "white"
                }
                borderWidth={filterList.includes(item) ? 1 : 0}
                borderColor="primary.600"
                borderRadius="md"
                p={2}
                mx={1}
                minW={20}
              >
                <Text
                  color={!filterList.includes(item) ? "primary.600" : "white"}
                >
                  {item}
                </Text>
              </Center>
            </Pressable>
          ))}
        </ScrollView>
      </HStack>
      {/* Recipes */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack mt={10} m={5} space={3} justifyContent="space-around">
          {[1, 23, 4, 4, 5, 6, 6, 6].map((item, index) => (
            <Box bg="primary.400" p="12" rounded="lg" key={index}>
              Box
            </Box>
          ))}
        </HStack>
      </ScrollView>
    </ScrollView>
  );
}

export default Recipes;
