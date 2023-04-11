import { StyleSheet } from "react-native";

const logStyles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        rowGap: 15,
    },
    activity: {
        backgroundColor: "#99ffff",
        height: 100,
        borderRadius: 10,
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
});

export default logStyles;