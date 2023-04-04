import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Slider, Switch, Text } from "react-native";

const { width } = Dimensions.get("window");

const BottomPanel = () => {
  const [temperature, setTemperature] = useState(25);
  const [isAuto, setIsAuto] = useState(false);

  const handleAutoSwitchChange = (value) => {
    setIsAuto(value);
  };

  const handleTemperatureChange = (value) => {
    setTemperature(value);
  };

  return (
    <View style={styles.bottomPanel}>
      
      <View style={styles.switchContainer}>
        <Switch
          style={styles.switch}
          value={isAuto}
          onValueChange={handleAutoSwitchChange}
        />
      </View>

      <View style={styles.temperatureContainer}>
        <Text style={styles.temperatureText}>Temperature</Text>
        <Slider
          style={styles.slider}
          minimumValue={18}
          maximumValue={30}
          step={1}
          value={temperature}
          onValueChange={handleTemperatureChange}
        />
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
  },
  temperatureContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  temperatureText: {
    color: "#F8F8F8",
    fontSize: 16,
    position: 'relative',
    top: 33,
  },
  slider: {
    flex: 1,
    top: 34,
  },
  switchContainer: {
    // justifyContent: "center",
    // alignItems: "flex-end",
    // position: 'relative',
    left: 200,
    top: 5,
  },
  switch: {
    // position: 'relative',
    right: 0,
    top: 0,
  },
});

export default BottomPanel;