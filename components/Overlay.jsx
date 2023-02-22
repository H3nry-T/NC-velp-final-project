import React from 'react';
import { Modal, View, Text, Button } from 'react-native';
import { SignoutButton } from './SignoutButton';
import { useNavigation } from "@react-navigation/native";

const Overlay = ({ isVisible, message, onClose }) => {
    const { replace, setOptions } = useNavigation();

  return (
    <Modal visible={isVisible}>
      <View>
        <SignoutButton replace={replace}/>
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default Overlay;
