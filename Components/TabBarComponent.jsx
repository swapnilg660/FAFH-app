import { TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { HomeIcon, InsightsIcon, ProfileIcon } from "./customSvgIcon";
import { Box, HStack, Text, useTheme } from "native-base";
import React from "react";

const IconSelector = ({ route, isFocused }) => {
  const { colors } = useTheme();
  const reduceDimensions = isFocused ? 5 : null;
  const color = isFocused
    ? colors["secondary"]["600"]
    : colors["primary"]["600"];
  switch (route.name) {
    case "HomeStack":
      return <HomeIcon fill={color} reduceDimensions={reduceDimensions} />;
    case "Insights":
      return <InsightsIcon fill={color} reduceDimensions={reduceDimensions} />;
    case "Profile":
      return <ProfileIcon fill={color} reduceDimensions={reduceDimensions} />;
    default:
      return null;
  }
};

function TabBarComponent({ state, descriptors, navigation }) {
  return (
    <HStack
      bg={"primary.50"}
      borderTopWidth={0.5}
      rounded={"xs"}
      p={1}
      borderTopColor={"primary.600"}
      alignItems={"center"}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const TabBarIcon = options.tabBarIcon;
        // TabBarIcon.props.color = "#00ff00";

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              flexDirection: "column",
              padding: 5,
              alignItems: "center",
            }}
          >
            {isFocused ? (
              <HStack
                space="3"
                alignItems="center"
                bg={"secondary.50"}
                rounded="full"
                p={3}
              >
                <IconSelector isFocused={isFocused} route={route} />
                <Text
                  fontSize={"md"}
                  color={"secondary.600"}
                  style={{ fontFamily: "Poppins-Light" }}
                >
                  {label}
                </Text>
              </HStack>
            ) : (
              <IconSelector isFocused={isFocused} route={route} />
            )}
          </TouchableOpacity>
        );
      })}
    </HStack>
  );
}

export default TabBarComponent;
