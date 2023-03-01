import { SignoutButton } from "./../components/SignoutButton";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Modal,
  Image,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, Callout } from "react-native-maps";
import ButtonWithOverlay from "../components/ButtonWithOverlay";
import { getEventLocations, findLatAndLong } from "../firebase/read";
import ListButton from "../components/ListButton";
import { EventDetails } from "../components/EventDetails";
import * as Location from "expo-location";

const HomeScreen = () => {
  const { replace, setOptions } = useNavigation();
  const [events, setEvents] = useState([]);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 51.508001,
    longitude: -0.12754,
  });

  React.useLayoutEffect(() => {
    setOptions({
      header: () => (
        <View className="flex-row" style={styles.transparentBG}>
          <ButtonWithOverlay />
        </View>
      ),
    });
  }, [setOptions]);

  useEffect(() => {
    getEventLocations().then((fbEventData) => {
      let eventLocations = fbEventData;
      const updatedEvents = eventLocations.map((eventLocation) => {
        return findLatAndLong(eventLocation.postcode).then((data) => {
          eventLocation.newlat = data.latitude;
          eventLocation.newlong = data.longitude;
          return eventLocation;
        });
      });

      Promise.all(updatedEvents).then((eventsWithLatAndLong) => {
        setEvents(eventsWithLatAndLong);
      });
    });
  }, []);

  const openEventDetails = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <SafeAreaView className="flex justify-center items-center flex-1">
      <StatusBar hidden />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: 51.508001,
            longitude: -0.12754,
          }}
          pinColor="red"
          title="Default location"
        ></Marker>
        <Marker
          coordinate={{
            latitude: currentLocation.latitude || 0,
            longitude: currentLocation.longitude || 0,
          }}
          pinColor="indigo"
          title="Current location"
        ></Marker>
        {events?.map((event) => {
          return (
            <Marker
              key={event.event_id}
              coordinate={{
                latitude: event.newlat,
                longitude: event.newlong,
              }}
              pinColor={"aqua"}
              icon={require("../assets/event-icon.png")}
            >
              <View style={styles.callout}>
                <Callout onPress={() => openEventDetails(event)}>
                  <Text>{event.event_name}</Text>
                </Callout>
              </View>
            </Marker>
          );
        })}
      </MapView>
      <ListButton />
      {showEventDetails && selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setShowEventDetails(false)}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  transparentBG: {
    backgroundColor: "rgba(0,0,0,0)",
  },
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
  name: {
    fontSize: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  callout: {
    flexDirection: "row",
  },
});
