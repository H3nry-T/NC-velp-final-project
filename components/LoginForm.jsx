import React from "react";
import { TextInput, View } from "react-native";
export function LoginForm({ email, setEmail, password, setPassword }) {
  return (
    <View className="items-center w-11/12">
      <TextInput
        className="my-2 bg-white p-2 rounded-xl w-11/12 border"
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        className="my-2 bg-white p-2 rounded-xl w-11/12 border"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
    </View>
  );
}
