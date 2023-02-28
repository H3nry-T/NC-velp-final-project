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
    <View key={event.event_id}>
      <View className=" w-full my-1 bg-sky-200 items-start pl-4 rounded-full py-2">
        <TouchableOpacity onPress={handlePress}>
          <Text className="text-2xl">{event.event_name}</Text>
          <Text className="pt-1">When: {formatTimeStamp(event)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

