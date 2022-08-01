import { Button, ScrollView } from "native-base";
import React, { useState, useEffect, useContext } from "react";
// import styles from "react-native-animated-input/src/AnimatedInput/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "../../../hooks/context";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";
// import colors from assets/colors/colors.js
import { useTheme } from "native-base";
import { Avatar } from "react-native-paper";
import { Card, Title, Paragraph } from "react-native-paper";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

function Profile({ navigation }) {
  const { signOut } = useContext(AuthContext);
  const { colors } = useTheme();

  return (
    <SafeAreaView>
      <View style={styles.pageContaner}>
        <View style={styles.nameContainer}>
          <Text style={styles.logoutButtonText}>Hi, Priya</Text>
          <MaterialIcons
            name="more-vert"
            size={25}
            color={colors["light"]["100"]}
          />
        </View>

        {/* secondary container */}

        <View style={styles.secondaryContainer}>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={120}
              source={require("../../../assets/images/profile.png")}
              style={styles.profileAvatar}
            />
          </View>
          {/* First card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <View style={{ justifyContent: "center" }}>
                <MaterialIcons
                  name="quick-contacts-mail"
                  size={24}
                  color={colors["warning"]["500"]}
                />
              </View>
              <View style={{ width: "50%" }}>
                <Text style={styles.cardLightText}>Full name</Text>
                <Text style={styles.cardDarkText}>Priya Sing</Text>
              </View>
              <View
                style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
              >
                <Text style={styles.cardOrangeText}>05/07/1990</Text>
                <Foundation
                  name="female-symbol"
                  size={24}
                  color={colors["warning"]["500"]}
                />
              </View>
            </View>
          </Card>

          {/* second card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <View style={{ justifyContent: "center" }}>
                <MaterialCommunityIcons
                  name="phone"
                  size={24}
                  color={colors["warning"]["500"]}
                />
              </View>
              <View style={{ width: "85%" }}>
                <View
                  style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
                >
                  <Text style={styles.cardOrangeText}>priyasing@gmail.com</Text>
                </View>
                <Text style={styles.cardLightText}>Contact</Text>
                <Text style={styles.cardDarkText}>082 048 8989</Text>
              </View>
            </View>
          </Card>

          {/* Third card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <View style={{ justifyContent: "center" }}>
                <MaterialCommunityIcons
                  name="weight-kilogram"
                  size={24}
                  color={colors["warning"]["500"]}
                />
              </View>
              <View>
                <Text style={styles.cardLightText}>Weight</Text>
                <Text style={styles.cardDarkText}>50Kg</Text>
              </View>
              <View>
                <Text style={styles.cardLightText}>Height</Text>
                <Text style={styles.cardDarkText}>160 cm</Text>
              </View>
              <View>
                <Text style={styles.cardOrangeText}>Height</Text>
                <Text style={styles.cardOrangeText}>160 cm</Text>
              </View>
            </View>
          </Card>

          {/* Fourth Card */}
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <View style={{ justifyContent: "center" }}>
                <MaterialCommunityIcons
                  name="phone"
                  size={24}
                  color={colors["warning"]["500"]}
                />
              </View>
              <View style={{ width: "85%" }}>
                <Text style={styles.cardLightText}>Blood type</Text>
                <Text style={styles.cardDarkText}>A+</Text>
              </View>
            </View>
          </Card>
          <TouchableOpacity
            onPress={() => signOut()}
            style={styles.logoutButton}
          >
            <Text onPress={() => signOut()} style={styles.logoutButtonText}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default React.memo(Profile);

const styles = StyleSheet.create({
  pageContaner: {
    backgroundColor: "white",
  },
  nameContainer: {
    with: "100%",
    margin: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 80,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    positition: "relative",
    top: -50,
  },
  profileAvatar: {},

  // secondary container
  secondaryContainer: {
    padding: 30,
    paddingTop: 0,
    width: "100%",
    backgroundColor: "lightgrey",
    borderRadius: 30,
    height: "100%",
  },

  //cards list
  card: {
    backgroundColor: "darkblue",
    marginBottom: 20,
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  cardLightText: {
    fontFamily: "Inter-ExtraLight",
    fontSize: 14,
    color: "white",
  },
  cardDarkText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color:"white",
  },
  cardOrangeText: {
    color: "orange",
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },

  // logout button
  logoutButton: {
    width: "100%",
    backgroundColor: "orange",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  logoutButtonText: {
    color: "orange",
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
  },
});
