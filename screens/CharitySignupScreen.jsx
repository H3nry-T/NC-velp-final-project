import { errorCheckOnSubmit as handleSubmit } from "./../utils/errorCheckOnSubmit";
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
import { collection, addDoc, db, getDocs, auth } from "../firebase/firebase";
import { useNavigation } from "@react-navigation/native";
import { NavBarRegistration } from "../components/NavBarRegistration";

export default function SignupScreen() {
    const [charities, setCharities] = useState([]);
    const [charityFromApi, setCharityFromApi] = useState({});
    const [charityFormData, setCharityFormData] = useState({
        reg_charity_number: "",
        charity_name: "",
        email: "",
        phone: "",
        address_post_code: "",
        password: "",
        password_again: "",
    });

    const charityCollection = collection(db, "test_charity");

    const navigation = useNavigation();

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
                alert("Error getting documents: ", error);
            });
    };

    return (
        <SafeAreaView className="h-full flex-1">
            <NavBarRegistration navigation={navigation} />
            <View className="flex flex-col mb-10 w-full h-full bg-sky-200">
                <ScrollView className="px-8 mt-6 mb-20">
                    <View className="mb-8">
                        {/* <Text className="text-xl mb-2">Charity Number</Text> */}
                        <TextInput
                            className="p-3 border rounded bg-white"
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
                    <View className="mb-8">
                        {/* <Text className="text-xl mb-2">Charity Name</Text> */}
                        <TextInput
                            className="p-3 border rounded bg-white"
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
                    <View className="mb-8">
                        {/* <Text className="text-xl mb-2">Email</Text> */}
                        <TextInput
                            className="p-3 border rounded bg-white"
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
                    <View className="mb-8">
                        {/* <Text className="text-xl mb-2">Telephone</Text> */}
                        <TextInput
                            className="p-3 border rounded bg-white"
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
                    <View className="mb-8">
                        {/* <Text className="text-xl mb-2">Post Code</Text> */}
                        <TextInput
                            className="p-3 border rounded bg-white"
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
                    <View className="mb-8">
                        {/* <Text className="text-xl mb-2">Password</Text> */}
                        <TextInput
                            className="p-3 border rounded bg-white"
                            placeholder="Password"
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
                    <View className="mb-8">
                        {/* <Text className="text-xl mb-2">Repeat Password</Text> */}
                        <TextInput
                            className="p-3 border rounded bg-white"
                            placeholder="Re-enter Password"
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
            <View className="absolute bottom-0 left-0 right-0 mb-3">
                <TouchableOpacity
                    onPress={() => {
                        handleSubmit(
                            charityFromApi,
                            setCharityFromApi,
                            charities,
                            charityCollection,
                            getCharityList,
                            setCharities,
                            charityFormData
                        );
                    }}
                    className="rounded-2xl p-2 py-3 w-11/12 mx-auto bg-cyan-800"
                >
                    <Text className="text-xl text-center font-bold text-white">
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
