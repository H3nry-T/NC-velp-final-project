import { FormDateTimePicker } from "./../components/FormDateTimePicker";
import { Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { createNewTestEvent } from "../firebase/create";
import FormInputFieldGeneric from "../components/FormInputFieldGeneric";
import { useNavigation } from "@react-navigation/native";
import { Timestamp } from "firebase/firestore";
import { auth } from "../firebase/firebase";
//If a charity is signed in use auth.currentUser.uid for charity_id
const AddEventScreen = () => {
  //Temp data inside to test, prior to getting data from actual form
  const [formData, setFormData] = useState({
    address: "90 loco way",
    charity_id: 0,
    date_time: new Timestamp(),
    description: "help lay out the tracks",
    email: "TrainStation@example.com",
    event_name: "Railway construction 👷‍♂️",
    organisation_name: "line foster & co",
    phone: "62124151",
    postcode: "TS10 2DZ",
    volunteers: [],
    volunteer_needed: 0,
    website: "https://TrainStation.com/volunteering",
  });
  const navigation = useNavigation();

  function handleUpdateFormDataOnClientSide(fieldToUpdate) {
    //Make form data ready to be sent off at submitForm()

    //THIS FUNCTION IS CALLED INSIDE OF FormDateTimePicker AS "onChange".
    return (textFromUsersFormInput) => {
      if (
        fieldToUpdate === "charity_id" ||
        fieldToUpdate === "volunteer_needed"
      ) {
        /* 
        only turn the user's input into an integer 
        only if it WONT turn into a NaN of some kind
        */
        if (
          textFromUsersFormInput !== "" &&
          !isNaN(parseInt(textFromUsersFormInput))
        ) {
          textFromUsersFormInput = parseInt(textFromUsersFormInput);
          setFormData({ ...formData, [fieldToUpdate]: textFromUsersFormInput });
        } else if (textFromUsersFormInput === "") {
          setFormData({ ...formData, [fieldToUpdate]: textFromUsersFormInput });
        }
      } else {
        setFormData({ ...formData, [fieldToUpdate]: textFromUsersFormInput });
      }
    };
  }

  function checkIfStringCannotBeInteger(string) {
    if (!isNaN(parseInt(string))) return false;
    else return true;
  }

  function submitForm() {
    /* need to add a check to make sure fields
     are valid & disable button + clear fields */
    if (
      checkIfStringCannotBeInteger(formData["charity_id"]) ||
      checkIfStringCannotBeInteger(formData["volunteer_needed"])
    ) {
      alert("Charity ID and Number of volunteers needed must be an integer");
    }

    if (
      formData.address === "" ||
      formData.address === 0 ||
      formData.charity_id === 0 ||
      formData.date_time === "" ||
      formData.date_time === 0 ||
      formData.description === "" ||
      formData.description === 0 ||
      formData.email === "" ||
      formData.email === 0 ||
      formData.event_name === "" ||
      formData.event_name === 0 ||
      formData.organisation_name === "" ||
      formData.organisation_name === 0 ||
      formData.phone === "" ||
      formData.phone === 0 ||
      formData.postcode === "" ||
      formData.postcode === 0
    ) {
      alert("Please complete the form");
    } else {
      createNewTestEvent(formData)
        .then(() => {
          alert("Event created!");
          navigation.replace("Home");
        })
        .catch((error) => {
          alert(`${error}`);
        });
    }
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
        label={"Date & Time:"}
        formDataField={formData.charity_id}
        onChange={handleUpdateFormDataOnClientSide("date_time")}
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
        label={"event name"}
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
        label={"number of volunteers needed"}
        formDataField={formData.volunteer_needed}
        onChange={handleUpdateFormDataOnClientSide("volunteer_needed")}
      />
      <FormInputFieldGeneric
        label={"website url"}
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
