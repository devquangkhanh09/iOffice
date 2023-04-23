import {
    View,
    FlatList,
} from "react-native";
import {
    Text
} from "@react-native-material/core";
import {
    useState,
    useEffect
} from "react";
import {
    getFirestore,
    collection,
    query,
    orderBy,
    onSnapshot,
    limit,
} from "firebase/firestore";
import styles from "../styles/styles";
import logStyles from "../styles/LogScreen.styles";

const data = [
    {
        id: 1,
        time: "15:30, 01/04/2023",
        user: "Steve",
        device: "Fan",
        action: "on",
    },
    {
        id: 2,
        time: "17:00, 01/04/2023",
        user: "Steve",
        device: "Light bulb",
        action: "off",
    },
];

const LogScreen = () => {
    const [activities, setActivities] = useState([]);

    const db = getFirestore();
    useEffect(() => {
        const q = query(collection(db, "control"), orderBy("timestamp", "desc"), limit(20));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setActivities(querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })));
        });
    }, []);

    return (
        <View style={[styles.screen, logStyles.screen]}>
            <Text variant="h3" style={styles.title}>Activity Log</Text>
            <Text variant="subtitle1" style={{textAlign: "center"}}>
                20 most recent activities
            </Text>

            <FlatList
                data={activities}
                renderItem={({item}) => (
                    <View key={item.id} style={logStyles.activity}>
                        <View style={logStyles.activityTop}>
                            <Text style={logStyles.activityTopText}>{item.user}</Text>
                            <Text style={logStyles.activityTopText}>{item.timestamp}</Text>
                        </View>
                        <View style={logStyles.activityBottom}>
                            <Text style={logStyles.activityBottomText}>{item.device}: {
                                item.status? `turned ${item.status}`
                                : item.mode? `mode changed to ${item.mode}`
                                : item.threshold? `threshold changed to ${item.threshold}`
                                : "unknown"
                            }</Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

export default LogScreen;