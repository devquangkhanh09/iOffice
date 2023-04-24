import {
    View,
    ScrollView
} from "react-native";
import {
    Text,
    IconButton,
    Icon
} from "@react-native-material/core";
import { useState, useEffect } from "react";
import styles from "../styles/styles";
import controlStyles from "../styles/Control.styles";
import DeviceTile from "../components/DeviceTile";
import ComplexDeviceTile from "../components/ComplexDeviceTile";
import { getData } from "../services/asyncStorage";

const ControlScreen = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    
    useEffect(() => {
        getData('status').then(status => {
            setIsAuthorized(status === 'at office');
        });
    }, []);

    return (
        <ScrollView style={styles.screen}>
            <View  style={controlStyles.header}>
                <Text variant="h3" style={styles.title}>Control Center</Text>
                <IconButton
                    icon={<Icon name="refresh" size={24} />}
                    onPress={async () => {
                        const status = await getData('status');
                        setIsAuthorized(status === 'at office');
                    }}
                />
            </View>
            <Text variant="subtitle1" style={{textAlign: "center"}}>
                3 devices connected. {isAuthorized || 'You are not authorized to control devices.'}
            </Text>
            <View style={[{marginTop: 20, marginBottom: 100}, controlStyles.screen]}>
                <DeviceTile
                    id="LED-01"
                    type="Led"
                    icon="lightbulb"
                    isAuthorized={isAuthorized}
                />
                <DeviceTile
                    id="RELAY-01"
                    type="Relay"
                    icon="power"
                    isAuthorized={isAuthorized}
                />

                <ComplexDeviceTile
                    id="FAN-01"
                    type="Fan"
                    icon="fan"
                    isAuthorized={isAuthorized}
                />
            </View>
        </ScrollView>
    );
}

export default ControlScreen;