import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Touchable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createNewTestEvent } from "../firebase/create";
import FormInputFieldGeneric from "../components/FormInputFieldGeneric";
import DateTimePicker from "@react-native-community/datetimepicker";
const AddEventScreen = () => {
  //ALL
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");

  //Temp data inside to test, prior to getting data from actual form
  const [formData, setFormData] = useState({
    address: "0 Nowhere Lane",
    postcode: "SG01 0BB",
    charity_id: 520162,
    date_time: "31 January 2024 at 02:01:00 UTC",
    description: "Volunteers needed for vampiric blood bank drive",
    email: "contactus@13thebeningtonscoutgroup.org.uk",
    event_count: 2,
    event_name: "Feed our Benefactors",
    organisation_name: "13TH BEBINGTON (ST.BARNABAS) SCOUT GROUP",
    phone: "0151000000",
    volunteers_needed: 8,
    website: "http://13thbeningtonscoutgroup.org.uk",
  });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    setText(fDate + " at " + fTime);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  // need to add a check to make sure fields are valid & disable button + clear fields
  function submitForm() {
    createNewTestEvent(formData);
  }

  return (
    <ScrollView className="flex-1">
      <FormInputFieldGeneric label={"address"} />
      <FormInputFieldGeneric label={"charity id"} />
      <Text className="ml-6 mb-1">date time</Text>
      <TouchableOpacity
        className="bg-white rounded-full w-11/12 mx-auto h-7 "
        onPress={() => {
          showMode("datetime");
        }}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          onCancel={() => setShow(false)}
        />
      )}
      <FormInputFieldGeneric label={"description"} />
      <FormInputFieldGeneric label={"email"} />
      <FormInputFieldGeneric label={"event_count"} />
      <FormInputFieldGeneric label={"event_name"} />
      <FormInputFieldGeneric label={"phone"} />
      <FormInputFieldGeneric label={"organisation_name"} />
      <FormInputFieldGeneric label={"volunteer_needed"} />
      <FormInputFieldGeneric label={"website"} />
      <TouchableOpacity
        className="self-center p-2 rounded-full bg-sky-400 w-1/3 m-5"
        onPress={() => submitForm()}
      >
        <Text className="text-center font-extrabold text-white text-2l">
          Submit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddEventScreen;
