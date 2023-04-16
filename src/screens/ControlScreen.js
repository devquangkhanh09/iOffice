import {
    View,
    ScrollView
} from "react-native";
import {
    Text
} from "@react-native-material/core";
import { useState } from "react";
import styles from "../styles/styles";
import controlStyles from "../styles/Control.styles";
import DeviceTile from "../components/DeviceTile";
import ComplexDeviceTile from "../components/ComplexDeviceTile";

const ControlScreen = ({route, navigation}) => {
    // const {clientControlLed, clientControlRelay, clientControlFan} = route.params;
    const [ledState, setLedState] = useState(false);
    const [relayState, setRelayState] = useState(false);
    const [fanState, setFanState] = useState({status: false, speed: 0, mode: "auto"});

    return (
        <ScrollView style={styles.screen}>
            <Text variant="h3" style={styles.title}>Control Center</Text>
            <Text variant="subtitle1" style={{textAlign: "center"}}>
                3 devices connected
            </Text>
            <View style={[{marginTop: 20, marginBottom: 100}, controlStyles.screen]}>
                <View style={controlStyles.tileRow}>
                    <DeviceTile
                        id="LED-01"
                        type="Led"
                        icon="lightbulb"
                        on={ledState}
                    />
                    <DeviceTile
                        id="RELAY-01"
                        type="Relay"
                        icon="power"
                        on={relayState}
                    />
                </View>

                <ComplexDeviceTile
                    id="FAN-01"
                    type="Fan"
                    icon="fan"
                    on={fanState.status}
                    mode={fanState.mode}
                    value={fanState.speed}
                />
            </View>
        </ScrollView>
    );
}

export default ControlScreen;