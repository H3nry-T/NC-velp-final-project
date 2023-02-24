import { FormDateTimePicker } from "./../components/FormDateTimePicker";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { createNewTestEvent } from "../firebase/create";
import FormInputFieldGeneric from "../components/FormInputFieldGeneric";

const AddEventScreen = () => {
  //Temp data inside to test, prior to getting data from actual form
  const [formData, setFormData] = useState({
    address: "0 Nowhere Lane",
    charity_id: 520162,
    date_time: "31 January 2024 at 02:01:00 UTC",
    description: "Volunteers needed for vampiric blood bank drive",
    email: "contactus@13thebeningtonscoutgroup.org.uk",
    event_count: 2,
    event_name: "Feed our Benefactors",
    organisation_name: "13TH BEBINGTON (ST.BARNABAS) SCOUT GROUP",
    phone: "0151000000",
    postcode: "SG01 0BB",
    volunteers: [],
    volunteer_needed: 9,
    website: "http://13thbeningtonscoutgroup.org.uk",
  });

  // need to add a check to make sure fields are valid & disable button + clear fields
  function submitForm() {
    createNewTestEvent(formData);
  }

  return (
    <ScrollView className="flex-1">
      <FormInputFieldGeneric label={"address"} setFormData={setFormData} />
      <FormInputFieldGeneric label={"postcode"} setFormData={setFormData} />
      <FormInputFieldGeneric label={"charity id"} setFormData={setFormData} />
      <FormDateTimePicker setFormData={setFormData} />
      <FormInputFieldGeneric label={"description"} setFormData={setFormData} />
      <FormInputFieldGeneric label={"email"} setFormData={setFormData} />
      <FormInputFieldGeneric label={"event_count"} setFormData={setFormData} />
      <FormInputFieldGeneric label={"event_name"} setFormData={setFormData} />
      <FormInputFieldGeneric label={"phone"} setFormData={setFormData} />
      <FormInputFieldGeneric
        label={"organisation name"}
        setFormData={setFormData}
      />
      <FormInputFieldGeneric
        label={"volunteer needed"}
        setFormData={setFormData}
      />
      <FormInputFieldGeneric label={"website"} setFormData={setFormData} />
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
