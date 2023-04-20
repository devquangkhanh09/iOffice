import { StyleSheet } from "react-native";

const drawerStyles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        rowGap: 25,
        paddingVertical: 100,
        paddingHorizontal: 50,
    },
    userText: {
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
    },
});

export default drawerStyles;