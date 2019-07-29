import React, { Component } from "react";
import { Platform } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

class SideDrawer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Setting</Text>
        <TouchableOpacity style={styles.logoutButton}>
          <View style={styles.drawerItem}>
            <Icon
              style={styles.Icon}
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              size={30}
              color="red"
            />
            <Text>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 16,
    backgroundColor: "white",
    flex: 1
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center"
  },
  logoutButton: {
    backgroundColor: "#ffeceb",
    padding: 10,
    paddingLeft: 16,
    paddingRight: 22,
    marginTop: 30,
    borderRadius: 30,
    width: "40%"
  },
  Icon: {
    marginRight: 16
  }
});
export default SideDrawer;
