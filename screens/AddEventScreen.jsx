import { FormDateTimePicker } from "./../components/FormDateTimePicker";
import { Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { createNewTestEvent } from "../firebase/create";
import FormInputFieldGeneric from "../components/FormInputFieldGeneric";
import { useNavigation } from "@react-navigation/native";
import { Timestamp } from "firebase/firestore";

const AddEventScreen = () => {
  //Temp data inside to test, prior to getting data from actual form
  const [formData, setFormData] = useState({
    address: "99 bonso tree street",
    charity_id: 520162,
    date_time: new Timestamp(),
    description: "help me plant trees 🎄",
    email: "tree@gmail.com",
    event_count: 1,
    event_name: "🌲 helping !",
    organisation_name: "treetop",
    phone: "123456789",
    postcode: "BN13 1HZ",
    volunteers: [],
    volunteer_needed: 2,
    website: "https://treetopwebsite.com/volunteering",
  });
  const navigation = useNavigation();

  function handleUpdateFormDataOnClientSide(fieldToUpdate) {
    //Make form data ready to be sent off at submitForm()

    //THIS FUNCTION IS CALLED INSIDE OF FormDateTimePicker AS "onChange".
    return (formInputFieldText) => {
      let dataToInsert = formInputFieldText;
      if (
        fieldToUpdate === "charity_id" ||
        fieldToUpdate === "event_count" ||
        fieldToUpdate === "volunteer_needed"
      ) {
        if (dataToInsert !== "") {
          dataToInsert = parseInt(formInputFieldText);
        }
      }
      setFormData({ ...formData, [fieldToUpdate]: dataToInsert });
    };
  }

  function checkIfStringCannotBeInteger(string) {
    if (!isNaN(parseInt(string))) return false;
    else return true;
  }

  function submitForm() {
    /* need to add a check to make sure fields
     are valid & disable button + clear fields */
    // console.log(formData);
    // console.log(checkIfStringCannotBeInteger(formData["event_count"]));
    if (
      Object.values(formData).some((value) => value === "") ||
      checkIfStringCannotBeInteger(formData["charity_id"]) ||
      checkIfStringCannotBeInteger(formData["event_count"]) ||
      checkIfStringCannotBeInteger(formData["volunteer_needed"])
    ) {
      alert("form invalid");
    } else {
      console.log("sent the form!");
      alert("event created!");
      createNewTestEvent(formData);
      navigation.replace("Home");
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
        label={"event count"}
        formDataField={formData.event_count}
        onChange={handleUpdateFormDataOnClientSide("event_count")}
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
