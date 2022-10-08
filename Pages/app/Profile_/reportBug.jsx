import { ScrollView,Box } from "native-base";

function ReportBug({ navigation }) {
  return (
    <>
      {/* <SafeAreaView></SafeAreaView> */}
      <ScrollView safeAreaTop>
        <Box bg="primary.400" p="12" rounded="lg">
          Box
        </Box>
      </ScrollView>
    </>
  );
}

export default ReportBug;
