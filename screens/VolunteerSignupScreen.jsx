import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { collection, addDoc, db, getDocs, auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function VolunteerSignupScreen() {
  const [volunteers, setVolunteers] = useState([]);

  const [volunteerFormData, setVolunteerFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: null,
    phone: "",
    post_code: "",
    password: "",
    password_again: "",
  });

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("empty");

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
    setText(fDate);

    setVolunteerFormData({
      ...volunteerFormData,
      date_of_birth: fDate,
    });
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const navigation = useNavigation();

  const volunteerCollection = collection(db, "test_volunteer");

  const handleSubmit = () => {
    const requiredFields = [
      "username",
      "first_name",
      "last_name",
      "email",
      "date_of_birth",
      "phone",
      "post_code",
      "password",
      "password_again",
    ];

    //make sure fields are all present in order to submit
    for (const field of requiredFields) {
      if (!volunteerFormData[field]) {
        return alert(`Please fill in ${field.replace("_", " ")}`);
      }
    }

    //make sure first and last name is valid format
    const nameRegex = /^[a-zA-Z]+(-[a-zA-Z]+)*$/;
    if (
      !nameRegex.test(volunteerFormData.first_name) ||
      !nameRegex.test(volunteerFormData.last_name)
    ) {
      return alert(`Please make sure the name entered is valid`);
    }

    //make sure username doesn't already exist in the collection
    for (const element of volunteers) {
      if (element.username === volunteerFormData.username) {
        return alert(
          `This username already exists. Please enter a new username`
        );
      }
    }

    //make sure email doesn't already exist in the collection
    for (const element of volunteers) {
      if (element.email === volunteerFormData.email) {
        return alert(`This email is already in use. Please enter a new email`);
      }
    }

    //make sure phone doesn't already exist in the collection
    for (const element of volunteers) {
      if (element.phone === volunteerFormData.phone) {
        return alert(
          `This phone number is already in use. Please enter a new number`
        );
      }
    }

    //make sure password matches upon submission
    if (volunteerFormData.password !== volunteerFormData.password_again) {
      return alert(`Password does not match. Please try again`);
    }

    //make sure phone number is valid
    const phoneRegex = /^(07|01)\d{9}$/;
    if (
      !phoneRegex.test(volunteerFormData.phone) ||
      volunteerFormData.phone.length !== 11
    ) {
      return alert(`Please enter a valid UK number`);
    }

    //make sure post code is valid
    const ukPostcodeRegex = /^[A-Za-z]{1,2}\d{1,2}[A-Za-z]?\s?\d[A-Za-z]{2}$/;
    if (!ukPostcodeRegex.test(volunteerFormData.post_code)) {
      return alert(`Please enter a valid Post Code`);
    }

    //make sure volunteer inputs a valid email
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(volunteerFormData.email)) {
      return alert(`Please enter a valid email address`);
    }

    //make sure volunteer is 16 years and older
    const nowDate = new Date();
    const dateString = nowDate.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const realDateString = dateString;
    const birthDateString = volunteerFormData.date_of_birth.toString();

    const realDate = new Date(realDateString.split("/").reverse().join("-"));

    const birthDate = () => {
      const [day, month, year] = birthDateString.split("/");
      const birthDate = new Date(year, month - 1, day);
      return birthDate;
    };

    const differenceMs = realDate.getTime() - birthDate().getTime();

    const differenceYears = differenceMs / (1000 * 60 * 60 * 24 * 365.25);

    // Check if realDate is 16 years or more after birthDate
    if (differenceYears >= 16) {
      console.log("date2 is 16 years or more after date1");
    } else {
      return alert(`You are younger than 16 years old`);
    }

    createUserWithEmailAndPassword(
      auth,
      volunteerFormData.email,
      volunteerFormData.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // alert(`Registered as ${user.email}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert(`${errorCode}, ${errorMessage}`);
      });

    addDoc(volunteerCollection, volunteerFormData)
      .then((docRef) => {
        getVolunteerList();
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((e) => {
        console.error("Error adding document: ", e);
      });
  };

  const getVolunteerList = () => {
    getDocs(volunteerCollection)
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
      })
      .then((volunteerListArray) => {
        setVolunteers(volunteerListArray);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <SafeAreaView className="h-full">
      <View className="flex flex-row h-10">
        <TouchableOpacity
          className="w-1/2"
          onPress={() => navigation.navigate("Charity Signup Form")}
        >
          <View className="flex-1 flex justify-center items-center border border-gray-400 transform scale-95">
            <Text className="opacity-50">Charity</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="w-1/2">
          <View className="flex-1 flex justify-center items-center border-b-4 border-blue-500 border-blue-600 transform scale-105">
            <Text className="font-bold">Volunteer</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex flex-col mb-10">
        <ScrollView className="px-8 mt-6 mb-10">
          <View>
            <View className="mb-6">
              <Text className="text-xl mb-2">Username</Text>
              <TextInput
                className="p-3 border rounded"
                placeholder="Username"
                value={volunteerFormData.username}
                onChangeText={(text) => {
                  setVolunteerFormData({
                    ...volunteerFormData,
                    username: text,
                  });
                }}
                required
              ></TextInput>
            </View>
            <View className="mb-6">
              <Text className="text-xl mb-2">First name</Text>
              <TextInput
                className="p-3 border rounded"
                placeholder="First Name"
                value={volunteerFormData.first_name}
                onChangeText={(text) => {
                  setVolunteerFormData({
                    ...volunteerFormData,
                    first_name: text,
                  });
                }}
                required
              ></TextInput>
            </View>
            <View className="mb-6">
              <Text className="text-xl mb-2">Last Name</Text>
              <TextInput
                className="p-3 border rounded"
                placeholder="Last Name"
                value={volunteerFormData.last_name}
                onChangeText={(text) => {
                  setVolunteerFormData({
                    ...volunteerFormData,
                    last_name: text,
                  });
                }}
                required
              ></TextInput>
            </View>
            <View className="mb-6">
              <Text className="text-xl mb-2">Email</Text>
              <TextInput
                className="p-3 border rounded"
                placeholder="Email"
                value={volunteerFormData.email}
                onChangeText={(text) => {
                  setVolunteerFormData({
                    ...volunteerFormData,
                    email: text,
                  });
                }}
                required
              ></TextInput>
            </View>
            <View className="mb-6">
              <Text className="text-xl mb-2">Date of Birth</Text>
              <TouchableOpacity
                className="w-full border rounded p-4"
                onPress={() => {
                  showMode("date");
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
                />
              )}
            </View>
            <View className="mb-6">
              <Text className="text-xl mb-2">Phone</Text>
              <TextInput
                className="p-3 border rounded"
                placeholder="Phone"
                value={volunteerFormData.phone}
                keyboardType="numeric"
                onChangeText={(number) => {
                  setVolunteerFormData({
                    ...volunteerFormData,
                    phone: number,
                  });
                }}
                required
              ></TextInput>
            </View>
            <View className="mb-6">
              <Text className="text-xl mb-2">Post Code</Text>
              <TextInput
                className="p-3 border rounded"
                placeholder="Post Code"
                value={volunteerFormData.post_code}
                onChangeText={(text) => {
                  setVolunteerFormData({
                    ...volunteerFormData,
                    post_code: text,
                  });
                }}
                required
              ></TextInput>
            </View>
            <View className="mb-6">
              <Text className="text-xl mb-2">Password</Text>
              <TextInput
                className="p-3 border rounded"
                placeholder="Please enter password"
                value={volunteerFormData.password}
                secureTextEntry={true}
                onChangeText={(text) => {
                  setVolunteerFormData({
                    ...volunteerFormData,
                    password: text,
                  });
                }}
                required
              ></TextInput>
            </View>
            <View className="mb-6">
              <Text className="text-xl mb-2">Confirm Password</Text>
              <TextInput
                className="p-3 border rounded"
                placeholder="Please re-enter password"
                value={volunteerFormData.password_again}
                secureTextEntry={true}
                onChangeText={(text) => {
                  setVolunteerFormData({
                    ...volunteerFormData,
                    password_again: text,
                  });
                }}
                required
              ></TextInput>
            </View>
          </View>
        </ScrollView>
      </View>
      <View className="absolute bottom-0 left-0 right-0 mb-5">
        <Button title="Submit" className="w-full" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
}
