import { StyleSheet } from "react-native";

const controlStyles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        rowGap: 25,
    },
    tileRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        columnGap: 25,
    },
    tile: {
        width: "100%",
        borderRadius: 20,
        padding: 15,
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "flex-start",
        rowGap: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    slider: {
        width: "80%",
    },
    switch: {
        flexDirection: "row",
        justifyContent: "space-between",
        columnGap: 15,
    },
    tileOn: {
        backgroundColor: "#2631ff"
    },
    tileOff: {
        backgroundColor: "#dcdedc"
    }, 
    fontOn: {
        color: "white"
    },
    fontOff: {
        color: "black"
    },
    deviceID: {
        fontWeight: "900",
    },
    deviceType: {
        fontStyle: "italic"
    }
});

export default controlStyles;