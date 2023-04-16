import { 
    View,
    Text
} from "react-native";
import { useState, useEffect } from "react";
import {
    Icon,
    Switch
} from "@react-native-material/core";
import controlStyles from "../styles/Control.styles";
import {
    prefixControlFeed,
    baseUrl,
    getClient
} from "../services/client";
import { AIO_KEY } from "@env";

const DeviceTile = ({
    id,
    type,
    icon,
}) => {
    const [isOn, setIsOn] = useState(false);

    const client = getClient(`/${prefixControlFeed}${type.toLowerCase()}`);

    useEffect(() => {
        fetch(`${baseUrl}/${prefixControlFeed}${type.toLowerCase()}/data`, {
            method: "GET",
            headers: {
                "X-AIO-Key": AIO_KEY
            }
        }).then((res) => res.json()).then((data) => {
            if (data.length > 0) setIsOn(JSON.parse(data[0].value).status);
        }).catch((e) => console.log(e));
    }, []);

    return (
        <View style={[controlStyles.tile, isOn? controlStyles.tileOn:controlStyles.tileOff]}>
            <Icon name={icon} size={20} color={isOn? "white":"black"} />
            <Text style={[controlStyles.deviceID, isOn? controlStyles.fontOn:controlStyles.fontOff]}>
                {id}
            </Text>
            <Text style={[controlStyles.deviceType, isOn? controlStyles.fontOn:controlStyles.fontOff]}>
                {type}
            </Text>
            <View style={controlStyles.switch}>
                <Text style={isOn? controlStyles.fontOn:controlStyles.fontOff}>{
                    isOn? "On":"Off"
                }</Text>
                <Switch value={isOn} onValueChange={async () => {
                    setIsOn(!isOn);
                    client.publish(`${prefixControlFeed}${type.toLowerCase()}`, JSON.stringify({
                        status: isOn,
                        // TODO: get current username
                        user: "Steve",
                        timestamp: new Date()
                    }));
                }} />
            </View>
        </View>
    );
};

export default DeviceTile;