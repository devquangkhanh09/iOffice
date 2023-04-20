import { 
    View,
    Text
} from "react-native";
import { useState, useEffect } from "react";
import {
    Icon,
} from "@react-native-material/core";
import controlStyles from "../styles/Control.styles";

const SmallPanel = ({ 
    type,
    icon,
    value,
}) => {
    return (
        <View style={{
            flex: 1,
            height: 140,
            borderRadius: 20,
            padding: 15,
            flexDirection: "column",
            justifyContent: "space-between",
            alignContent: "flex-start",
            backgroundColor: "#282424",
            opacity: 0.95,
        }}>
            <Icon name={icon} size={20} color={'#F8F8F8'} opacity={0.6} />
            <Text style={{
                fontWeight: "900",
                color: "#F8f8f8",
                opacity: 0.6,
            }}>
                {type}   
            </Text>
            <Text style={{
                color: "#F8f8f8",
                fontStyle: "italic",
                fontSize: 35,
                opacity: 0.6,
            }}>
                {value}
            </Text>
        </View>
    );
};

export default SmallPanel;