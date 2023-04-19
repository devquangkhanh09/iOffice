import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Pressable,
  Button,
} from "react-native";
import { Switch } from "@react-native-material/core";

const { width } = Dimensions.get("window");

const BottomPanel = ({ temp }) => {
  const [temperature, setTemperature] = useState(25);
  const [isAuto, setIsAuto] = useState(true);

  const handleAutoSwitchChange = (value) => {
    setIsAuto(value);
  };

  const handleTemperatureChange = (value) => {
    setTemperature(value);
  };

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
          {temp}°C
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
