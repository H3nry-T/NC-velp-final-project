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
import {useNavigation} from '@react-navigation/native';

export default function VolunteerSignupScreen() {
  const [isVolunteer, setIsVolunteer] = useState(false);
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
  const navigation = useNavigation();


  return (
      <SafeAreaView className="h-full">
              <View className="flex flex-row h-10">
              <TouchableOpacity className="w-1/2" onPress= {() => navigation.navigate("Charity Signup Form")}>
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
                      </View>
              </ScrollView>
          </View>
          <View className="absolute bottom-0 left-0 right-0 mb-5">
              <Button title="Submit" className="w-full" />
          </View>
      </SafeAreaView>
  );
}
