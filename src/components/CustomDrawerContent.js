import {
  Avatar,
  Icon,
  Text,
  Button,
} from "@react-native-material/core";
import { View } from "react-native";
import { useState, useEffect } from "react";
import { getData } from "../services/asyncStorage";
import drawerStyles from "../styles/Drawer.styles";

const CustomDrawerContent = ({onSignOut}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getData("user").then((user) => setUser(user));
  }, []);

  return (
    <View style={drawerStyles.screen}>
      <Avatar icon={props => <Icon name="account" {...props} />} />
      <Text style={drawerStyles.userText}>{user?.email}</Text>
      <Button
        title="Sign Out"
        leading={props => <Icon name="logout" {...props} />}
        onPress={onSignOut}
      />
    </View>
  );
}

export default CustomDrawerContent;