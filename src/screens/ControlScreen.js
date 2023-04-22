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
import ComplexDeviceTile from "../components/ComplexDeviceTile";

const ControlScreen = () => {

    return (
        <ScrollView style={styles.screen}>
            <Text variant="h3" style={styles.title}>Control Center</Text>
            <Text variant="subtitle1" style={{textAlign: "center"}}>
                3 devices connected
            </Text>
            <View style={[{marginTop: 20, marginBottom: 100}, controlStyles.screen]}>
                <DeviceTile
                    id="LED-01"
                    type="Led"
                    icon="lightbulb"
                />
                <DeviceTile
                    id="RELAY-01"
                    type="Relay"
                    icon="power"
                />

                <ComplexDeviceTile
                    id="FAN-01"
                    type="Fan"
                    icon="fan"
                />
            </View>
        </ScrollView>
    );
}

export default ControlScreen;