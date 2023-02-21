import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { handleSignUp } from "../firebase/auth/register";
export function RegisterButton({ email, password }) {
  return (
    <TouchableOpacity
      onPress={() => handleSignUp(email, password)}
      className="border rounded-full p-2 w-2/5"
    >
      <Text className="text-l text-center font-bold text-sky-500">
        Register
      </Text>
    </TouchableOpacity>
  );
}
