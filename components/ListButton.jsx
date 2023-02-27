import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  Touchable,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { getTestEvents } from "../firebase/read";
import EventCard from "./EventCard";
import { EventDetails } from "./EventDetails";
import { useNavigation } from "@react-navigation/native";

export default function List() {
  const [showList, setShowList] = useState(false);
  let   [testEventsData, setTestEventsData] = useState([]);
  const [testEventCards, setTestEventCards] = useState([]);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigation = useNavigation();

  function toggleEventList() {
    setShowList(!showList);
  }

  function buildEventCards() {
    if (testEventsData.length <= 0) {
      return;
    }
    const buildCards = testEventsData.map((event) => {
      return (
        <EventCard
          key={event.event_id}
          event={event}
          setSelectedEvent={setSelectedEvent}
          setShowEventDetails={setShowEventDetails}
          showEventDetails={showEventDetails}
        />
      );
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
        <ScrollView className="flex-1 ">
          {testEventCards && testEventCards}
        </ScrollView>
        <View className=" flex-row justify-evenly items-center my-5">
          <TouchableOpacity className="text-center px-6 py-2 bg-cyan-800 rounded-xl">
            <Text
              onPress={() => {
                return navigation.navigate("AddEvent");
              }}
              className="text-center text-white font-extrabold text-xl"
            >
              Add Event
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="text-center px-6 py-2 bg-cyan-800 rounded-xl">
            <Text
              onPress={toggleEventList}
              className="text-center text-white font-extrabold text-xl"
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View className="flex-row">
        <TouchableOpacity onPress={toggleEventList} className="pb-8">
          <Text className="text-2xl">List</Text>
        </TouchableOpacity>
      </View>
      {showEventDetails && (
        <EventDetails 
          event={selectedEvent}
          onClose={() => setShowEventDetails(false)}
        />
      )}
    </View>
  );
}
