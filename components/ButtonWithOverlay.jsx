import React, { useState } from 'react';
import { View, Button } from 'react-native';
import Overlay from './Overlay';

const ButtonWithOverlay = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handleOpenOverlay = () => {
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
  };

  return (
    <View >
      <Button title="Menu" onPress={handleOpenOverlay} className="rounded-full"/>
      <Overlay isVisible={isOverlayVisible} onClose={handleCloseOverlay} />
    </View>
  );
};

export default ButtonWithOverlay;
