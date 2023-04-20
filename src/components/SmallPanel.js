import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { Icon } from "@react-native-material/core";
import controlStyles from "../styles/Control.styles";

import { baseUrl } from "../services/client";
import { getData } from "../services/asyncStorage";
import { AIO_KEY } from "@env";

const SmallPanel = ({ type, icon}) => {
  const [value, setValue] = useState(null);
  const [prevalue, setprevalue] = useState(null);
  const prefixData = "metacrektal/feeds/iot-data.data-";

  const typ = type === "Humidity" ? "humd" : "light";

  useEffect(() => {
    fetch(`${baseUrl}/${prefixData}${typ}/data`, {
      method: "GET",
      headers: {
        "X-AIO-Key": AIO_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          setValue(data[data.length - 1].value);
        }
        if (data.length > 1){
          setprevalue(data[data.length - 2].value);
        }
        else {
          setprevalue(data[data.length - 1].value);
        }
      })
      .catch((e) => console.log(e));
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
    </View>
  );
};

export default SmallPanel;
