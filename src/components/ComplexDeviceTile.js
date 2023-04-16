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
    const [valueSlider, setValueSlider] = useState(0);

    const client = getClient(`/${prefixControlFeed}${type.toLowerCase()}`);
    const publish = () => {
        client.publish(`${prefixControlFeed}${type.toLowerCase()}`, JSON.stringify({
            status: isOn,
            mode: isAuto? "auto":"manual",
            value: valueSlider,
            // TODO: get current username
            user: "Steve",
            timestamp: new Date()
        }));
    };

    useEffect(() => {
        fetch(`${baseUrl}/${prefixControlFeed}${type.toLowerCase()}/data`, {
            method: "GET",
            headers: {
                "X-AIO-Key": AIO_KEY
            }
        }).then((res) => res.json()).then((data) => {
            if (data.length > 0) {
                const { status, mode, value } = JSON.parse(data[0].value);
                setIsOn(status);
                setIsAuto(mode === "auto");
                setValueSlider(value);
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
                        setIsOn(!isOn);
                        publish();
                    }} />
                </View>

                <View style={controlStyles.switch}>
                    <Text style={isOn? controlStyles.fontOn:controlStyles.fontOff}>{
                        isAuto? "Auto":"Manual"
                    }</Text>
                    <Switch value={isAuto} onValueChange={() => {
                        setIsAuto(!isAuto);
                        publish();
                    }} disabled={!isOn} />
                </View>
            </View>

            <View style={controlStyles.row}>
                <Text style={isOn? controlStyles.fontOn:controlStyles.fontOff}>Value</Text>
                <Slider
                    style={controlStyles.slider}
                    minimumValue={0}
                    minimumTrackTintColor={isOn? "white":"blue"}
                    maximumValue={4}
                    maximumTrackTintColor={isOn? "#cfcdcc":"white"}
                    step={1}
                    value={valueSlider}
                    onValueChange={(value) => {
                        setValueSlider(value);
                        publish();
                    }}
                    disabled={!isOn || isAuto}
                />
            </View>
        </View>
    );
};

export default ComplexDeviceTile;