import { Center, Pressable, Text, useTheme, VStack } from "native-base";

function Category({ name, Icon, onPress, bg, blurred, selected }) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <VStack space="1" alignItems={"center"}>
        <Center
        rounded="full"
          borderWidth={3}
          borderColor={selected ? colors.primary["600"] : "transparent"}
        >
          <Center
            bg={blurred ? "muted.500" : bg}
            rounded={"full"}
            size="16"
            borderWidth={3}
            borderColor="transparent"
          >
            <Icon />
          </Center>
        </Center>

        <Text style={{ fontFamily: "Poppins-Light" }}>{name}</Text>
      </VStack>
    </Pressable>
  );
}

export default Category;
