import React from "react";
import { Modal, View, Text, TouchableOpacity, Image } from "react-native";
import { getAuth } from "firebase/auth";
import { StatusBar } from "expo-status-bar";
import { SignoutButton } from "./SignoutButton";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/logo1.png";

const Overlay = ({ isVisible, message, onClose }) => {
  const { replace, setOptions } = useNavigation();

  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      className="w-full h-full"
      statusBarTranslucent
    >
      <StatusBar hidden />
      <View className="justify-center items-center w-full h-full bg-sky-200">
        <Text className="mb-10">{user?.email}</Text>
    
          <Image source={logo} className="w-20 h-20" />
        
        <SignoutButton replace={replace} />
        <TouchableOpacity
          onPress={onClose}
          className="bg-sky-800 rounded-full w-10/12 h-10 p-2 items-center justify-center mt-5"
        >
          <Text className="text-center text-white">Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Overlay;
