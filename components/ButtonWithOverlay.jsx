import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { logo } from "../assets/logo1.png";
import Overlay from "./Overlay";

const ButtonWithOverlay = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [userTime, setUserTime] = useState();

  useEffect(() => {
    setUserTime(
      dateTime.toLocaleString("en-GB", {
        hour: "numeric",
        minute: "numeric",
        // second: "numeric",
        hour12: true,
      })
    );

    const getTime = setInterval(() => {
      setDateTime(new Date());
    }, 10000);

    return () => clearInterval(getTime);
  }, [dateTime]);

  const handleOpenOverlay = () => {
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
  };

  return (
      <View className="flex-row justify-between" style={styles.transparentBG}>
        <StatusBar hidden />
        <Overlay isVisible={isOverlayVisible} onClose={handleCloseOverlay} />
        {/* <ImageBackground source={velpLogo} className='bg-amber-500 text-white'> */}

        <TouchableOpacity
          onPress={handleOpenOverlay}
          className="rounded-full w-20 h-20"
        >
          <Text className="bg-sky-500 px-5 py-7 rounded-full  font-bold">MENU</Text>
        </TouchableOpacity>
        <Text className='bg-blue-300 flex-0 px-2 py-1 w-auto h-8 rounded-2xl'>{userTime}</Text>
        {/* </ImageBackground> */}
      </View>
  );
};

const styles = StyleSheet.create({
  transparentBG: {
    backgroundColor: 'rgba(0,0,0,0)'
  }
})
export default ButtonWithOverlay;
