import { SignoutButton } from "./../components/SignoutButton";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import MapView, { Marker } from "react-native-maps";
import Overlay from "../components/Overlay";
import ButtonWithOverlay from "../components/ButtonWithOverlay";

const HomeScreen = () => {
  const { replace, setOptions } = useNavigation();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  React.useLayoutEffect(() => {
    setOptions({
      header: () => (
        <View style={{ flexDirection: "row", paddingTop: 25 }}>
          <ButtonWithOverlay></ButtonWithOverlay>
          <TouchableOpacity onPress={() => console.log("Button 2 pressed")}>
            <Text>List</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.50572,
          longitude: 0.1276,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: 51.50572,
            longitude: 0.1276,
          }}
          pinColor="red"
          draggable={true}
        ></Marker>
      </MapView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "30%",
    backgroundColor: "#00B8FF",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
