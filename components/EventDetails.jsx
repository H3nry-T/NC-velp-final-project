import { Text, TouchableOpacity, View, Modal, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import {registerOnEvent} from "../firebase/update"

export function EventDetails({ event, onClose }) {

  return (
    <Modal animationType="slide" visible={true}>
      <View className=" bg-sky-200 flex-1 justify-center items-center">
        <View className="w-11/12 min-h-96 bg-white rounded-md shadow-lg">
          <TouchableOpacity onPress={onClose}>
            <Text className="text-right pr-4 pt-3 text-gray-500">X</Text>
          </TouchableOpacity>
          <View className="p-3">
            <Text className="text-2xl font-bold ml-3">{event.event_name}</Text>
            <Text className="pt-4 ml-3">{event.description}</Text>
            <Text className="pt-4 ml-3">
              When: {new Date(event.date_time.seconds).toLocaleString()}
            </Text>
            <Text className="pt-4 ml-3">Location: {event.address}</Text>
            <Text className="pt-4 ml-3">
              Organised by: {event.organisation_name.substring(0, 45)}
            </Text>
            <View className="flex-row items-center">
              <TouchableOpacity className="flex-row justify-center w-7/12 mt-10 ml-5 bg-sky-200 p-4 rounded-full"
              onPress={()=>registerOnEvent(event)}
              >
                <Text className="text-lg">I want to help!</Text>
              </TouchableOpacity>
              <View className="ml-7 mt-5">
                <TouchableOpacity className="p-5">
                  <Entypo name="heart" size={54} color="#dc2626" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
