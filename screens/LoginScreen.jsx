import { RegisterButton } from "../components/RegisterButton";
import { LoginButton } from "./../components/LoginButton";
import { LoginForm } from "./../components/LoginForm";
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { replace } = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  return (
    // <KeyboardAvoidingView behavior="padding">
    <SafeAreaView>
      <View className=" justify-center items-center h-full w-full bg-sky-200">
        <Image
          source={require("../assets/logo1.png")}
          className="w-'50%', h-auto"
        />
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />

        <LoginButton email={email} password={password} />
        <RegisterButton email={email} password={password} />
      </View>
    </SafeAreaView>
    // </KeyboardAvoidingView>
  );
};

export default LoginScreen;
