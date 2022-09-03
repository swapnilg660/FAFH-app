import {
  AntDesign,
  Feather,
  Foundation,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
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
  VStack,
} from "native-base";
import React from "react";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const RECIPE_CONTAINER_HEIGHT = 220;
const RECIPE_CONTAINER_WIDTH = 200;

function Recipes({ navigation }) {
  const { height, width } = useWindowDimensions();
  const { colors,sizes } = useTheme();

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

  const recipes = [
    {
      name: "Pancakes",
      image:
        "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F02%2F17%2F21014-Good-old-Fashioned-Pancakes-mfs_002.jpg",
    },

    { name: "Rice", image: undefined },
    { name: "Chocolate Cake", image: undefined },
    { name: "Baked Salmon with cheese", image: undefined },
    { name: "Mash Potato", image: undefined },
    { name: "Beef Stew", image: undefined },
    { name: "Chicken Curry", image: undefined },
    { name: "Pasta", image: undefined },
    { name: "Burger", image: undefined },
    { name: "Pizza", image: undefined },
    { name: "Pancakes", image: undefined },
    { name: "Chow Mein", image: undefined },
    { name: "Chicken Tikka Masala", image: undefined },
    { name: "Chicken Noodle Soup", image: undefined },
    { name: "Chicken Pot Pie", image: undefined },
  ];
  const [bookMarkedRecipes, setBookMarkedRecipes] = React.useState(
    recipes.map(r => r.name).filter((recipe) => recipe.length > 10)
  );
  const newRecipes = [
    { name: "Ramen", rating: 3, author: "John Doe" },
    { name: "Steak with Tomato", rating: 2, author: "Kev Milner" },
    { name: "Chow Fan", rating: 4, author: "Roelien Brinks" },
    { name: "Alfredo Pasta", rating: 5, author: "Patrick Vierra" },
    { name: "Beef Chow mein", rating: 1, author: "Kenan Malale" },
  ];
  return (
    <>
      <SafeAreaView></SafeAreaView>
      <ScrollView flex={1} h={height} background={"#FFFDFA"}>
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
                    filterList.includes(item) ? "primary.600" : "muted.100"
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
          <HStack
            mt={RECIPE_CONTAINER_HEIGHT / 4 + 20}
            m={5}
            space={3}
            justifyContent="space-around"
          >
            {recipes.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  navigation.navigate("RecipesInfo", { item: item });
                }}
              >
                <Center
                  style={{
                    backgroundColor: "#D9D9D970",
                  }}
                  rounded="2xl"
                  pt={RECIPE_CONTAINER_HEIGHT / 4}
                  h={RECIPE_CONTAINER_HEIGHT}
                  width={RECIPE_CONTAINER_WIDTH}
                  position={"relative"}
                >
                  {/* Recipe image */}
                  <Center
                    bg="blue.400"
                    rounded="full"
                    position={"absolute"}
                    top={-(RECIPE_CONTAINER_HEIGHT - 20) / 4}
                    zIndex={1}
                    width={RECIPE_CONTAINER_WIDTH * 0.7}
                    height={(RECIPE_CONTAINER_HEIGHT - 20) * 0.7}
                  >
                    <HStack
                      bottom={(RECIPE_CONTAINER_HEIGHT - 20) / 2}
                      right={-(RECIPE_CONTAINER_WIDTH * 0.7) / 4 + 10}
                      zIndex={2}
                      width={(RECIPE_CONTAINER_WIDTH * 0.7) / 2}
                      position={"absolute"}
                      background={"secondary.100"}
                      space="3"
                      alignItems="center"
                      p={"1"}
                      px={2}
                      rounded="lg"
                      justifyContent={"center"}
                    >
                      <Foundation
                        name="star"
                        size={24}
                        color={colors.secondary["600"]}
                      />
                      <Text style={{ fontFamily: "Poppins-SemiBold" }}>
                        4.5
                      </Text>
                    </HStack>
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: sizes["2xl"],
                      }}
                      source={{ uri: item.image }}
                      alt={`${item.name} image`}
                      srcset=""
                    />
                  </Center>

                  <Heading
                    style={{
                      fontFamily: "Poppins-Regular",
                      textAlign: "center",
                    }}
                  >
                    {item.name}
                  </Heading>
                  <HStack
                    space="3"
                    alignItems="center"
                    position={"absolute"}
                    bottom={"0"}
                    left={"0"}
                    p={2}
                    justifyContent={"space-between"}
                    width={"100%"}
                    zIndex={4}
                  >
                    <VStack>
                      <Text
                        style={{ fontFamily: "Poppins-Light" }}
                        color="muted.500"
                      >
                        Time
                      </Text>
                      <Text style={{ fontFamily: "Poppins-Medium" }}>
                        45 Mins
                      </Text>
                    </VStack>
                    {bookMarkedRecipes.includes(item) ? (
                      <TouchableOpacity
                        onPress={() => {
                          setBookMarkedRecipes((prev) => {
                            return prev.filter((i) => i !== item);
                          });
                        }}
                      >
                        <MaterialIcons
                          name="bookmark"
                          size={34}
                          color={colors["primary"]["600"]}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setBookMarkedRecipes((prev) => {
                            return [...prev, item];
                          });
                        }}
                      >
                        <MaterialIcons
                          name="bookmark-border"
                          size={34}
                          color={colors["primary"]["600"]}
                        />
                      </TouchableOpacity>
                    )}
                  </HStack>
                </Center>
              </Pressable>
            ))}
          </HStack>
        </ScrollView>
        <Heading px={"10px"} style={{ fontFamily: "Poppins-SemiBold" }}>
          New Recipes
        </Heading>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {newRecipes.map((item, index) => (
            <VStack
              space={3}
              justifyContent="flex-start"
              key={index}
              width={width * 0.9}
              m={3}
              mt={(height * 0.18) / 3}
              p={3}
              rounded="2xl"
              // height={height * 0.18}
              borderWidth={0.5}
              borderColor="muted.200"
              backgroundColor={"#fff"}
            >
              <Center
                position={"absolute"}
                right={"20px"}
                top={-(height * 0.15) / 3}
                bg="primary.400"
                height={height * 0.15}
                width={height * 0.15}
                rounded="full"
              >
                Image
              </Center>
              <Heading
                isTruncated={true}
                width={width * 0.9 - height * 0.15 - 30}
                style={{ fontFamily: "Poppins-Medium" }}
              >
                {item.name}
              </Heading>
              {/* rating */}
              <HStack space="3" alignItems="center">
                {[...Array(item.rating)].map((_, index) => (
                  <Foundation
                    key={index}
                    name="star"
                    size={24}
                    color={colors.secondary["600"]}
                  />
                ))}
                {[...Array(5 - item.rating)].map((_, index) => (
                  <Foundation
                    key={index}
                    name="star"
                    size={24}
                    color={colors.secondary["100"]}
                  />
                ))}
              </HStack>
              {/* Author */}
              <HStack space="3" alignItems="center">
                <Text style={{ fontFamily: "Poppins-Light" }} color="muted.500">
                  By
                </Text>
                <Center
                  width={"45px"}
                  height={"45px"}
                  background="fuchsia.400"
                  rounded="full"
                  _text={{
                    style: { fontFamily: "Poppins-SemiBold", fontSize: 20 },
                  }}
                >
                  {item.author.substring(0, 1)}
                </Center>
                <Text style={{ fontFamily: "Poppins-Medium", fontSize: 20 }}>
                  {item.author}
                </Text>
              </HStack>
            </VStack>
          ))}
        </ScrollView>
      </ScrollView>
    </>
  );
}

export default Recipes;
