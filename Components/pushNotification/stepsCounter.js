import React, { useEffect, useState } from "react";
import { startCounter, stopCounter } from "react-native-accurate-step-counter";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const StepsCounter = ({ steps, setSteps }) => {
  useEffect(() => {
    const config = {
      default_threshold: 15.0,
      default_delay: 150000000,
      cheatInterval: 3000,
      onStepCountChange: (stepCount) => {
        setSteps(stepCount);
      },
      onCheat: () => {
        console.log("User is Cheating");
      },
    };
    startCounter(config);
    return () => {
      stopCounter();
    };
  }, []);

  return (
    <>
      <Text>steps {steps}</Text>
    </>
  );
};

export default StepsCounter;
