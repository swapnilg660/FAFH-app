import { Button, ScrollView } from "native-base";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../hooks/context";

function Profile({ navigation }) {
  const { signOut } = useContext(AuthContext);
  return (
    <ScrollView>
      <Button
        bg={"secondary.500"}
        onPress={() => {
          signOut();
        }}
      >
        Sign Out
      </Button>
    </ScrollView>
  );
}

export default React.memo(Profile);
