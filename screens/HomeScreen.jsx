import { SignoutButton } from "./../components/SignoutButton";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const HomeScreen = () => {
  const { replace } = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <SignoutButton replace={replace} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "30%",
    backgroundColor: "#00B8FF",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
