import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { handleSignOut } from "../firebase/auth/signout";

export function SignoutButton({ replace }) {
  return (
    <TouchableOpacity onPress={() => handleSignOut(replace)}>
      <Text>Sign Out</Text>
    </TouchableOpacity>
  );
}
