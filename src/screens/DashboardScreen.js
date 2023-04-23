import {
    View,
    Pressable,
    Button,
    Platform,
} from "react-native";
import {
    Text
} from "@react-native-material/core";
import { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import styles from "../styles/styles";
import dashboardStyles from "../styles/Dashboard.styles";
import DateTimePicker from '@react-native-community/datetimepicker';

import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();
const humdRef = collection(db,'data-humd');
const tempRef = collection(db,'data-temp');

const chartConfig = {
    backgroundGradientFrom: "#606163",
    backgroundGradientFromOpacity: 0.1,
    backgroundGradientTo: "#606163",
    backgroundGradientToOpacity: 0.1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    decimalPlaces: 0,
};


const DashboardScreen = () => {
    const [type, setType] = useState(null);
    const [typeC, setTypeC] = useState(null);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [data, setData] = useState({
            labels: ["7h", "8h", "9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h"],
            datasets: [
              {
                data: [0, null, null, null, null, null, null, null, null, null, null, null],
                color: (opacity = 1) => `rgba(3, 40, 252, ${opacity})`,
                strokeWidth: 2
              },
              {
                data: [0, null, null, null, null, null, null, null, null, null, null, null],
                color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
                strokeWidth: 2
              },
              {
                data: [0, null, null, null, null, null, null, null, null, null, null, null],
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                strokeWidth: 2
              }
            ],
            legend: ["Max", "Min", "Avg"]
    })

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setTypeC(null);
    }

    const convert = (curDate) => {
        return String(curDate.getFullYear()) + '-' + String(curDate.getMonth() + 1).padStart(2, '0') + '-' + String(curDate.getDate()).padStart(2, '0') + ' 00:00:00';
    }

    return (
        <View style={[styles.screen, dashboardStyles.screen]}>
            <Text variant="h3" style={styles.title}>Dashboard</Text>
            <Text style={{fontWeight:'bold', fontSize: 20}}>{'Choosen date:' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()}</Text>
            <View style = {{margin: 20}}>
                <Button title='Choose Date' onPress={() => {
                    setShow(true);
                    setTypeC(null);
                }}></Button>
                {show && (
                    <DateTimePicker
                    testID="DateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )}
            </View>
            <View style={dashboardStyles.selectionRow}>
                <Pressable 
                    onPress={() => {
                        setType('temp');  
                        setTypeC(null);                      
                    }}
                    style={[dashboardStyles.selection, type === "temp" && dashboardStyles.selectionSelected]}
                >
                    <Text style={[dashboardStyles.selectionText, type === "temp" && dashboardStyles.selectionTextSelected]}>
                        Temperature
                    </Text>

                </Pressable>
                <Pressable 
                    onPress={() => {
                        setType('humd');
                        setTypeC(null);  
                    }}
                    style={[dashboardStyles.selection, type === "humd" && dashboardStyles.selectionSelected]}
                >
                    <Text style={[dashboardStyles.selectionText, type === "humd" && dashboardStyles.selectionTextSelected]}>
                        Humidity
                    </Text>
                </Pressable>
            </View>
            <Button title="Find" onPress={async () => {
                var ref = type === "temp" ? tempRef : humdRef
                var start = convert(date);
                var end = convert(new Date(date.getTime() + (24 * 60 * 60 * 1000)));
                const q = query(ref, where("timestamp", ">=", start), where("timestamp", "<=", end));
                const querySnapshot = await getDocs(q);
                var dtMax = [0, null, null, null, null, null, null, null, null, null, null];
                var dtMin = [0, null, null, null, null, null, null, null, null, null, null];
                var count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                var dt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                var res = [];
                querySnapshot.forEach((doc) => {
                    const value = parseFloat(doc.data()["value"]);
                    const idx = parseInt(doc.data()["timestamp"].slice(11, 14));
                    if (idx <= 17 && idx >= 7){
                        if (dtMax[idx - 7] === null) dtMax[idx - 7] = value;
                        if (dtMax[idx - 7] < value) dtMax[idx - 7] = value;
                        if (dtMin[idx - 7] === null) dtMin[idx - 7] = value;
                        if (dtMin[idx - 7] > value) dtMin[idx - 7] = value;
                        if (dtMin[idx - 7] === 0) dtMin[idx - 7] = value;
                        count[idx - 7]++;
                        dt[idx - 7] += value;
                    }
                });
                for (let i = 0; i < dt.length; i++) {
                    const quotient = dt[i] / count[i];
                    res.push(quotient);
                }
                setData(pre => {
                    pre.datasets[0].data = dtMax;
                    pre.datasets[1].data = dtMin;
                    pre.datasets[2].data = res;
                    return pre;
                })
                setTypeC(true);
            }}/>
            
            {typeC !== null ? (
            <LineChart
                data={data}
                width={Dimensions.get("window").width - 50}
                height={220}
                chartConfig={chartConfig}
                style={dashboardStyles.chart}
            />
            ) : null}

            
        </View>
    );
}

export default DashboardScreen;