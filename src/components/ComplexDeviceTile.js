import { 
    View,
    Text
} from "react-native";
import { useState, useEffect } from "react";
import {
    Icon,
    Switch
} from "@react-native-material/core";
import {
    prefixControlFeed,
    baseUrl,
    getClient
} from "../services/client";
import { getData } from "../services/asyncStorage";
import { AIO_KEY } from "@env";
import Slider from "@react-native-community/slider";
import controlStyles from "../styles/Control.styles";

const ComplexDeviceTile = ({
    id,
    type,
    icon,
}) => {
    const [isOn, setIsOn] = useState(false);
    const [isAuto, setIsAuto] = useState(false);
    const [levelSlider, setlevelSlider] = useState(0);
    const [user, setUser] = useState(null);

    const client = getClient(`/${prefixControlFeed}${type.toLowerCase()}`);
    const publish = (data) => {
        const dataPublish = JSON.stringify({
            ...data,
            user: user.email,
            timestamp: new Date()
        });

        client.publish(`${prefixControlFeed}${type.toLowerCase()}`, dataPublish);
    };

    useEffect(() => {
        getData("user").then((user) => setUser(user));
        fetch(`${baseUrl}/${prefixControlFeed}${type.toLowerCase()}/data/last`, {
            method: "GET",
            headers: {
                "X-AIO-Key": AIO_KEY
            }
        }).then((res) => res.json()).then((data) => {
            if (data.value) {
                const { status, mode, level } = JSON.parse(data.value);
                setIsOn(status);
                setIsAuto(mode === "auto");
                setlevelSlider(level);
            }
        });
    }, []);

    return (
        <View style={[controlStyles.tile, controlStyles.complexTile, isOn? controlStyles.tileOn:controlStyles.tileOff]}>
            <Icon name={icon} size={20} color={isOn? "white":"black"} />
            <Text style={[controlStyles.deviceID, isOn? controlStyles.fontOn:controlStyles.fontOff]}>
                {id}
            </Text>
            <Text style={[controlStyles.deviceType, isOn? controlStyles.fontOn:controlStyles.fontOff]}>
                {type}
            </Text>

            <View style={controlStyles.row}>
                <View style={controlStyles.switch}>
                    <Text style={isOn? controlStyles.fontOn:controlStyles.fontOff}>{
                        isOn? "On":"Off"
                    }</Text>
                    <Switch value={isOn} onValueChange={() => {
                        publish({
                            status: !isOn,
                            level: levelSlider,
                            mode: isAuto? "auto":"manual",
                        });
                        setIsOn(!isOn);
                    }} />
                </View>

                <View style={controlStyles.switch}>
                    <Text style={isOn? controlStyles.fontOn:controlStyles.fontOff}>{
                        isAuto? "Auto":"Manual"
                    }</Text>
                    <Switch value={isAuto} onValueChange={() => {
                        publish({
                            status: isOn,
                            level: levelSlider,
                            mode: !isAuto? "auto":"manual",
                        });
                        setIsAuto(!isAuto);
                    }} disabled={!isOn} />
                </View>
            </View>

            <View style={controlStyles.row}>
                <Text style={isOn? controlStyles.fontOn:controlStyles.fontOff}>Level</Text>
                <Slider
                    style={controlStyles.slider}
                    minimumValue={0}
                    minimumTrackTintColor={isOn? "white":"blue"}
                    maximumValue={4}
                    maximumTrackTintColor={isOn? "#cfcdcc":"white"}
                    step={1}
                    value={levelSlider}
                    onValueChange={(value) => {
                        publish({
                            status: isOn,
                            level: value,
                            mode: isAuto? "auto":"manual",
                        });
                        setlevelSlider(value);
                    }}
                    disabled={!isOn || isAuto}
                />
            </View>
        </View>
    );
};

export default ComplexDeviceTile;