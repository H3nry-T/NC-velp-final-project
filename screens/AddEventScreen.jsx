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
    address: "",
    charity_id: 0,
    date_time: new Timestamp(),
    description: "",
    email: "",
    event_name: "",
    organisation_name: "",
    phone: "",
    postcode: "",
    volunteers: [],
    volunteer_needed: 0,
    website: "",
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
    <ScrollView className="flex-1 bg-sky-100">
      <FormInputFieldGeneric
        label={"Address"}
        formDataField={formData.address}
        onChange={handleUpdateFormDataOnClientSide("address")}
      />
      <FormInputFieldGeneric
        label={"Postcode"}
        formDataField={formData.postcode}
        onChange={handleUpdateFormDataOnClientSide("postcode")}
      />
      <FormInputFieldGeneric
        label={"Charity ID"}
        formDataField={formData.charity_id}
        onChange={handleUpdateFormDataOnClientSide("charity_id")}
      />
      <FormDateTimePicker
        label={"Date & Time:"}
        formDataField={formData.charity_id}
        onChange={handleUpdateFormDataOnClientSide("date_time")}
      />
      <FormInputFieldGeneric
        label={"Description"}
        formDataField={formData.description}
        onChange={handleUpdateFormDataOnClientSide("description")}
      />
      <FormInputFieldGeneric
        label={"Email"}
        formDataField={formData.email}
        onChange={handleUpdateFormDataOnClientSide("email")}
      />
      <FormInputFieldGeneric
        label={"Event Name"}
        formDataField={formData.event_name}
        onChange={handleUpdateFormDataOnClientSide("event_name")}
      />
      <FormInputFieldGeneric
        label={"Phone"}
        formDataField={formData.phone}
        onChange={handleUpdateFormDataOnClientSide("phone")}
      />
      <FormInputFieldGeneric
        label={"Organisation Name"}
        formDataField={formData.organisation_name}
        onChange={handleUpdateFormDataOnClientSide("organisation_name")}
      />
      <FormInputFieldGeneric
        label={"Number Of Volunteers Needed"}
        formDataField={formData.volunteer_needed}
        onChange={handleUpdateFormDataOnClientSide("volunteer_needed")}
      />
      <FormInputFieldGeneric
        label={"Website URL"}
        formDataField={formData.website}
        onChange={handleUpdateFormDataOnClientSide("website")}
      />
      <TouchableOpacity
        className="self-center p-2 rounded-xl bg-cyan-800 w-1/3 m-5 py-2"
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
