import { View, Text, TextInput } from "react-native";
import React from "react";

const FormInputFieldGeneric = ({ label }) => {
  return (
    <View className="my-2">
      <Text className="ml-6 mb-1">{label}</Text>
      <TextInput className="bg-white rounded-full w-11/12 mx-auto" />
    </View>
  );
};

export default FormInputFieldGeneric;
