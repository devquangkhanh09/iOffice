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
import { AIO_KEY } from "@env";
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
              }
            ],
            legend: ["Temperature"]
    })

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setTypeC(null);
    }

    const convert = (curDate) => {
        return String(curDate.getFullYear()) + '-' + String(curDate.getMonth() + 1).padStart(2, '0') + '-' + String(curDate.getDate()).padStart(2, '0') + 'T00:00Z';
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
            <Button title="Find" onPress={() => {
                var start = convert(date);
                var end = convert(new Date(date.getTime() + (24 * 60 * 60 * 1000)));
                fetch(`${baseUrl}/${prefixData}${type}/data?start_time=${start}&end_time=${end}&limit=1000`, {
                    method: "GET",
                    headers: {
                        "X-AIO-Key": AIO_KEY
                    }
                }).then((res) => res.json()).then((res) => {
                    var dtMax = [0, null, null, null, null, null, null, null, null, null, null];
                    var dtMin = [0, null, null, null, null, null, null, null, null, null, null];
                    res.forEach((record) => {
                        const value = parseFloat(record["value"]);
                        var curDate = new Date(record["created_at"]);
                        var idx = curDate.getHours();
                        if (idx <= 17 && idx >= 7){
                            if (dtMax[idx - 7] === null) dtMax[idx - 7] = value;
                            if (dtMax[idx - 7] < value) dtMax[idx - 7] = value;
                            if (dtMin[idx - 7] === null) dtMin[idx - 7] = value;
                            if (dtMin[idx - 7] > value) dtMin[idx - 7] = value;
                            if (dtMin[idx - 7] === 0) dtMin[idx - 7] = value;
                        }
                    });
                    setData(pre => {
                        pre.datasets[0].data = dtMax;
                        pre.datasets[1].data = dtMin;
                        pre.legend = (type === 'temp') ? ['Temperature'] : ['Humidity'];
                        // console.log(pre.datasets);
                        return pre;
                    })
                    console.log(data.datasets);
                    setTypeC(true);
                }).catch((e) => console.log(e));
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