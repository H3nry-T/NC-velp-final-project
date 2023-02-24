import { FormDateTimePicker } from "./../components/FormDateTimePicker";
import { Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { createNewTestEvent } from "../firebase/create";
import FormInputFieldGeneric from "../components/FormInputFieldGeneric";

const AddEventScreen = () => {
  //Temp data inside to test, prior to getting data from actual form
  const [formData, setFormData] = useState({
    address: "",
    charity_id: 520162,
    date_time: "",
    description: "",
    email: "",
    event_count: 0,
    event_name: "",
    organisation_name: "",
    phone: "",
    postcode: "NE10 8YA",
    volunteers: [],
    volunteer_needed: 9,
    website: "",
  });

  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [charityId, setCharityId] = useState(0);
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [eventCount, setEventCount] = useState("");
  const [eventName, setEventName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [phone, setPhone] = useState("");
  const [volunteers, setVolunteers] = useState("");
  const [volunteerNeeded, setVolunteerNeeded] = useState("");
  const [website, setWebsite] = useState("");

  // need to add a check to make sure fields are valid & disable button + clear fields
  function submitForm() {
    if (Object.keys(formData).length < 1) {
      console.log("cannot send the form");
      alert("not sending the form :(");
    } else {
      console.log("sent the form!");
      createNewTestEvent(formData);
    }
  }
  function handleUpdateFormDataOnClientSide(fieldToUpdate) {
    return (formInputFieldData) => {
      console.log(formInputFieldData);
      setFormData({ ...formData, [fieldToUpdate]: formInputFieldData });
    };
  }

  return (
    <ScrollView className="flex-1">
      <FormInputFieldGeneric
        label={"address"}
        formDataField={formData.address}
        onChange={handleUpdateFormDataOnClientSide("address")}
      />
      <FormInputFieldGeneric
        label={"postcode"}
        formDataField={formData.postcode}
        onChange={handleUpdateFormDataOnClientSide("postcode")}
      />
      <FormInputFieldGeneric
        label={"charity id"}
        formDataField={formData.charity_id}
        onChange={handleUpdateFormDataOnClientSide("charity_id")}
      />
      <FormDateTimePicker
        label={"Date & Time"}
        formDataField={formData.charity_id}
        onChange={handleUpdateFormDataOnClientSide("charity_id")}
      />
      <FormInputFieldGeneric
        label={"description"}
        formDataField={formData.description}
        onChange={handleUpdateFormDataOnClientSide("description")}
      />
      <FormInputFieldGeneric
        label={"email"}
        formDataField={formData.email}
        onChange={handleUpdateFormDataOnClientSide("email")}
      />
      <FormInputFieldGeneric
        label={"event_count"}
        formDataField={formData.event_count}
        onChange={handleUpdateFormDataOnClientSide("event_count")}
      />
      <FormInputFieldGeneric
        label={"event_name"}
        formDataField={formData.event_name}
        onChange={handleUpdateFormDataOnClientSide("event_name")}
      />
      <FormInputFieldGeneric
        label={"phone"}
        formDataField={formData.phone}
        onChange={handleUpdateFormDataOnClientSide("phone")}
      />
      <FormInputFieldGeneric
        label={"organisation name"}
        formDataField={formData.organisation_name}
        onChange={handleUpdateFormDataOnClientSide("organisation_name")}
      />
      <FormInputFieldGeneric
        label={"volunteer needed"}
        formDataField={formData.volunteer_needed}
        onChange={handleUpdateFormDataOnClientSide("volunteer_needed")}
      />
      <FormInputFieldGeneric
        label={"website"}
        formDataField={formData.website}
        onChange={handleUpdateFormDataOnClientSide("website")}
      />
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
