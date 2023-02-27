import { Text, TouchableOpacity, View } from "react-native";
import { EventDetails } from "./EventDetails";
import { useState } from "react";

export default function EventCard({ event, setSelectedEvent, setShowEventDetails, showEventDetails }) {
  function handlePress() {
    setSelectedEvent(event);
    setShowEventDetails(!showEventDetails);
  }

  return (
    <View key={event.event_id}>
      <View className=" w-full my-1 bg-sky-200 items-start pl-4 rounded-full py-2">
        <TouchableOpacity onPress={handlePress}>
          <Text className="text-2xl">{event.event_name}</Text>
          <Text className="pt-1">
            When: {event.date_time.toDate().toLocaleString()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
