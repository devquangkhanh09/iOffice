import {
    View,
    ScrollView
} from "react-native";
import {
    Text
} from "@react-native-material/core";
import styles from "../styles/styles";
import controlStyles from "../styles/Control.styles";
import DeviceTile from "../components/DeviceTile";

const data = [
    {
        id: "B-01",
        type: "Bulb",
        icon: "lightbulb",
        on: true
    },
    {
        id: "B-02",
        type: "Bulb",
        icon: "lightbulb",
        on: true
    },
    {
        id: "A-01",
        type: "Air conditioner",
        icon: "air-conditioner",
        on: false
    },
    {
        id: "R-01",
        type: "Router",
        icon: "router-wireless",
        on: true
    },
    {
        id: "S-01",
        type: "Temperature sensor",
        icon: "select-inverse",
        on: true
    },
    {
        id: "B-03",
        type: "Bulb",
        icon: "lightbulb",
        on: false
    },
    {
        id: "B-04",
        type: "Bulb",
        icon: "lightbulb",
        on: false
    },
    {
        id: "A-02",
        type: "Air conditioner",
        icon: "air-conditioner",
        on: false
    },
    {
        id: "R-02",
        type: "Router",
        icon: "router-wireless",
        on: true
    },
]

const ControlScreen = () => {
    return (
        <ScrollView style={styles.screen}>
            <Text variant="h3" style={styles.title}>Control Center</Text>
            <Text variant="subtitle1" style={{textAlign: "center"}}>
                {data.length} device{data.length <= 1? "":"s"}
            </Text>
            <View style={[{marginTop: 20, marginBottom: 100}, controlStyles.screen]}>
            {
                data.map((device) => (
                    <DeviceTile
                        key={device.id}
                        id={device.id}
                        type={device.type}
                        icon={device.icon}
                        on={device.on}
                    />
                ))
            }
            </View>
        </ScrollView>
    );
}

export default ControlScreen;