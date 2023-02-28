import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { SignoutButton } from './SignoutButton';
import { useNavigation } from "@react-navigation/native";

const Overlay = ({ isVisible, message, onClose }) => {
    const { replace, setOptions } = useNavigation();

  return (
    <Modal visible={isVisible}>
      <View>
      <StatusBar hidden />
        <SignoutButton replace={replace}/>
        <TouchableOpacity onPress={onClose} className="bg-sky-500">
          <Text>Close</Text>
          </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Overlay;
