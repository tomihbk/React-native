import React, { Component } from "react";
import { View, Image, Button, StyleSheet } from "react-native";

class PickImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeHolder}>
          <Image
            source={{
              uri: "https://images6.alphacoders.com/102/thumb-1920-1020177.jpg"
            }}
            style={styles.previewImage}
          />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={() => alert("Pick Image")} />
        </View>
      </View>
    );
  }
}
export default PickImage;

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
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});
