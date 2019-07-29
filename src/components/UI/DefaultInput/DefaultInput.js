import React from "react";
import { TextInput, StyleSheet } from "react-native";

const defaultInput = props => (
  <TextInput
    {...props} //this means i can use any default props
    style={[
      styles.input,
      props.style,
      !props.valid && props.touched ? styles.invalid : null
    ]}
    underlineColorAndroid="transparent"
  />
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ebf2ff",
    borderRadius: 30,
    padding: 10,
    paddingLeft: 16,
    width: "100%",
    borderColor: "#91bbff",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10
  },
  invalid: {
    backgroundColor: "#f9c0c0",
    borderColor: "red"
  }
});
export default defaultInput;
