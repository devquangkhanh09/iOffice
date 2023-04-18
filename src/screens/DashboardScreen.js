import {
    View,
    Pressable,
    Button,
    Platform,
    FlatList
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
import { useEffect } from "react";
import { AIO_KEY, USER_NAME, TEMP_FEED_KEY, HUMD_FEED_KEY } from "@env";
import {
    baseUrl,
} from "../services/client";

const chartConfig = {
    backgroundGradientFrom: "#606163",
    backgroundGradientFromOpacity: 0.1,
    backgroundGradientTo: "#606163",
    backgroundGradientToOpacity: 0.1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    decimalPlaces: 0,
};

const prefixData = "metacrektal/feeds/iot-data.data-"

const DashboardScreen = () => {
    const [type, setType] = useState("temp");
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Choosen date:' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
    const [dataTemp, setDataTemp] = useState(null);
    const [dataHumd, setDataHumd] = useState(null);
    const [dataMax, setDataMax] = useState([0, null, null, null, null, null, null, null, null, null, null, null]);
    const [dataMin, setDataMin] = useState([0, null, null, null, null, null, null, null, null, null, null, null]);

    var data = {
        labels: ["7h", "8h", "9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h"],
        datasets: [
          {
            data: dataMax,
            color: (opacity = 1) => `rgba(3, 40, 252, ${opacity})`,
            strokeWidth: 2
          },
          {
            data: dataMin,
            color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
            strokeWidth: 2
          }
        ],
        legend: type === 'temp' ? ["Temperature"] : ["Humidity"]
    };
    useEffect(() => {
        fetch(`${baseUrl}/${prefixData}temp/data?limit=2000`, {
            method: "GET",
            headers: {
                "X-AIO-Key": AIO_KEY
            },
        }).then((res) => res.json()).then((data) => {
            setDataTemp(data);
        }).catch((e) => console.log(e));
        fetch(`${baseUrl}/${prefixData}humd/data?limit=2000`, {
            method: "GET",
            headers: {
                "X-AIO-Key": AIO_KEY
            },
        }).then((res) => res.json()).then((data) => {
            setDataHumd(data);
        }).catch((e) => console.log(e));
        console.log("Fetch data done");
    }, []);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setText('Choosen date:' + fDate); 
        filterData(selectedDate, type);
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const filterData = (curtype, date) => {
        if (curtype === 'temp') {
            res = dataTemp;
         } else {
            res = dataHumd;
        }
        var dtMax = [0, null, null, null, null, null, null, null, null, null, null, null];
        var dtMin = [0, null, null, null, null, null, null, null, null, null, null, null];
        res.forEach((record) => {
            const curDate = new Date(record["created_at"]);
            const value = parseFloat(record["value"]);
            if (curDate.getDate() === date.getDate() && curDate.getMonth() === date.getMonth() && curDate.getFullYear() === date.getFullYear()) {
                var idx = curDate.getHours();
                if (idx <= 17 && idx >= 7){
                    if (dtMax[idx - 7] === null) dtMax[idx - 7] = value;
                    if (dtMax[idx - 7] < value) dtMax[idx - 7] = value;
                    if (dtMin[idx - 7] === null) dtMin[idx - 7] = value;
                    if (dtMin[idx - 7] > value) dtMin[idx - 7] = value;
                }
            }
        });
        setDataMax(dtMax);
        setDataMin(dtMin);
    }

    return (
        <View style={[styles.screen, dashboardStyles.screen]}>
            <Text variant="h3" style={styles.title}>Dashboard</Text>
            <Text style={{fontWeight:'bold', fontSize: 20}}>{text}</Text>
            <View style = {{margin: 20}}>
                <Button title='Choose Date' onPress={() => showMode('date')}></Button>
                {show && (
                    <DateTimePicker
                    testID="DateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )}
            </View>
            <View style={dashboardStyles.selectionRow}>
                <Pressable 
                    onPress={() => {
                        setType("temp");
                        var dtMax = [null, null, null, null, null, null, null, null, null, null, null];
                        var dtMin = [null, null, null, null, null, null, null, null, null, null, null];
                        dataTemp.forEach((record) => {
                            const curDate = new Date(record["created_at"]);
                            const value = parseFloat(record["value"]);
                            if (curDate.getDate() === date.getDate() && curDate.getMonth() === date.getMonth() && curDate.getFullYear() === date.getFullYear()) {
                                var idx = curDate.getHours();
                                if (idx <= 17 && idx >= 7){
                                    if (dtMax[idx - 7] === null) dtMax[idx - 7] = value;
                                    if (dtMax[idx - 7] < value) dtMax[idx - 7] = value;
                                    if (dtMin[idx - 7] === null) dtMin[idx - 7] = value;
                                    if (dtMin[idx - 7] > value) dtMin[idx - 7] = value;
                                }
                            }
                        });
                        setDataMax(dtMax);
                        setDataMin(dtMin);
                    }}
                    style={[dashboardStyles.selection, type === "temp" && dashboardStyles.selectionSelected]}
                >
                    <Text style={[dashboardStyles.selectionText, type === "temp" && dashboardStyles.selectionTextSelected]}>
                        Temperature
                    </Text>

                </Pressable>
                <Pressable 
                    onPress={() => {
                        setType("humd");
                        var dtMax = [null, null, null, null, null, null, null, null, null, null, null];
                        var dtMin = [null, null, null, null, null, null, null, null, null, null, null];
                        dataHumd.forEach((record) => {
                            const curDate = new Date(record["created_at"]);
                            const value = parseFloat(record["value"]);
                            if (curDate.getDate() === date.getDate() && curDate.getMonth() === date.getMonth() && curDate.getFullYear() === date.getFullYear()) {
                                var idx = curDate.getHours();
                                if (idx <= 17 && idx >= 7){
                                    if (dtMax[idx - 7] === null) dtMax[idx - 7] = value;
                                    if (dtMax[idx - 7] < value) dtMax[idx - 7] = value;
                                    if (dtMin[idx - 7] === null) dtMin[idx - 7] = value;
                                    if (dtMin[idx - 7] > value) dtMin[idx - 7] = value;
                                }
                            }
                        });
                        setDataMax(dtMax);
                        setDataMin(dtMin);
                    }}
                    style={[dashboardStyles.selection, type === "humd" && dashboardStyles.selectionSelected]}
                >
                    <Text style={[dashboardStyles.selectionText, type === "humd" && dashboardStyles.selectionTextSelected]}>
                        Humidity
                    </Text>
                </Pressable>
            </View>

            <LineChart
                data={data}
                width={Dimensions.get("window").width - 50}
                height={220}
                chartConfig={chartConfig}
                style={dashboardStyles.chart}
            />
        </View>
    );
}

export default DashboardScreen;