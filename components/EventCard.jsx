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
      <View className=" w-full my-1 items-center bg-sky-200">
        <TouchableOpacity onPress={handlePress}>
          <Text className="text-2xl">{event.event_name}</Text>
          <Text className="pt-1">
            {/*currently broken: (line below */}
            When: {new Date(event?.date_time).toLocaleString()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
