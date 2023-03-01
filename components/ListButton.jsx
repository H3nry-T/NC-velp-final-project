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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { auth } from "../firebase/firebase";

export default function List() {
  const [showList, setShowList] = useState(false);
  let [testEventsData, setTestEventsData] = useState([]);
  const [testEventCards, setTestEventCards] = useState([]);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigation = useNavigation();

  const [isCharity, setIsCharity] = useState(false);
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    const getCharityList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "test_charity"));
        const charityListArray = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setCharities(charityListArray);
        const authUser = auth.currentUser;
        const charity = charityListArray.find(
          (charity) => charity.email === authUser.email
        );
        if (charity) {
          setIsCharity(!!charity);
        }
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    };
    getCharityList();
  }, []);

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
    async function getData() {
      const results = await getTestEvents();
      setTestEventsData(results);
      buildEventCards();
    }
    getData();
  }, [showList]);

  return (
    <View className="width-full height-full">
      <Modal
        animationType="slide"
        visible={showList}
        presentationStyle="overFullScreen"
        className="flex height-full width-full"
      >
        <View className="px-10 py-3 bg-sky-300">
          <Text className="text-center mt-10">Event List</Text>
        </View>
        <ScrollView className="flex-1 ">
          {testEventCards && testEventCards}
        </ScrollView>
        <View className=" flex-row justify-evenly items-center my-5">
          {isCharity && (
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
          )}
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

      <View className="flex-row bg-sky-300 min-w-full rounded-t-3xl">
        <TouchableOpacity onPress={toggleEventList} className="pb-8 min-w-full">
          <Text className="text-2xl text-center">List</Text>
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
