import {
    View,
    FlatList,
    TextInput,
    Text,
    SafeAreaView,
    Switch,
    Button,
    ScrollView,
    TouchableOpacity,
    Pressable,
} from "react-native";
import React, { useState } from "react";

export default function SignupScreen({ navigation }) {
    const [isCharity, setIsCharity] = useState(false);
    const [charityFormData, setCharityFormData] = useState({
        reg_charity_number: null,
        charity_name: null,
        email: null,
        phone: null,
        address_post_code: null,
        password: null,
        password_again: null
    });

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
                <Button title="Submit" className="w-full"/>
            </View>
        </SafeAreaView>
    );
}
