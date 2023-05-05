import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
} from "react-native";
import { Icon } from "@react-native-material/core";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

const { width } = Dimensions.get("window");

const BottomPanel = () => {
  const [value, setValue] = useState(null);
  const [preValue, setpreValue] = useState(null);

  const db = getFirestore();

  useEffect(() => {
    const q = query(
      collection(db, "data-temp"),
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
    <View style={styles.bottomPanel}>
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperatureText}>Temperature</Text>
        <Text
          style={{
            color: "#F8f8f8",
            fontStyle: "italic",
            fontSize: 30,
            opacity: 0.6,
          }}
        >
          {value}°C
        </Text>

        {preValue === null || preValue === value ||
          <Icon name={value > preValue ? "arrow-up" : "arrow-down"} size={24} color={value > preValue ? "red" : "green"} />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomPanel: {
    position: "absolute",
    bottom: 5,
    width: width * 0.9,
    height: 124,
    backgroundColor: "#282424",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    flexDirection: "row",
    // alignItems: "center",
    left: width * 0.05,
    opacity: 0.9,
  },
  temperatureContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  temperatureText: {
    fontWeight: "900",
    color: "#F8F8F8",
    fontSize: 16,
    opacity: 0.6,
  },
  slider: {
    flex: 1,
    top: 34,
    width: "80%",
  },
});

export default BottomPanel;
