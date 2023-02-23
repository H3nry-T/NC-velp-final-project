import { Text, TouchableOpacity, View, Modal, Pressable } from "react-native";

export default function EventCard({ event }) {
  function handlePress() {
    return console.log("handlePress");
  }

  return (
    <View className=" w-full my-1 items-center bg-sky-200">
      <TouchableOpacity onPress={handlePress()}>
        <Text className="text-2xl">{event.event_name}</Text>
        <Text className="pt-1">
          When: {new Date(event.date_time.seconds).toLocaleString()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
