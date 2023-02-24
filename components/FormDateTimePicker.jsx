import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
//icons
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Timestamp } from "firebase/firestore";

export function FormDateTimePicker({ label, formDataField, onChange }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    // console.log(tempDate.toLocaleString());
    setText(tempDate.toLocaleString("en-GB"));

    const firebaseTimestamp = new Timestamp(currentDate);
    //set to state parent state. the parent state will be pushed to the database soon
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <>
      <Text className="ml-6 mb-1">date time: {text}</Text>
      <View className="flex-row flex-start justify-center w-full">
        <TouchableOpacity
          className="bg-white rounded-full w-1/12 mx-2 justify-center items-center"
          onPress={() => {
            showMode("date");
          }}
        >
          <AntDesign name="calendar" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white rounded-full w-1/12 mx-2 h-7 justify-center items-center"
          onPress={() => {
            showMode("time");
          }}
        >
          <Ionicons name="time-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {show &&
        DateTimePickerAndroid.open({
          mode: mode,
          value: date,
          onChange: onChangeDate,
        })}
    </>
  );
}
