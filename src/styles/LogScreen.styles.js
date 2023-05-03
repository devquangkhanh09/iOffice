import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const logStyles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    rowGap: 20,
  },
  activity: {
    backgroundColor: "#99ffff",
    height: 100,
    borderWidth: 1,
    padding: 15,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  activityTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityTopText: {
    fontSize: 14,
    fontStyle: "italic",
  },
  activityBottom: {
    flexDirection: "row",
    justifyContent: "center",
  },
  activityBottomText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  SearchBar: {
    height: 44,
    width: width,
    marginTop: 50,
  },
  ThreeTabs: {
    height: 56,
    width: width,
    marginTop: 100,
  },
  materialIconTextbox: {
    height: 43,
    width: width,
    // marginTop: -125,
    marginTop: 10,
  },
  LogButton: {
    height: 130,
    width: width * 0.95,
    marginTop: 10,
    marginLeft: 8,
  },
});

export default logStyles;
