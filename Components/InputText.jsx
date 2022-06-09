import React, { useState, useRef } from "react";
import { Text, StyleSheet, View, TextInput, Animated } from "react-native";
import colors from "../assets/colors/colors";

// function InputText({ setValue, value, label }) {
//   const [isActive, setIsActive] = useState(false);

//   const fadeInToTop = useRef(new Animated.Value(25)).current;

//   const fadeIn = () => {
//     console.log;
//     // Will change fadeInToTop value to 1 in 5 seconds
//     Animated.timing(fadeInToTop, {
//       toValue: 0,
//       duration: 250,
//       useNativeDriver: true,
//     }).start();
//   };

//   const fadeOut = () => {
//     // Will change fadeInToTop value to 0 in 3 seconds
//     Animated.timing(fadeInToTop, {
//       toValue: 25,
//       duration: 200,
//       useNativeDriver: true,
//     }).start();
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[styles.label, { transform: [{ translateY: fadeInToTop }] }]}
//       >
//         <Text style={{ color: colors.textDark }}>{label}</Text>
//       </Animated.View>
//       <TextInput
//         style={styles.loginInput}
//         value={value}
//         onChange={(e) => {
//           setValue(e.nativeEvent.text);
//         }}
//         onFocus={() => {
//           setIsActive(true);
//           fadeIn();
//         }}
//         onBlur={() => {
//           setIsActive(false);
//           fadeOut();
//         }}
//       />
//     </View>
//   );
// }

function InputText({ setValue, value, label, placeholder,type }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.loginInput}
        // placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.nativeEvent.text);
        }}
        secureTextEntry={type === "password"}
      />
      
    </View>
  );
}

export default React.memo(InputText);
const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginBottom: 10,

  },
  label: {
    marginHorizontal: 5,
    fontFamily: "Inter-ExtraLight",
    color: colors.textDark,
  },
  loginInput: {
    fontFamily: "Inter-Regular",
    borderWidth: 1,
    height: 40,
    width: "100%",
    padding: 10,
    borderColor: colors.textDark,
    borderRadius: 5,
  },
});
