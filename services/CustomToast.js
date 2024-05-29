import { Row, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
function ToastComponent({ state, message }) {
  return (
    <Row
      alignItems={"center"}
      space="2"
      bg={state === "Success" ? "success.700" : "error.700"}
      px="2"
      py="4"
      rounded="sm"
      mb={5}
      mx={5}
    >
      {state === "Success" ? (
        <AntDesign name="checkcircle" size={24} color="white" />
      ) : (
        <AntDesign name="exclamationcircle" size={24} color="white" />
      )}
      <Text color={"white"} style={{ fontFamily: "Poppins-Regular" }}>
        {message}
      </Text>
    </Row>
  );
}

export default ToastComponent;
