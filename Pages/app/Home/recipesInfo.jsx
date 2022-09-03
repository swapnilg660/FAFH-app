// components
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  ScrollView,
  Spacer,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";

// icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

const RecipesInfo = () => {
  const { colors } = useTheme();
  const [serving, setServing] = useState(1);
  const recipe = {
    _id: "6312b2816bf2ba37443a298e",
    userId: "sgfgdfgdfg",
    recipeId: "c1540774-29e8-4dfb-82df-8c9632d80358",
    type: "breakfast",
    category: "protein",
    userName: "Suprise Ngoveni",
    name: "Pancakes",
    rating: 0,
    comments: 0,
    calories: 24,
    totalTime: 40,
    prepTime: 23,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    ingredients: ["1/2 milk", "2 cpus of flower"],
    servings: 0,
    directions: [
      {
        title: "break eggs",
        description: "break eggs and stir well",
      },
      {
        title: "mix well",
        description: "mix eggs with milk and flavour",
      },
    ],
    ratingId: "044be094-7936-4fb9-b0ff-527ceb6eb164",
    shared: 0,
    bookmarked: 0,
    datePosted: "2022-09-03T01:48:49.744Z",
    __v: 0,
  };

  return (
    // <SafeAreaView style={{ backgroundColor: "red", flex: 1, height: "90%" }}>
    <View overflowY="scroll">
      <Box>
        <Box h="30%">
          <ImageBackground
            source={{
              uri: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F02%2F17%2F21014-Good-old-Fashioned-Pancakes-mfs_002.jpg",
            }}
            style={styles.backgroundImage}
          >
            <Flex justify="flex-end" h="100%">
              <HStack>
                <Button bgColor="transparent" p={0}>
                  <HStack space={1} pl={2}>
                    <Ionicons name="bookmark-outline" size={24} color="black" />
                    <Text color="white" fontSize="sm" pt={2} pr={2}>
                      Bookmark
                    </Text>
                  </HStack>
                </Button>
                <Spacer h={50} borderRightWidth={1} borderColor="lightgrey" />
                <Button bgColor="transparent" p={0}>
                  <HStack space={1} pl={2}>
                    <MaterialIcons
                      name="add-to-photos"
                      size={24}
                      color="black"
                    />
                    <Text color="white" fontSize="sm" pt={2} pr={2}>
                      Add to collection
                    </Text>
                  </HStack>
                </Button>
                <Spacer h={50} borderRightWidth={1} borderColor="lightgrey" />
                <Button bgColor="transparent" p={0}>
                  <HStack space={1} pl={2}>
                    <AntDesign name="sharealt" size={24} color="black" />
                    <Text color="white" fontSize="sm" pt={2} pr={2}>
                      Share
                    </Text>
                  </HStack>
                </Button>
              </HStack>
            </Flex>
          </ImageBackground>
        </Box>

        <Box m={3}>
          <Heading>{recipe.name}</Heading>
          <Text opacity={0.6}>
            by <Text bold>{recipe.userName}</Text> Updated:{" "}
            {new Date(recipe.datePosted).toLocaleDateString()}
          </Text>
        </Box>
        <HStack
          justifyContent="space-between"
          bgColor={colors.orange[200]}
          p={2}
        >
          <HStack space={2}>
            <SimpleLineIcons name="fire" size={24} color="black" />
            <VStack>
              <Text>{recipe.calories}</Text>
              <Text>Calories</Text>
            </VStack>
          </HStack>
          <HStack space={2}>
            <AntDesign name="clockcircleo" size={24} color="black" />
            <VStack>
              <Text>{recipe.totalTime}</Text>
              <Text>Total Time</Text>
            </VStack>
          </HStack>
          <HStack space={2}>
            <AntDesign name="clockcircleo" size={24} color="black" />
            <VStack>
              <Text>{recipe.prepTime}</Text>
              <Text>Prep Time</Text>
            </VStack>
          </HStack>
        </HStack>
        <Box m={3}>
          <Text noOfLines={4}>{recipe.description}</Text>
          <Flex direction="row" justify="flex-end">
            <Button bgColor="transparent" p={0} m={0}>
              <Text color="green.700">Read more</Text>
            </Button>
          </Flex>
          <Spacer borderBottomWidth={1} borderColor="lightgrey" my={3} />

          <Heading>Ingredients of {recipe.name}</Heading>
          <HStack>
            <Text>{serving + " Serving(s)"} </Text>
            <Button
              rounded="full"
              borderColor="lightgrey"
              borderWidth={1}
              bgColor="transparent"
              h={10}
              // px={3}
              onPress={() => setServing(serving - 1)}
            >
              <Text>-</Text>
            </Button>
            <Button
              rounded="full"
              borderColor="lightgrey"
              borderWidth={1}
              bgColor="transparent"
              h={10}
              // px={3}
              onPress={() => setServing(serving - 1)}
            >
              <Text>+</Text>
            </Button>
          </HStack>

          <VStack mt={2}>
            {recipe.ingredients.map((ingredient, index) => (
              <Text key={index}>
                <Entypo name="dot-single" size={20} color="black" />
                {ingredient.split(" ")[0] * serving + " " + ingredient.slice(1)}
              </Text>
            ))}
          </VStack>

          <Heading>HOW TO MAKE {recipe.name.toUpperCase()}</Heading>
          {recipe.directions.map((direction, index) => (
            <VStack key={index}>
              <Text bold>
                Step {index + 1}: {direction.title}
              </Text>
              <Text>{direction.description}</Text>
            </VStack>
          ))}
        </Box>
      </Box>
    </View>
    // </SafeAreaView>
  );
};

export default RecipesInfo;

const styles = StyleSheet.create({
  backgroundImage: {
    // flex: 1,
    // width: "100%",
    // justifyContent: "center",
  },
});
