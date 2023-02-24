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
    <View key={event.event_id}>
      <View className=" w-full my-1 items-center bg-sky-200" key={event.event_id += 1}>
        <TouchableOpacity onPress={handlePress} key={event.event_id += 2}>
          <Text className="text-2xl">{event.event_name}</Text>
          <Text className="pt-1">
            {/*currently broken: (line below */}
            When: {new Date(event?.date_time).toLocaleString()}
          </Text>
        </TouchableOpacity>
      </View>

      {showEventDetails && (
        <EventDetails 
          key={event.event_id}
          event={selectedEvent}
          onClose={() => setShowEventDetails(false)}
        />
      )}
    </View >
  );
}
