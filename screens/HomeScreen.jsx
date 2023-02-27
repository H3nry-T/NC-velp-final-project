import { SignoutButton } from "./../components/SignoutButton";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Modal,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, Callout } from "react-native-maps";
import ButtonWithOverlay from "../components/ButtonWithOverlay";
import { getEventLocations, findLatAndLong } from "../firebase/read";
import ListButton from "../components/ListButton";
import { EventDetails } from "../components/EventDetails";

const HomeScreen = () => {
  const { replace, setOptions } = useNavigation();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [showEventDetails, setShowEventDetails] = useState(false);

  React.useLayoutEffect(() => {
    setOptions({
      header: () => (
        <View style={{ flexDirection: "row", paddingTop: 25 }}>
          <ButtonWithOverlay></ButtonWithOverlay>
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
    setShowEventDetails(true);
  };

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
        {events?.map((event) => {
          return (
            <Marker
              key={event.id}
              coordinate={{
                latitude: event.newlat,
                longitude: event.newlong,
              }}
              pinColor={"aqua"}
              icon={require("../assets/event-icon.png")}
              style={{ width: 40, height: 40 }}
            >
              <View style={styles.callout}>
                <Callout onPress={() => openEventDetails(event)}>
                  <Text>{event.event_name}</Text>

                  {/*<Image
                  style={styles.image}
                  source={require('../assets/event-img.jpg')}
                  >
                  </Image>*/}
                  {showEventDetails && (
                    <EventDetails
                      key={event.id}
                      event={event}
                      onClose={() => setShowEventDetails(false)}
                    />
                  )}
                </Callout>
              </View>
            </Marker>
          );
        })}

        <Marker
          coordinate={{
            latitude: 51.50572,
            longitude: 0.1276,
          }}
          pinColor="red"
          title="Start location"
          draggable={true}
        ></Marker>
      </MapView>
      <ListButton />
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
