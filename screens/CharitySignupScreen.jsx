import {
    View,
    TextInput,
    Text,
    SafeAreaView,
    Button,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
    collection,
    addDoc,
    db,
    getDocs,
} from "../firebase/firebase";
import { getCharities } from "../utils/api";
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
    const [charities, setCharities] = useState([]);
    const [charityFromApi, setCharityFromApi] = useState({});

    const [charityFormData, setCharityFormData] = useState({
        reg_charity_number: null,
        charity_name: null,
        email: null,
        phone: null,
        address_post_code: null,
        password: null,
        password_again: null,
    });

    const charityCollection = collection(db, "test_charity");

    const navigation = useNavigation();


    useEffect(() => {
        if (charityFormData.reg_charity_number) {
            getCharities(charityFormData.reg_charity_number)
                .then((charities) => {
                    setCharityFromApi(charities);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [charityFormData.reg_charity_number]);

    const handleSubmit = () => {
        const requiredFields = [
            "reg_charity_number",
            "charity_name",
            "email",
            "phone",
            "address_post_code",
            "password",
            "password_again",
        ];

        //make sure fields are all present in order to submit
        for (const field of requiredFields) {
            if (!charityFormData[field]) {
                return alert(`Please fill in ${field.replace("_", " ")}`);
            }
        }

        //check that the input charity number matches that which is found in gov website
        if (
            charityFormData.reg_charity_number ===
            charityFromApi.reg_charity_number
        ) {
            return alert(
                "This Charity Number doesn't exist. Please input a Charity Number which exists"
            );
        }

        //make sure charity which exists is currently registered and not removed
        if (
            charityFormData.reg_charity_number ===
                charityFromApi.reg_charity_number &&
            charityFromApi.reg_status === "RM"
        ) {
            return alert(
                `The charity with registration number ${charityFormData.reg_charity_number} is no longer a registered charity.`
            );
        }

        //make sure number doesn't already exist in the collection
        for (const element of charities) {
            if (
                element.reg_charity_number ===
                charityFormData.reg_charity_number
            ) {
                return alert(
                    `A charity with the registration number ${element.reg_charity_number} already exists. Please enter a new charity.`
                );
            }
        }

        //make sure name matches that in the gov api (make sure case sensitivity isn't considered)
        if (
            charityFromApi.charity_name.toLowerCase() !==
            charityFormData.charity_name.toLowerCase()
        ) {
            return alert(
                "The name you entered does not match the name associated with this charity number. Please review your entry and try again."
            );
        }

        //make sure email matches that in the gov api
        if (charityFromApi.email !== charityFormData.email) {
            return alert(
                "The email you entered does not match the email associated with this charity number. Please review your entry and try again."
            );
        }

        // make sure phone matches that in the gov api
        const formattedNumberFromApi = charityFromApi.phone.replace(/\s+/g, ""); // remove spaces in number from api
        const formattedNumberInputted = charityFormData.phone.replace(
            /\s+/g,
            ""
        ); // remove spaces in number inputted
        if (formattedNumberFromApi !== formattedNumberInputted) {
            return alert(
                "The phone you entered does not match the phone associated with this charity number. Please review your entry and try again."
            );
        }

        //make sure post code matches that inn the gov api
        const formattedPostCodeFromApi =
            charityFromApi.address_post_code.replace(/\s+/g, ""); // remove spaces in post code from api
        const formattedPostCodeInputted =
            charityFormData.address_post_code.replace(/\s+/g, ""); // remove spaces in inputted post code
        if (
            formattedPostCodeFromApi.toLowerCase() !==
            formattedPostCodeInputted.toLowerCase()
        ) {
            return alert(
                "The Post Code you entered does not match the Post Code associated with this charity number. Please review your entry and try again."
            );
        }

        //make sure password matches upon submission
        if (charityFormData.password !== charityFormData.password_again) {
            return alert(`Passwords do not match. Please try again.`);
        }

        addDoc(charityCollection, charityFromApi)
            .then((docRef) => {
                getCharityList();
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((e) => {
                console.error("Error adding document: ", e);
            });
    };

    const getCharityList = () => {
        getDocs(charityCollection)
            .then((querySnapshot) => {
                return querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
            })
            .then((charityListArray) => {
                setCharities(charityListArray);
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };

    return (
        <SafeAreaView className="h-full">
            <View className="flex flex-row h-10">
                <TouchableOpacity className="w-1/2">
                    <View className="flex-1 flex justify-center items-center border-b-4 border-blue-500 border-blue-600 transform scale-105">
                        <Text className="font-bold">Charity</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    className="w-1/2"
                    onPress={() => navigation.navigate("Volunteer Signup Form")}
                >
                    <View className="flex-1 flex justify-center items-center border border-gray-400 transform scale-95">
                        <Text className="opacity-50">Volunteer</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View className="flex flex-col mb-10">
                <ScrollView className="px-8 mt-6 mb-10">
                    <View className="mb-6">
                        <Text className="text-xl mb-2">Charity Number</Text>
                        <TextInput
                            className="p-3 border rounded"
                            placeholder="Charity Number"
                            keyboardType="numeric"
                            value={charityFormData.reg_charity_number}
                            onChangeText={(number) => {
                                setCharityFormData({
                                    ...charityFormData,
                                    reg_charity_number: number,
                                });
                            }}
                        ></TextInput>
                    </View>
                    <View className="mb-6">
                        <Text className="text-xl mb-2">Charity Name</Text>
                        <TextInput
                            className="p-3 border rounded"
                            placeholder="Name"
                            value={charityFormData.charity_name}
                            onChangeText={(text) => {
                                setCharityFormData({
                                    ...charityFormData,
                                    charity_name: text,
                                });
                            }}
                        ></TextInput>
                    </View>
                    <View className="mb-6">
                        <Text className="text-xl mb-2">Email</Text>
                        <TextInput
                            className="p-3 border rounded"
                            placeholder="Email"
                            value={charityFormData.email}
                            onChangeText={(text) => {
                                setCharityFormData({
                                    ...charityFormData,
                                    email: text,
                                });
                            }}
                        ></TextInput>
                    </View>
                    <View className="mb-6">
                        <Text className="text-xl mb-2">Telephone</Text>
                        <TextInput
                            className="p-3 border rounded"
                            placeholder="Telephone"
                            value={charityFormData.phone}
                            keyboardType="numeric"
                            onChangeText={(number) => {
                                setCharityFormData({
                                    ...charityFormData,
                                    phone: number,
                                });
                            }}
                        ></TextInput>
                    </View>
                    <View className="mb-6">
                        <Text className="text-xl mb-2">Post Code</Text>
                        <TextInput
                            className="p-3 border rounded"
                            placeholder="Post Code"
                            value={charityFormData.address_post_code}
                            onChangeText={(text) => {
                                setCharityFormData({
                                    ...charityFormData,
                                    address_post_code: text,
                                });
                            }}
                        ></TextInput>
                    </View>
                    <View className="mb-6">
                        <Text className="text-xl mb-2">Password</Text>
                        <TextInput
                            className="p-3 border rounded"
                            placeholder="Please enter password"
                            value={charityFormData.password}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                setCharityFormData({
                                    ...charityFormData,
                                    password: text,
                                });
                            }}
                        ></TextInput>
                    </View>
                    <View className="mb-6">
                        <Text className="text-xl mb-2">Repeat Password</Text>
                        <TextInput
                            className="p-3 border rounded"
                            placeholder="Please re-enter password"
                            value={charityFormData.password_again}
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                setCharityFormData({
                                    ...charityFormData,
                                    password_again: text,
                                });
                            }}
                        ></TextInput>
                    </View>
                </ScrollView>
            </View>
            <View className="absolute bottom-0 left-0 right-0 mb-5">
                <Button
                    title="Submit"
                    className="w-full"
                    onPress={handleSubmit}
                />
            </View>
        </SafeAreaView>
    );
}
