import { SignoutButton } from "./../components/SignoutButton";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { db, dataFromFB, dataTest } from "../firebase/firebase";
import MapView, { Marker } from "react-native-maps";
import ButtonWithOverlay from "../components/ButtonWithOverlay";
import List from "../components/List";
import { getEventLocations, findLatAndLong } from "../firebase/read";

const HomeScreen = () => {
  const { replace, setOptions } = useNavigation();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventsLat, setEventsLat] = useState([]);
  const [eventsLong, setEventsLong] = useState([]);

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
    //   async function test () {findLatAndLong()
    //   const test1 = await findLatAndLong()
    //     console.log(test1)
    // }
    // test()
    //findLatAndLong().then((data) => {console.log("from home" ,data)})
    getEventLocations().then((data) => {
      setEvents(data);

      // for (const event of events) {
      //   event.newlat = findLatAndLong().then((lat) => {return lat})
      //   console.log(events)
      // }
      events.forEach((event) => {
        findLatAndLong().then((data) => {
          event.newlat = data.latitude
          console.log(1, event)
        })
        // event.newlat = findLatAndLong().then((lat) => {return lat})

      //   findLatAndLong().then((data) => {
      //     // setEvents((prevEvents) => {

      //     //   [...prevEvents, 123];
      //     // })
      // });
      });
    });
    // const findAllPostCodes = events.map((event) => {
      //   findLatAndLong()
      // })
      // const results = Promise.all(findAllPostCodes)
      // console.log(results)
    }, []);
    
    useEffect(() => {
      console.log("final log", events);

    }, [events])




  // useEffect(() => {
  // const events =  getEventLocations(); // assuming getEventLocations() returns a promise
  // const promises = events.map(event => findLatandLong(event)); // assuming findLatandLong() returns a promise
  // const results =  Promise.all(promises);
  // const updatedEvents = events.map((event, index) => {
  //   return {
  //     ...event,
  //     lat: results[index].lat,
  //     long: results[index].long
  //   }
  // });
  // setEvents(updatedEvents);
  // console.log(events)

  // }, [])

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
                latitude: event.latitude,
                longitude: event.longitude,
              }}
              pinColor="gold"
              title={event.title}
            ></Marker>
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

      <List />
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
