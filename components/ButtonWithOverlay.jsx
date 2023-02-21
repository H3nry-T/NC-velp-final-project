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
    <View>
      <Button title="Open Overlay" onPress={handleOpenOverlay} />
      <Overlay isVisible={isOverlayVisible} message="Hello, World!" onClose={handleCloseOverlay} />
    </View>
  );
};

export default ButtonWithOverlay;
