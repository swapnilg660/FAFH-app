import Onboarding from "react-native-onboarding-swiper";
import { Box, Center, useTheme } from "native-base";
import { useEffect } from "react";
import { Image } from "react-native";

function OnboardingComponent({ navigation }) {
  const { colors } = useTheme();

  useEffect(() => {
    return () => {
      console.log("OnboardingComponent unmounted");
    };
  }, []);
  let pages = [
    {
      backgroundColor: colors.primary[50],
      image: <Image style={{ width: "70%", resizeMode: "contain" }} source={require("./OnboardingPageOne.png")} />,
      title: "Scan food",
      subtitle:
        "Our scanning feature makes keeping track of meals simpler than ever. Simply take a photo of your food, and our AI model will handle the rest.",
    },
    {
      backgroundColor: colors.red[50],
      image: <Image style={{ width: "70%", resizeMode: "contain" }} source={require("./OnboardingPageTwo.png")} />,
      title: "Diet and intake analysis",
      subtitle:
        "In order to help you make health-related decisions, we analyse your nutrition while you record your meals.",
    },
    {
      backgroundColor: colors.secondary[50],
      image: <Image style={{ width: "70%", resizeMode: "contain" }} source={require("./OnboardingPageThree.png")} />,
      title: "Track Expenses",
      subtitle:
        "Maintaining a record of your food costs. You need to know this so that you can adjust your spending where necessary.",
    },
  ];

  return (
    <Box flex={1}>
      <Onboarding
        pages={pages}
        onDone={() => {
          navigation.navigate("Login");
        }}
        onSkip={() => {
          navigation.navigate("Login");
        }}
        containerStyles={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        bottomBarHighlight={false}
        titleStyles={{ fontFamily: "Poppins-Medium" }}
        subTitleStyles={{ fontFamily: "Poppins-Regular", textAlign: "center" }}
      />
    </Box>
  );
}

export default OnboardingComponent;
