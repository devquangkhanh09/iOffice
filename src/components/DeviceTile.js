import { 
    View,
    Text
} from "react-native";
import { useState, useEffect } from "react";
import {
    Icon,
    Switch,
    TextInput,
    Button
} from "@react-native-material/core";
import {
    getFirestore,
    collection,
    query,
    orderBy,
    limit,
    onSnapshot,
} from "firebase/firestore";
import {
    getCurrentTime,
    updateControl
} from '../services/utils';
import controlStyles from "../styles/Control.styles";
import { getData } from "../services/asyncStorage";

const DeviceTile = ({
    id,
    type,
    icon,
}) => {
    const [isOn, setIsOn] = useState(false);
    const [isAuto, setIsAuto] = useState(false);
    const [threshold, setThreshold] = useState(50);
    const [user, setUser] = useState(null);

    const db = getFirestore();

    useEffect(() => {
        getData("user").then((user) => setUser(user));
        const q = query(collection(db, `control-${type.toLowerCase()}`), orderBy("timestamp", "desc"), limit(1));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data()) {
                    setIsOn(doc.data().status === "on");
                    setIsAuto(doc.data().mode === "auto");
                    setThreshold(doc.data().threshold);
                }
            });
        });
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
                <Switch value={isOn} onValueChange={() => {
                    const curTime = getCurrentTime();
                    updateControl(`control-${type.toLowerCase()}`, {
                        user: user.email,
                        timestamp: curTime,
                        device: type.toLowerCase(),
                        status: !isOn ? "on" : "off",
                    }, type === 'Led' ? {
                        timestamp: curTime,
                        status: !isOn ? "on" : "off",
                    } : {
                        timestamp: curTime,
                        status: !isOn ? "on" : "off",
                        mode: isAuto ? "auto" : "manual",
                        threshold: threshold,
                    });

                    setIsOn(!isOn);
                }} />
            </View>
            {type !== 'Led' && <>
            <View style={controlStyles.switch}>
                <Text style={isOn? controlStyles.fontOn:controlStyles.fontOff}>{
                    isAuto? "Auto":"Manual"
                }</Text>
                <Switch disabled={!isOn} value={isAuto} onValueChange={() => {
                    const curTime = getCurrentTime();
                    updateControl(`control-${type.toLowerCase()}`, {
                        user: user.email,
                        timestamp: curTime,
                        device: type.toLowerCase(),
                        mode: !isAuto ? "auto" : "manual",
                    }, {
                        timestamp: curTime,
                        status: isOn ? "on" : "off",
                        mode: !isAuto ? "auto" : "manual",
                        threshold: threshold,
                    });

                    setIsAuto(!isAuto);
                }} />
            </View> 
            <TextInput
                style={controlStyles.input}
                label="Threshold"
                value={String(threshold)}
                onChangeText={(text) => setThreshold(Number(text))}
                keyboardType="numeric"
                editable={isAuto}
            /> 
            <Button 
                variant="outlined" 
                title="Save threshold" 
                color={isOn? "white":"black"} 
                onPress={() => {
                    const curTime = getCurrentTime();
                    updateControl(`control-${type.toLowerCase()}`, {
                        user: user.email,
                        timestamp: curTime,
                        device: type.toLowerCase(),
                        threshold: threshold,
                    }, {
                        timestamp: curTime,
                        status: isOn ? "on" : "off",
                        mode: isAuto ? "auto" : "manual",
                        threshold: threshold,
                    });
                }}
            />
            </>}
        </View>
    );
};

export default DeviceTile;