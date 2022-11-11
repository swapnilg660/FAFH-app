import { Center, HStack, Pressable, ScrollView, Text } from "native-base";
import React, { useEffect } from "react";
import { InsightContext } from "../Pages/app/Insight/insightStack";
function Carrousel({ dataFilter }) {
  const { filterList, setFilterList } = React.useContext(InsightContext);
  if (!dataFilter.length > 0) {
    dataFilter = [
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
  }

  return (
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
                filterList.includes(item) ? "secondary.600" : "secondary.100"
              }
              borderWidth={filterList.includes(item) ? 1 : 0}
              borderColor="secondary.600"
              borderRadius="md"
              p={2}
              mx={1}
              minW={20}
            >
              <Text
                color={!filterList.includes(item) ? "secondary.600" : "white"}
              >
                {item}
              </Text>
            </Center>
          </Pressable>
        ))}
      </ScrollView>
    </HStack>
  );
}

export default Carrousel;
