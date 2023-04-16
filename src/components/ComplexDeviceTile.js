import { 
    View,
    Text
} from "react-native";
import { useState } from "react";
import {
    Icon,
    Switch
} from "@react-native-material/core";
import Slider from "@react-native-community/slider";
import controlStyles from "../styles/Control.styles";

const ComplexDeviceTile = ({
    id,
    type,
    icon,
    on,
    mode,
    value,
}) => {
    const [isOn, setIsOn] = useState(on);
    const [isAuto, setIsAuto] = useState(mode === "auto");
    const [valueSlider, setValueSlider] = useState(value);

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
                    <Switch value={isOn} onValueChange={() => setIsOn(!isOn)} />
                </View>

                <View style={controlStyles.switch}>
                    <Text style={isOn? controlStyles.fontOn:controlStyles.fontOff}>{
                        isAuto? "Auto":"Manual"
                    }</Text>
                    <Switch value={isAuto} onValueChange={() => setIsAuto(!isAuto)} disabled={!isOn} />
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
                    onValueChange={setValueSlider}
                    disabled={!isOn || isAuto}
                />
            </View>
        </View>
    );
};

export default ComplexDeviceTile;