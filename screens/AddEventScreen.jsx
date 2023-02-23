import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Touchable,
} from "react-native";
import React, { useEffect, useState } from "react";
import FormInputFieldGeneric from "../components/FormInputFieldGeneric";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
const AddEventScreen = () => {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  useEffect(() => {
    // setShowDateTimePicker(false);
  }, [showDateTimePicker]);
  return (
    <ScrollView className="flex-1">
      <FormInputFieldGeneric label={"address"} />
      <FormInputFieldGeneric label={"charity id"} />
      <Text className="ml-6 mb-1">date time</Text>
      <TouchableOpacity
        className="bg-white rounded-full w-11/12 mx-auto h-7 "
        onPress={() => {
          setShowDateTimePicker(!showDateTimePicker);
        }}
      ></TouchableOpacity>
      {showDateTimePicker && <RNDateTimePicker value={new Date()} />}
      <FormInputFieldGeneric label={"description"} />
      <FormInputFieldGeneric label={"email"} />
      <FormInputFieldGeneric label={"event_count"} />
      <FormInputFieldGeneric label={"event_name"} />
      <FormInputFieldGeneric label={"phone"} />
      <FormInputFieldGeneric label={"organisation_name"} />
      <FormInputFieldGeneric label={"volunteer_needed"} />
      <FormInputFieldGeneric label={"website"} />
      <TouchableOpacity className="self-center p-2 rounded-full bg-sky-400 w-1/3 m-5">
        <Text className="text-center font-extrabold text-white text-2l">
          Submit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddEventScreen;
