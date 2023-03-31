import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    skipButton: {
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginLeft: "auto",
        text: {
            color: '#FF8A00',
            fontSize: 16,
        }
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backButton: {
        paddingVertical: 15,
        borderRadius: 5,
        marginRight: 50,
        width: 130,

        alignItems: 'center',
        justifyContent: 'center',
        text: {
            color: '#FF8A00', fontSize: 16, fontWeight: "bold"
        }
    },
    nextButton: {
        backgroundColor: '#FF8A00',
        paddingVertical: 15,
        borderRadius: 5,
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        text: {
            color: '#fff', fontSize: 16, fontWeight: "bold"
        }
    }
});

export default styles;