import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function NavBarRegistration({ navigation }) {
  return (
    <View className="flex flex-row h-10">
      <TouchableOpacity className="w-1/2">
        <View className="flex-1 flex justify-center items-center border-b-4 border-cyan-800 transform scale-105">
          <Text className="font-bold">Charity</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-1/2"
        onPress={() => navigation.navigate("Volunteer Signup Form")}
      >
        <View className="flex-1 flex justify-center items-center border border-gray-400 transform scale-95">
          <Text className="opacity-50">Volunteer</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
