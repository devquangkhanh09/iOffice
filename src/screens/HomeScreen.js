// import {
//     View,
// } from "react-native";
// import {
//     Text
// } from "@react-native-material/core";
// import styles from "../styles/styles";

// const HomeScreen = () => {
//     return (
//         <View style={styles.screen}>
//             <Text variant="h3" style={styles.title}>Home</Text>
//         </View>
//     );
// }

// export default HomeScreen;

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Switch,
  Dimensions,
} from "react-native";
import BottomPanel from "../components/BottomPanel";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const [humidifierAirAuto, setHumidifierAirAuto] = useState(false);
  const [fanAuto, setFanAuto] = useState(false);
  const [temperature, setTemperature] = useState([25]);

  const onTemperatureChange = (values) => {
    setTemperature(values);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require("./../../assets/background.png")}
      />
      <View style={styles.controlContainer}>
        <View style={styles.control}>
          <Text>Humidifier Air</Text>
          <Switch
            value={humidifierAirAuto}
            onValueChange={setHumidifierAirAuto}
          />
        </View>
        <View style={styles.control}>
          <Text>Fan</Text>
          <Switch value={fanAuto} onValueChange={setFanAuto} />
        </View>
      </View>
      <View style={styles.controlContainer}>
        <BottomPanel />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height * 0.5,
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  control: {
    alignItems: "center",
  },
  sliderSelectedStyle: {
    backgroundColor: "#FFB267",
  },
  sliderUnselectedStyle: {
    backgroundColor: "#dcdcdc",
  },
  sliderTrackStyle: {
    height: 10,
    borderRadius: 10,
  },
  sliderMarkerStyle: {
    backgroundColor: "#FFB267",
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: "#FFB267",
    borderRadius: 10,
    marginTop: -3,
    marginLeft: -10,
  },
  temperatureContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  temperatureText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default HomeScreen;
