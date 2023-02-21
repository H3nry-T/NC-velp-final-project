import {
    View,
    FlatList,
    TextInput,
    Text,
    SafeAreaView,
    Switch,
    Button,
    ScrollView,
} from "react-native";
import React, { useState, useNavigate } from "react";

export default function SignupScreen() {
    const [isCharity, setIsCharity] = useState(false);
    const [charityFormData, setCharityFormData] = useState({
        reg_charity_number: null,
        charity_name: null,
        email: null,
        phone: null,
        address_post_code: null,
        password: null,
    });
    const [volunteerFormData, setVolunteerFormData] = useState({
        username: null,
        first_name: null,
        last_name: null,
        email: null,
        year_of_birth: null,
        phone: null,
        post_code: null,
        password: null,
    });

    return (
        <SafeAreaView>
            <View>
                <Text className="text-3xl">
                    {!isCharity
                        ? "Register as Charity"
                        : "Register as Volunteer"}
                </Text>
                <Switch
                    className="ml-4"
                    onValueChange={setIsCharity}
                    value={isCharity}
                />
                <View />
                <View className="px-8 mt-6">
                    {!isCharity ? (
                        <View>
                            <ScrollView>
                                <View className="mb-6">
                                    <Text className="text-xl mb-2">
                                        Charity Number
                                    </Text>
                                    <TextInput
                                        className="p-3 border rounded"
                                        placeholder="Charity Number"
                                        value={
                                            charityFormData.reg_charity_number
                                        }
                                        onChangeText={(number) => {
                                            setCharityFormData({
                                                ...charityFormData,
                                                reg_charity_number: number,
                                            });
                                        }}
                                    ></TextInput>
                                </View>
                                <View className="mb-6">
                                    <Text className="text-xl mb-2">
                                        Charity Name
                                    </Text>
                                    <TextInput
                                        className="p-3 border rounded"
                                        placeholder="Name"
                                        value={
                                            charityFormData.address_post_code
                                        }
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
                                    <Text className="text-xl mb-2">
                                        Telephone
                                    </Text>
                                    <TextInput
                                        className="p-3 border rounded"
                                        placeholder="Telephone"
                                        value={charityFormData.phone}
                                        onChangeText={(number) => {
                                            setCharityFormData({
                                                ...charityFormData,
                                                phone: number,
                                            });
                                        }}
                                    ></TextInput>
                                </View>
                                <View className="mb-6">
                                    <Text className="text-xl mb-2">
                                        Post Code
                                    </Text>
                                    <TextInput
                                        className="p-3 border rounded"
                                        placeholder="Post Code"
                                        value={
                                            charityFormData.address_post_code
                                        }
                                        onChangeText={(text) => {
                                            setCharityFormData({
                                                ...charityFormData,
                                                address_post_code: text,
                                            });
                                        }}
                                    ></TextInput>
                                </View>
                                <View className="mb-6">
                                    <Text className="text-xl mb-2">
                                        Password
                                    </Text>
                                    <TextInput
                                        className="p-3 border rounded"
                                        placeholder="Charity Number"
                                        value={charityFormData.password}
                                        onChangeText={(text) => {
                                            setCharityFormData({
                                                ...charityFormData,
                                                password: text,
                                            });
                                        }}
                                    ></TextInput>
                                </View>
                                <View className="mb-6">
                                <Text className="text-xl mb-2">
                                    Repeat Password
                                </Text>
                                <TextInput
                                    className="p-3 border rounded"
                                    placeholder="Charity Number"
                                    value={charityFormData.password}
                                    onChangeText={(text) => {
                                        setCharityFormData({
                                            ...charityFormData,
                                            password: text,
                                        });
                                    }}
                                ></TextInput>
                            </View>
                            </ScrollView>
                            <Button title="Submit" />
                        </View>
                    ) : (
                        <SafeAreaView>
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
                                ></TextInput>
                            </View>
                            <View className="mb-6">
                                <Text className="text-xl mb-2">
                                    Date of Birth
                                </Text>
                                <TextInput
                                    className="p-3 border rounded"
                                    placeholder="Date of Birth"
                                    value={volunteerFormData.year_of_birth}
                                    onChangeText={(text) => {
                                        setVolunteerFormData({
                                            ...volunteerFormData,
                                            year_of_birth: text,
                                        });
                                    }}
                                ></TextInput>
                            </View>
                            <View className="mb-6">
                                <Text className="text-xl mb-2">Phone</Text>
                                <TextInput
                                    className="p-3 border rounded"
                                    placeholder="Phone"
                                    value={volunteerFormData.phone}
                                    onChangeText={(number) => {
                                        setVolunteerFormData({
                                            ...volunteerFormData,
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
                                    value={volunteerFormData.post_code}
                                    onChangeText={(text) => {
                                        setVolunteerFormData({
                                            ...volunteerFormData,
                                            post_code: text,
                                        });
                                    }}
                                ></TextInput>
                            </View>
                            <View className="mb-6">
                                <Text className="text-xl mb-2">Password</Text>
                                <TextInput
                                    className="p-3 border rounded"
                                    placeholder="Password"
                                    value={volunteerFormData.password}
                                    onChangeText={(text) => {
                                        setVolunteerFormData({
                                            ...volunteerFormData,
                                            password: text,
                                        });
                                    }}
                                ></TextInput>
                            </View>
                        </SafeAreaView>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}
