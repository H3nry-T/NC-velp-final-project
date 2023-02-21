import React from "react";
import { Text, TouchableOpacity } from "react-native";
import {useNavigation} from '@react-navigation/native';
import { handleSignUp } from "../firebase/auth/register";
import SignupScreen from "../screens/SignupScreen";


export function RegisterButton({ email, password }) {
   const navigation = useNavigation();
  return (
    <TouchableOpacity
      // onPress={() => handleSignUp(email, password)}
      onPress= {() => navigation.navigate("Signup")}
      className="border rounded-full p-2 w-2/5"
    >
      <Text className="text-l text-center font-bold text-sky-500">
        Register
      </Text>
    </TouchableOpacity>
  );
}
