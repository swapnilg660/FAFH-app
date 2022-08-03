import React, { useState } from "react";
import { Alert, Modal, StyleSheet } from "react-native";
import { Box, Button, Center, HStack, Pressable, Text } from "native-base";

const AlertComponent = ({
  modalVisible,
  setModalVisible,
  message,
  action,
  bg,
}) => {
  return (
    <Box style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          if (action.length > 1) setModalVisible(!modalVisible);
        }}
      >
        <Box flex={1} justifyContent="center" alignItems="center" bg={"#5552"}>
          <Box
            style={styles.modalView}
            bg={bg}
            p={6}
            pb={5}
            borderWidth={0.5}
            borderColor={bg}
          >
            <Text
              style={{ fontFamily: "Poppins-Regular" }}
              color={"secondary.500"}
              fontSize={16}
              textAlign="center"
            >
              {message}
            </Text>
            {action.length > 1 ? (
              <HStack space="3" alignItems="center" pt={6}>
                <Button
                  colorScheme="secondary"
                  variant={"outline"}
                  onPress={action[0].onPress}
                  borderColor={"secondary.600"}
                >
                  {action[0].label}
                </Button>
                <Button colorScheme="secondary" onPress={action[1].onPress}>
                  {action[1].label}
                </Button>
              </HStack>
            ) : (
              <Button
                colorScheme="secondary"
                onPress={() => {
                  action[0].onPress();
                  setModalVisible(!modalVisible);
                }}
              >
                {action[0].label}
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
export default AlertComponent;
const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    // backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: "100%",
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
