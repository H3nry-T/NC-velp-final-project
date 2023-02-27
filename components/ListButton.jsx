import { Text, TouchableOpacity, View, Modal, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { getTestEvents } from "../firebase/read";
import EventCard from "./EventCard";

export default function List() {
  const [showList, setShowList] = useState(false);
  let [testEventsData, setTestEventsData] = useState([]);
  const [testEventCards, setTestEventCards] = useState([]);

  function toggleEventList() {
    setShowList(!showList);
  }

  function buildEventCards() {
    if (testEventsData.length <= 0) {
      return;
    }
    const buildCards = testEventsData.map((event) => {
      return <EventCard event={event} key={event.testEventIdFromFirebase} />;
    });
    setTestEventCards(buildCards);
  }

  useEffect(() => {
    // getTestEvents().then((data) => {
    async function getData() {
      const results = await getTestEvents();
      setTestEventsData(results);
      buildEventCards();
    }
    getData();
  }, [showList]);

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
        <View className="flex-1 ">{testEventCards && testEventCards}</View>
        <TouchableOpacity className=" justify-end">
          <Text
            onPress={toggleEventList}
            className="text-center px-10 py-7 bg-sky-800 rounded-xl mb-5"
          >
            Close
          </Text>
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
