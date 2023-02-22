import { Text, TouchableOpacity, View, Modal, Pressable } from "react-native";
import { useState, useEffect } from "react";
import EventList from "./EventList";

export default function List() {
  const [showList, setShowList] = useState(false);

  function toggleEventList() {
    setShowList(!showList);
  }

  useEffect(() => {
    
  }, [])


  return (
    <View>
      <Modal
        animationType="slide"
        visible={showList}
        // transparent={true}
        presentationStyle="overFullScreen"
        className="flex min-h-full"
      
      >
        <TouchableOpacity className="px-10 py-3 bg-sky-300">
          <Text className="text-center mt-10">Event List</Text>
        </TouchableOpacity>
        <TouchableOpacity className=" justify-end">
          <Text onPress={toggleEventList} className="text-center px-10 py-3 bg-sky-800 rounded-xl">Close</Text>
        </TouchableOpacity>
      </Modal>

    <View>

      <TouchableOpacity onPress={toggleEventList} className="pb-8">
        <View className="flex-row">
          <Text className="text-2xl">List</Text>
        </View>
      </TouchableOpacity>
    </View>
    </View>
  );
}
