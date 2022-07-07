import React, { useState, useEffect } from "react";
import { ScrollView } from "native-base";
import AuthContext from "../../hooks/context";

import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Button,
  SafeAreaView,
} from "react-native";
import InputText from "../../Components/InputText";
import colors from "../../assets/colors/colors";
import AnimatedCheckbox from "react-native-checkbox-reanimated";
import { signUp } from "../../services/auth";

function Register({ navigation }) {
  const { signIn } = React.useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const handleCheckboxPress = () => {
    setRememberMe((prev) => !prev);
    //Add code to save user's details to local storage On Submit.
  };
  return (
    <ScrollView>
      <View style={styles.loginInputContainer}>
        <InputText
          label="Email"
          placeholder="example@email.com"
          setValue={setEmail}
          value={email}
          required={true}
          type="email"
        />
        <InputText
          label="Password"
          placeholder="Password"
          setValue={setPassword}
          required={true}
          value={password}
          type="password"
        />
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Pressable
            onPress={() => handleCheckboxPress()}
            style={styles.checkbox}
          >
            <AnimatedCheckbox
              checked={rememberMe}
              highlightColor={colors.primary}
              checkmarkColor={colors.secondary}
              boxOutlineColor={colors.primary}
            />
          </Pressable>
          <Text style={styles.DontHaveAccountText}>Remember Me</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <Pressable
            onPress={() => {
              //Login code
              //Add form validation before submitting
              signUp({ email, password, stayLoggedIn: rememberMe});
              // navigation.navigate("Home");
            }}
          >
            <Text style={styles.loginText}>{"Register"}</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

export default React.memo(Register);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    height: "100%",
    padding: 15,
  },
  title: {
    fontSize: 50,
    marginLeft: 20,
    marginTop: 40,
    fontFamily: "Inter-Black",
  },
  loginInputContainer: {
    marginTop: 95,
    padding: 20,
    position: "relative",
    borderRadius: 10,
  },
  checkbox: {
    height: 30,
    width: 30,
  },
  buttonWrapper: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  loginText: {
    fontSize: 18,
    fontFamily: "Inter-ExtraLight",
    borderRadius: 7,
    width: 180,
    textAlign: "center",
    padding: 10,
    backgroundColor: colors.primary,
    color: colors.textLight,
    elevation: 10,
  },
  SocialContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  socialLoginContainer: {
    width: 55,
    padding: 5,
    marginHorizontal: 10,
    marginTop: 20,
    alignItems: "center",
    borderRadius: 90,
  },
  DontHaveAccount: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  DontHaveAccountText: {
    fontFamily: "Inter-ExtraLight",
    fontSize: 15,
    marginHorizontal: 10,
  },
  DontHaveAccountLink: {
    fontSize: 15,
    fontFamily: "Inter-SemiBold",
    color: colors.primary,
  },

  //divider style
  mainContainer: {
    marginTop: 30,
    height: 10,
    width: "100%",
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    height: 1,
    flex: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  text: {
    fontFamily: "Inter-ExtraLight",
    fontSize: 18,
    color: colors.textDark,
    height: 20,
    marginHorizontal: 10,
  },
});
