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
import { getData } from "../services/asyncStorage";
import { AIO_KEY } from "@env";

const DeviceTile = ({
    id,
    type,
    icon,
}) => {
    const [isOn, setIsOn] = useState(false);
    const [user, setUser] = useState(null);

    const client = getClient(`/${prefixControlFeed}${type.toLowerCase()}`);

    useEffect(() => {
        getData("user").then((user) => setUser(user));
        fetch(`${baseUrl}/${prefixControlFeed}${type.toLowerCase()}/data/last`, {
            method: "GET",
            headers: {
                "X-AIO-Key": AIO_KEY
            }
        }).then((res) => res.json()).then((data) => {
            if (data.value) setIsOn(JSON.parse(data.value).status);
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
                    client.publish(`${prefixControlFeed}${type.toLowerCase()}`, JSON.stringify({
                        status: !isOn,
                        // TODO: get current username
                        user: user.email,
                        timestamp: new Date()
                    }));
                    setIsOn(!isOn);
                }} />
            </View>
        </View>
    );
};

export default DeviceTile;