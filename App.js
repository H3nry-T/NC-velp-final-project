import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import NavBar from "./components/NavBar";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import SignupScreen from "./screens/CharitySignupScreen";
import VolunteerSignupScreen from "./screens/VolunteerSignupScreen";
import AddEventScreen from "./screens/AddEventScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    const [authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthenticated(!!user);
        });
        //event listener returns a clean up function
        return unsubscribe;
    }, []);

    // I want a navbar to appear here if the user is logged in!
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name="Login"
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            headerShadowVisible: false,
                            headerTransparent: true,
                            
                        }}
                    />
                    <Stack.Screen name="Map" component={Map} />
                    <Stack.Screen
                        name="AddEvent"
                        component={AddEventScreen}
                        options={{
                            headerStyle: { backgroundColor: "#00ACC1" },
                            headerTitleStyle: { color: "#ffffff" },
                            headerTintColor: "#ffffff"

                        }}
                    />
                    <Stack.Screen
                        name="Charity Signup Form"
                        component={SignupScreen}
                        options={{
                            headerBackTitleVisible: false,
                            headerStyle: { backgroundColor: "#00ACC1"},
                            headerTitleStyle: { color: "#ffffff" },
                            headerTintColor: "#ffffff"
                        }}
                    />
                    <Stack.Screen
                        name="Volunteer Signup Form"
                        component={VolunteerSignupScreen}
                        options={{
                            headerBackTitleVisible: false,
                            headerStyle: { backgroundColor: "#00ACC1" },
                            headerTitleStyle: { color: "#ffffff" },
                            headerTintColor: "#ffffff"
                            
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0)",
        alignItems: "center",
        justifyContent: "center",
    },
});
