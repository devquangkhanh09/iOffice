import { useState } from "react";
import { TextInput, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import {
    Text,
    Button
} from "@react-native-material/core";
import {
    getAuth,
    signInWithEmailAndPassword
} from "firebase/auth";
import styles from "../styles/styles";
import logInStyles from "../styles/LogIn.styles";

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (error) {
        alert("Email/password is incorrect! Please try again.");
    }
}

const LogInScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isHidden, setIsHidden] = useState(true);

    return (
        <View style={logInStyles.screen}>
            <Text variant="h3" style={styles.title}>Log in</Text>
            <TextInput
                label="Email"
                variant="outlined"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={logInStyles.textInput}
            />
            <TextInput
                label="Password"
                variant="outlined"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={isHidden}
                trailing={props => (
                    <IconButton icon={props => <Icon name="eye" {...props} />} {...props} onPress={() => setIsHidden(!isHidden)} />
                )}
                style={logInStyles.textInput}
            />
            <Button title="Log in" onPress={() => login(email, password)} />
        </View>
    )
}

export default LogInScreen;