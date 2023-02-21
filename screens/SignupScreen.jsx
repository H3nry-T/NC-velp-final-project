import {
  View,
  FlatList,
  TextInput,
  Text,
  SafeAreaView,
  Switch,
} from "react-native";
import React, { useState, useNavigate } from "react";

export default function SignupScreen() {
  const [isCharity, setIsCharity] = useState(false);
  const [formData, setFormData] = useState({
    email: null,
    firstname: null,
    lastname: null,
    postcode: null,
    username: 'Henry',
    'year-of-birth': null
  })
  
  return (
    <SafeAreaView>
      {!isCharity && <Text>Register as Charity</Text>}
      {isCharity && <Text>Register as Volunteer</Text>}
      <Switch onValueChange={setIsCharity} value={isCharity} />
      <View>
        <Text>Username</Text>
        <TextInput value={formData.username} onChangeText={(text) => {setFormData.username = text}}/>
      </View>
      <View>
        <Text>First Name</Text>
        <TextInput />
      </View>
      <View>
        <Text>Last Name</Text>
        <TextInput />
      </View>
      <View>
        <Text>Email</Text>
        <TextInput />
      </View>
      {!isCharity && (
        <View>
          <Text>Year of Birth</Text>
          <TextInput />
        </View>
      )}
      {isCharity && (
        <View>
          <Text>Charity Number</Text>
          <TextInput />
        </View>
      )}

      {isCharity && (
        <View>
          <Text>Address Line 1</Text>
          <TextInput />
        </View>
      )}
      {isCharity && (
        <View>
          <Text>Address Line 2</Text>
          <TextInput />
        </View>
      )}

      {isCharity && (
        <View>
          <Text>Address Line 3</Text>
          <TextInput />
        </View>
      )}

      {isCharity && (
        <View>
          <Text>Address Line 4</Text>
          <TextInput />
        </View>
      )}

      {isCharity && (
        <View>
          <Text>Address Line 5</Text>
          <TextInput />
        </View>
      )}
      <View>
        <Text>PostCode</Text>
        <TextInput />
      </View>
    </SafeAreaView>
  );
}
