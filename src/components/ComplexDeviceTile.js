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
import { getData } from "../services/asyncStorage";
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
    const [threshold, setThreshold] = useState([0, 0, 0, 0]);
    const [user, setUser] = useState(null);
    const db = getFirestore();

    useEffect(() => {
        getData("user").then((user) => setUser(user));
        const q = query(collection(db, `control-${type.toLowerCase()}`), orderBy("timestamp", "desc"), limit(1));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data()) {
                    setIsOn(doc.data().status === "on");
                    setlevelSlider(doc.data().level);
                    setIsAuto(doc.data().mode === "auto");
                    setThreshold(doc.data().threshold);
                }
            });
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
                        const curTime = getCurrentTime();
                        updateControl(`control-${type.toLowerCase()}`, {
                            user: user.email,
                            timestamp: curTime,
                            device: type.toLowerCase(),
                            status: !isOn? "on":"off",
                        }, {
                            timestamp: curTime,
                            status: !isOn? "on":"off",
                            mode: isAuto? "auto":"manual",
                            level: levelSlider,
                            threshold: threshold,
                        });

                        setIsOn(!isOn);
                    }} />
                </View>

                <View style={controlStyles.switch}>
                    <Text style={isOn? controlStyles.fontOn:controlStyles.fontOff}>{
                        isAuto? "Auto":"Manual"
                    }</Text>
                    <Switch value={isAuto} onValueChange={() => {
                        const curTime = getCurrentTime();
                        updateControl(`control-${type.toLowerCase()}`, {
                            user: user.email,
                            timestamp: curTime,
                            device: type.toLowerCase(),
                            mode: !isAuto? "auto":"manual",
                        }, {
                            timestamp: curTime,
                            status: isOn? "on":"off",
                            mode: !isAuto? "auto":"manual",
                            level: levelSlider,
                            threshold: threshold,
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
                        const curTime = getCurrentTime();
                        updateControl(`control-${type.toLowerCase()}`, {
                            user: user.email,
                            timestamp: curTime,
                            device: type.toLowerCase(),
                            level: value,
                        }, {
                            timestamp: curTime,
                            status: isOn? "on":"off",
                            mode: isAuto? "auto":"manual",
                            level: value,
                            threshold: threshold,
                        });

                        setlevelSlider(value);
                    }}
                    disabled={!isOn || isAuto}
                />
            </View>
            <TextInput
                style={controlStyles.input}
                label="Threshold 1"
                value={String(threshold[0])}
                keyboardType="numeric"
                onChangeText={(text) => {
                    const newThreshold = [...threshold];
                    newThreshold[0] = Number(text);
                    setThreshold(newThreshold);
                }}
                editable={isAuto}
            />
            <TextInput
                style={controlStyles.input}
                label="Threshold 2"
                value={String(threshold[1])}
                keyboardType="numeric"
                onChangeText={(text) => {
                    const newThreshold = [...threshold];
                    newThreshold[1] = Number(text);
                    setThreshold(newThreshold);
                }}
                editable={isAuto}
            />
            <TextInput
                style={controlStyles.input}
                label="Threshold 3"
                value={String(threshold[2])}
                keyboardType="numeric"
                onChangeText={(text) => {
                    const newThreshold = [...threshold];
                    newThreshold[2] = Number(text);
                    setThreshold(newThreshold);
                }}
                editable={isAuto}
            />
            <TextInput
                style={controlStyles.input}
                label="Threshold 4"
                value={String(threshold[3])}
                keyboardType="numeric"
                onChangeText={(text) => {
                    const newThreshold = [...threshold];
                    newThreshold[3] = Number(text);
                    setThreshold(newThreshold);
                }}
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
                        status: isOn? "on":"off",
                        mode: isAuto? "auto":"manual",
                        level: levelSlider,
                        threshold: threshold,
                    });
                }}
            />

        </View>
    );
};

export default ComplexDeviceTile;