import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Pressable,
  Button,
} from "react-native";
import { Switch } from "@react-native-material/core";

import { baseUrl } from "../services/client";
import { getData } from "../services/asyncStorage";
import { AIO_KEY } from "@env";
const { width } = Dimensions.get("window");

const BottomPanel = () => {
  const [temperature, setTemperature] = useState(null);

  const prefixData = "metacrektal/feeds/iot-data.data-";

  useEffect(() => {
    fetch(`${baseUrl}/${prefixData}temp/data`, {
      method: "GET",
      headers: {
        "X-AIO-Key": AIO_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setTemperature(data[data.length - 1].value);
      })
      .catch((e) => console.log(e));
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
            bottom: 15,
          }}
        >
          {temperature}°C
        </Text>
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
    position: "relative",
    top: 15,
    opacity: 0.6,
  },
  slider: {
    flex: 1,
    top: 34,
    width: "80%",
  },
});

export default BottomPanel;
