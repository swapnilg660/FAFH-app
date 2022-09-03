import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import {
  Center,
  Heading,
  HStack,
  Input,
  Pressable,
  ScrollView,
  Text,
  useTheme,
} from "native-base";
import { useWindowDimensions } from "react-native";
import { color } from "react-native-reanimated";

function Recipes({ navigation }) {
  const { height, width } = useWindowDimensions();
  const { colors } = useTheme();
  const dataFilter = [
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
  ].sort();
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
      <HStack>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10 }}
        >
          {["All", ...dataFilter].map((item, index) => (
            <Pressable
              key={index}
              style={{
                backgroundColor: colors.primary["600"],
                borderRadius: 10,
                padding: 10,
                marginHorizontal: 5,
              }}
            >
              <Text style={{ color: colors["white"] }}>{item}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </HStack>
    </ScrollView>
  );
}

export default Recipes;
