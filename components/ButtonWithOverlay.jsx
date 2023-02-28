import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image} from "react-native";
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
    <View className="flex-row  items-center justify-between w-full h-full" style={styles.transparentBG}>
      <StatusBar hidden />
      <Overlay isVisible={isOverlayVisible} onClose={handleCloseOverlay} />

    <View className="flex-row">

      {!isOverlayVisible && (
        <TouchableOpacity
        onPress={handleOpenOverlay}
        className="rounded-full w-20 h-20 my-1 ml-1"
        style={styles.transparentBG}
        >
          <Text className="bg-sky-500 px-5 py-8 rounded-full  font-bold">
            MENU
          </Text>
        </TouchableOpacity>
      )}
      {!isOverlayVisible && (
        <Text className="bg-sky-200 flex-0 px-2 py-1 w-auto h-8 rounded-2xl my-1">
          {userTime}
        </Text>
      )}
      </View>
      {/* <View className='absolute left-0 right-0 top-0'> */}
       <Image source={require('../assets/logo1.png')} className='w-20 h-20 absolute right-3 top-1 bg-sky-200 rounded-xl'/>
        {/* <Text className='absolute right-10 top-2 text-3xl'>Velp</Text> */}
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  transparentBG: {
    backgroundColor: "rgba(0,0,0,0)",
  },
});
export default ButtonWithOverlay;
