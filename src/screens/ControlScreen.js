import {
    View,
    ScrollView
} from "react-native";
import styles from "../styles/styles";
import controlStyles from "../styles/controlStyles";
import DeviceTile from "../components/DeviceTile";

const data = [
    {
        id: "B-01",
        type: "Bulb",
        icon: "lightbulb"
    },
    {
        id: "B-02",
        type: "Bulb",
        icon: "lightbulb"
    },
    {
        id: "A-01",
        type: "Air conditioner",
        icon: "air-conditioner"
    },
    {
        id: "R-01",
        type: "Router",
        icon: "router-wireless"
    },
    {
        id: "S-01",
        type: "Temperature sensor",
        icon: "select-inverse"
    },
    {
        id: "B-03",
        type: "Bulb",
        icon: "lightbulb"
    },
    {
        id: "B-04",
        type: "Bulb",
        icon: "lightbulb"
    },
    {
        id: "A-02",
        type: "Air conditioner",
        icon: "air-conditioner"
    },
    {
        id: "R-02",
        type: "Router",
        icon: "router-wireless"
    },
]

const ControlScreen = () => {
    return (
        <ScrollView>
            <View style={[styles.screen, controlStyles.screen]}>
            {
                data.map((device) => (
                    <DeviceTile
                        key={device.id}
                        id={device.id}
                        type={device.type}
                        icon={device.icon}
                    />
                ))
            }
            </View>
        </ScrollView>
    );
}

export default ControlScreen;