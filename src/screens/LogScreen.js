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
import DropDownPicker from 'react-native-dropdown-picker';
import styles from "../styles/styles";
import logStyles from "../styles/LogScreen.styles";
import React, { useState, useEffect } from "react";
import LogButton from "../components/LogButton";

const LogScreen = () => {
  const [activities, setActivities] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('all');
  const [items, setItems] = useState([
    {label: 'All', value: 'all'},
    {label: 'Led', value: 'led'},
    {label: 'Fan', value: 'fan'},
    {label: 'Relay', value: 'relay'},
  ]);

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

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />

      <FlatList
        data={activities.filter((item) => {
          if (value === 'all') {
            return true;
          }
          return item.device === value;
        })}
        renderItem={({ item }) => (
          <LogButton
            style={logStyles.LogButton}
            device={item.device}
            activity={
              item.status
                ? `status changed`
                : item.mode
                ? `mode changed`
                : item.threshold
                ? `threshold changed`
                : item.level !== undefined
                ? `level changed`
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
                ? item.threshold.join(", ")
                : item.level !== undefined
                ? item.level
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
