import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function SearchBar(props) {
  return (
    <View style={styles.container}>
      <Icon name="magnify" style={styles.inputLeftIcon}></Icon>
      <TextInput placeholder="Search" style={styles.inputStyle}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#EFEFF4",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 359,
    height: 32
  },
  inputLeftIcon: {
    color: "#000",
    fontSize: 20,
    alignSelf: "center",
    paddingLeft: 5,
    paddingRight: 5
  },
  inputStyle: {
    height: 32,
    alignSelf: "flex-start",
    fontSize: 15,
    lineHeight: 15,
    color: "#000",
    flex: 1
  }
});

export default SearchBar;