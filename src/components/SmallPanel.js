import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { Icon } from "@react-native-material/core";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

const SmallPanel = ({ type, icon}) => {
  const [value, setValue] = useState(null);
  const [preValue, setpreValue] = useState(null);

  const db = getFirestore();

  useEffect(() => {
    const q = query(
      collection(db, type === "Humidity" ? "data-humd" : "data-light"),
      orderBy("timestamp", "desc"),
      limit(2)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.size >= 1) {
        setValue(querySnapshot.docs[0].data().value);
        if (querySnapshot.size >= 2) {
          setpreValue(querySnapshot.docs[1].data().value);
        }
      }
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        height: 140,
        borderRadius: 20,
        padding: 15,
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "flex-start",
        backgroundColor: "#282424",
        opacity: 0.95,
      }}
    >
      <Icon name={icon} size={20} color={"#F8F8F8"} opacity={0.6} />
      <Text
        style={{
          fontWeight: "900",
          color: "#F8f8f8",
          opacity: 0.6,
        }}
      >
        {type}
      </Text>

      <Text
        style={{
          color: "#F8f8f8",
          fontStyle: "italic",
          fontSize: 35,
          opacity: 0.6,
        }}
      >
        {value}
      </Text>
      {preValue === null || preValue === value ||
        <Icon name={value > preValue ? "arrow-up" : "arrow-down"} size={24} color={value > preValue ? "red" : "green"} />
      }
    </View>
  );
};

export default SmallPanel;
