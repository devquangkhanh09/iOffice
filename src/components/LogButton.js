import React, { Component } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

function LogButton(props) {
  // let valueColor = "#00887A";
  let valueColor = "blue";
  if (props.value === "off") {
    valueColor = "#FF4500";
  } else if (props.value === "unknown") {
    valueColor = "#B20000";
  }
  else if (props.value === "manual") {
    valueColor = "#FF9933";
  }
  else if (props.value === "auto") {
    valueColor = "#00887A";
  }
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.cardBody}>
        {/* <Image
          source={require("../assets/images/cardImage.png")}
          style={styles.cardItemImagePlace}
        ></Image> */}
        <View style={styles.bodyContent}>
          <Text style={styles.fan}>{props.device}</Text>
          <Text style={[styles.value, {color: valueColor}]}>{props.value}</Text>
        </View>
      </View>
      <View style={styles.group}>
        <View style={styles.turnOffBySteveRow}>
          <Text style={styles.activity}>{props.activity}</Text>
          <Text style={styles.user}>{props.user}</Text>
          <Text style={styles.time}>{props.timestamp}</Text>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#CCC",
    flexWrap: "nowrap",
    backgroundColor: "#dcdedc",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    overflow: "hidden",
    opacity: 0.9,
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bodyContent: {
    paddingHorizontal: 16,
    paddingTop: 7,
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  fan: {
    fontSize: 30,
    color: "#3B8BEB",
    paddingBottom: 5,
    fontWeight: 'bold',
    opacity: 1,
  },
  value: {
    fontSize: 23,
    color: '#00887A',
    fontWeight: 'bold',
    opacity: 0.8,
  },
  activity: {
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.7,
  },
  cardItemImagePlace: {
    backgroundColor: "#ccc",
    width: 80,
    margin: 16
  },
  group: {
    flexDirection: "row"
  },
  user: {
    // fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 15,
    marginTop: 5,
    opacity: 0.6,
  },
  time: {
    // fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 15,
    marginTop: 2,
    opacity: 0.6,
  },
  loremIpsum: {
    // fontFamily: "roboto-regular",
    color: "#121212",
    opacity: 0.5,
    width: 105,
    height: 38,
    textAlign: "right",
    marginLeft: 109
  },
  turnOffBySteveRow: {
    height: 38,
    marginRight: 17,
    marginLeft: 14,
    marginTop: 1,
  },
  date: {
    marginRight: 17,
    marginLeft: 14,
    marginTop: 20
  }
});

export default LogButton;