import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { SignoutButton } from './SignoutButton';
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/logo1.png";

const Overlay = ({ isVisible, message, onClose }) => {
    const { replace, setOptions } = useNavigation();

  return (
    <Modal visible={isVisible} animationType="fade">
      <View className='justify-center items-center'>
      <StatusBar hidden />
      <Image source={logo} className="w-20 h-20"/>
        <SignoutButton replace={replace}/>
        <TouchableOpacity onPress={onClose} className="bg-sky-500 rounded-full w-20 h-20 p-2 items-center justify-center mt-10">
          <Text className='text-center'>Close</Text>
          </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Overlay;
