import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Switch,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import BottomPanel from "../components/BottomPanel";
import SmallPanel from "../components/SmallPanel";
import controlStyles from "../styles/Control.styles";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const [humidifierAirAuto, setHumidifierAirAuto] = useState(false);
  const [fanAuto, setFanAuto] = useState(false);
  const [temperature, setTemperature] = useState(25);

  const onTemperatureChange = (values) => {
    setTemperature(values);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require("./../../assets/background.png")}
      />
      <View style={[styles.controlContainer, { marginBottom: 10 }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            columnGap: 10,
          }}
        >
          <SmallPanel type="Humidity" icon="water" value="33%" />
          <SmallPanel type="Light" icon="lightbulb" value="33%" />
        </View>
      </View>
      <View style={styles.temperatureContainer}>
        <BottomPanel temp={32} />
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
    justifyContent: "space-around",
    width: "100%",
    padding: 20,
    marginTop: 275,
  },
  control: {
    marginBottom: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  controlText: {
    marginLeft: 10,
    fontSize: 18,
  },
  temperatureContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  temperatureText: {
    fontSize: 48,
    fontWeight: "900",
    fontStyle: "italic",
  },
  temperatureButton: {
    backgroundColor: "black",
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 10,
  },
});

export default HomeScreen;
