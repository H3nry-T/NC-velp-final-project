import { Text, TouchableOpacity, View, Modal, Pressable } from "react-native";
import { EventDetails } from "./EventDetails";
import { useState } from "react";

export default function EventCard({ event }) {
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  function handlePress() {
    setSelectedEvent(event);
    setShowEventDetails(!showEventDetails);
  }

  return (
    <>
      <View className=" w-full my-1 items-center bg-sky-200">
        <TouchableOpacity onPress={handlePress}>
          <Text className="text-2xl">{event.event_name}</Text>
          <Text className="pt-1">
            When: {new Date(event.date_time.seconds).toLocaleString()}
          </Text>
        </TouchableOpacity>
      </View>

      {showEventDetails && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setShowEventDetails(false)}
        />
      )}
    </>
  );
}
