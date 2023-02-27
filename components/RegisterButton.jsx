import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function RegisterButton() {
    const navigation = useNavigation();
    const [onVolunteer, setOnVolunteer] = useState(false)

    return !onVolunteer ? (
      <TouchableOpacity
        onPress={() => navigation.navigate("Charity Signup Form")}
        className="rounded-full p-2 w-2/5 bg-cyan-800"
      >
        <Text className="text-l text-center font-bold text-white">
          Register
        </Text>
      </TouchableOpacity>
    ) : null;
    
}
