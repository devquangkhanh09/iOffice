import { StyleSheet } from "react-native";

const dashboardStyles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        rowGap: 15,
    },
    selectionRow: {
        height: "5%",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#4287f5",
        justifyContent: "center",
    },
    selection: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    selectionText: {
        fontSize: 16,
    },
    selectionSelected: {
        backgroundColor: "#4287f5",
    },
    selectionTextSelected: {
        color: "#fafbfc",
    },
    chart: {
        paddingHorizontal: 0,
    },
});

export default dashboardStyles;