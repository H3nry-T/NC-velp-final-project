import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { handleSignOut } from "../firebase/auth/signout";

export function SignoutButton({ replace }) {
  return (
    <TouchableOpacity
      onPress={() => handleSignOut(replace)}
      className=" rounded-full bg-cyan-600 p-2 w-10/12 my-4"
    >
      <Text className="font-bold text-center text-white">Sign Out</Text>
    </TouchableOpacity>
  );
}
