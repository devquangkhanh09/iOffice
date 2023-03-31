import { 
    View,
    Text
} from "react-native";
import { useState } from "react";
import {
    Icon,
    Switch
} from "@react-native-material/core";
import controlStyles from "../styles/Control.styles";

const DeviceTile = ({
    id,
    type,
    icon,
    on
}) => {
    const [checked, setChecked] = useState(on);

    return (
        <View style={[controlStyles.tile, checked? controlStyles.tileOn:controlStyles.tileOff]}>
            <Icon name={icon} size={20} color={checked? "white":"black"} />
            <Text style={[controlStyles.deviceID, checked? controlStyles.fontOn:controlStyles.fontOff]}>
                {id}
            </Text>
            <Text style={[controlStyles.deviceType, checked? controlStyles.fontOn:controlStyles.fontOff]}>
                {type}
            </Text>
            <View style={controlStyles.switch}>
                <Text style={checked? controlStyles.fontOn:controlStyles.fontOff}>{
                    checked? "On":"Off"
                }</Text>
                <Switch value={checked} onValueChange={() => setChecked(!checked)} />
            </View>
        </View>
    );
};

export default DeviceTile;