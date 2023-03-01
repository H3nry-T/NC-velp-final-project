import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { registerOnEvent } from "../firebase/update";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { auth } from "../firebase/firebase";
import { formatTimeStamp } from "./EventCard";

export function EventDetails({ event, onClose }) {
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const getVolunteerList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "test_volunteer"));
        const volunteerListArray = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setVolunteers(volunteerListArray);
        const authUser = auth.currentUser;
        const volunteer = volunteerListArray.find(
          (volunteer) => volunteer.email === authUser.email
        );
        if (volunteer) {
          setIsVolunteer(!!volunteer);
        }
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };
    getVolunteerList();
  }, []);

  return (
    <Modal animationType="slide" visible={true} statusBarTranslucent>
      <View className=" bg-cyan-800 flex-1 justify-center items-center h-full w-full">
        <View className="w-11/12 max-h-[80%] bg-white flex-1 rounded-md shadow-lg p-1">
          <TouchableOpacity onPress={onClose}>
            <Text className="text-right pr-2 pt-1 text-2xl text-gray-500">
              X
            </Text>
          </TouchableOpacity>
          <View className="justify-evenly items-evenly flex-1 p-3">
            <View>
              <Text className="text-3xl font-bold text-center">
                {event.event_name}
              </Text>
            </View>
            <View>
              <Text className="pt-4 ml-3 pl-1 pb-10">{event.description}</Text>
              <Text className="pt-4 ml-3 pl-1">
                <Text className="text-cyan-800 font-extrabold">When:</Text>{" "}
                {formatTimeStamp(event)}
              </Text>
              <Text className="pt-4 ml-3 pl-1">
                <Text className="text-cyan-800 font-extrabold">Location:</Text>{" "}
                {event.address}
              </Text>
              <Text className="pt-4 ml-3 pl-1">
                <Text className="text-cyan-800 font-extrabold">
                  Organised by:
                </Text>{" "}
                {event.organisation_name.substring(0, 45)}
              </Text>
            </View>

            {isVolunteer && (
              <View className="flex-row items-center">
                <TouchableOpacity
                  className="flex-row justify-center w-7/12 mt-10 ml-5 bg-cyan-800 p-4 rounded-xl"
                  onPress={() => registerOnEvent(event)}
                >
                  <Text className="text-lg font-bold color-white">
                    I want to help!
                  </Text>
                </TouchableOpacity>
                <View className="ml-7 mt-5">
                  <TouchableOpacity className="p-5">
                    <Entypo name="heart" size={54} color="#dc2626" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {!isVolunteer && (
              <View className="ml-4">
                <Text className="font-extrabold text-cyan-800">
                  Volunteers:
                </Text>
                <FlatList
                  data={volunteers}
                  renderItem={({ item }) => {
                    return <Text>{item.email}</Text>;
                  }}
                  keyExtractor={(item) => {
                    return item.email;
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
