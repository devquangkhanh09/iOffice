import { View, FlatList, Dimensions } from "react-native";
import { Text } from "@react-native-material/core";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import styles from "../styles/styles";
import logStyles from "../styles/LogScreen.styles";
import React, { Component, useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import SelectionBar from "../components/SelectionBar";
import DatePicker from "../components/DatePicker";
import LogButton from "../components/LogButton";

const { width, height } = Dimensions.get("window");

const data = [
  {
    id: 1,
    time: "15:30, 01/04/2023",
    user: "Steve",
    device: "Fan",
    action: "on",
  },
  {
    id: 2,
    time: "17:00, 01/04/2023",
    user: "Steve",
    device: "Light bulb",
    action: "off",
  },
];

const LogScreen = () => {
  const [activities, setActivities] = useState([]);

  const db = getFirestore();
  useEffect(() => {
    const q = query(
      collection(db, "control"),
      orderBy("timestamp", "desc"),
      limit(20)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setActivities(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);
    // return (
    //   <View style={[styles.screen, logStyles.screen]}>
    //     <Text variant="h3" style={styles.title}>
    //       History
    //     </Text>
    //     <Text variant="subtitle1" style={{ textAlign: "center" }}>
    //       20 most recent activities
    //     </Text>

    //     <FlatList
    //       data={activities}
    //       renderItem={({ item }) => (
    //         <View key={item.id} style={logStyles.activity}>
    //           <View style={logStyles.activityTop}>
    //             <Text style={logStyles.activityTopText}>{item.user}</Text>
    //             <Text style={logStyles.activityTopText}>{item.timestamp}</Text>
    //           </View>
    //           <View style={logStyles.activityBottom}>
    //             <Text style={logStyles.activityBottomText}>
    //               {item.device}:{" "}
    //               {item.status
    //                 ? `turned ${item.status}`
    //                 : item.mode
    //                 ? `mode changed to ${item.mode}`
    //                 : item.threshold
    //                 ? `threshold changed to ${item.threshold}`
    //                 : "unknown"}
    //             </Text>
    //           </View>
    //         </View>
    //       )}
    //       keyExtractor={(item) => item.id}
    //     />
    //   </View>
    // );

  return (
    <View style={styles.container}>
      <View style={[styles.screen]}>
        <Text variant="h3" style={styles.title}>
          History
        </Text>
        <Text variant="subtitle1" style={{ textAlign: "center" }}>
          20 most recent activities
        </Text>
      </View>
      <SearchBar style={logStyles.SearchBar}></SearchBar>
      {/* <SelectionBar style={logStyles.ThreeTabs}></SelectionBar> */}
      <DatePicker style={logStyles.materialIconTextbox}></DatePicker>
      <FlatList
        data={activities}
        renderItem={({ item }) => (
          <LogButton
            style={logStyles.LogButton}
            device={item.device}
            activity={
              item.status
                ? `turned ${item.status}`
                : item.mode
                ? `mode changed`
                : item.threshold
                ? `threshold changed`
                : "unknown"
            }
            user={item.user}
            timestamp={item.timestamp}
            value={
              item.status
                ? item.status
                : item.mode
                ? item.mode
                : item.threshold
                ? item.threshold[item.threshold.length - 1]
                : "unknown"
            }
          ></LogButton>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default LogScreen;
