import { StyleSheet } from "react-native";

const controlStyles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignContent: "flex-start",
        flexWrap: "wrap",
        rowGap: 25,
        columnGap: 25,
    },
    tile: {
        width: 150,
        height: 150,
        borderRadius: 20,
        padding: 15,
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "flex-start",
    },
    switch: {
        flexDirection: "row",
        justifyContent: "space-between"
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