import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

export function formatTimeStamp(event) {
  const date = event.date_time.toDate();

  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  let formattedTime = `${date.getHours()}:${date.getMinutes()}`;

  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  formattedTime = `${date.getHours()}:${minutes}`;

  const amOrPm = date.getHours() >= 12 ? "PM" : "AM";
  formattedTime = formattedTime.concat(` ${amOrPm}`);

  const formattedDateTime = `${formattedDate} at ${formattedTime}`;

  return formattedDateTime;
}
export default function EventCard({
  event,
  setSelectedEvent,
  setShowEventDetails,
  showEventDetails,
}) {
  function handlePress() {
    setSelectedEvent(event);
    setShowEventDetails(!showEventDetails);
  }

  return (
    <View key={event.event_id} className="flex-1 items-center">
      <View className=" w-[95%] my-1 bg-cyan-800 justify-center pl-4 rounded-xl py-2">
        <TouchableOpacity onPress={handlePress}>
          <Text className="text-2xl text-white">{event.event_name}</Text>
          <Text className="pt-1 text-white">When: {formatTimeStamp(event)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

