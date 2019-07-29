import React, { Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

class PickLocation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeHolder}>
          <Text>Maps</Text>
        </View>
        <View style={styles.button}>
          <Button title="Locate Me" onPress={() => alert("Locate me!")} />
        </View>
      </View>
    );
  }
}
export default PickLocation;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  placeHolder: {
    backgroundColor: "#eee",
    borderColor: "black",
    borderWidth: 1,
    width: "80%",
    height: 200
  },
  button: {
    margin: 8
  }
});
