import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import FormInputFieldGeneric from "../components/FormInputFieldGeneric";

const AddEventScreen = () => {
  return (
    <ScrollView className="flex-1">
      <FormInputFieldGeneric label={"address"} />
      <FormInputFieldGeneric label={"charity id"} />
      <FormInputFieldGeneric label={"date time"} />
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
