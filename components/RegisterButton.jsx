import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function RegisterButton() {
    const navigation = useNavigation();
    const [onVolunteer, setOnVolunteer] = useState(false)

    return !onVolunteer ? (
      <TouchableOpacity
        onPress={() => navigation.navigate("Charity Signup Form")}
        className="border rounded-full p-2 w-2/5"
      >
        <Text className="text-l text-center font-bold text-sky-500">
          Register
        </Text>
      </TouchableOpacity>
    ) : null;
    
}
