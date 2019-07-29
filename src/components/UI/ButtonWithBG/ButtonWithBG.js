import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  StyleSheet,
  Platform
} from "react-native";

const buttonwithbg = props => {
  const content = (
    <View
      style={[
        styles.button,
        { backgroundColor: props.color },
        props.disabled ? styles.disabled : null
      ]}
    >
      <Text
        style={[
          props.disabled ? styles.disabledText : null,
          {
            color: props.TextColor,
            fontWeight: "bold",
            textTransform: "uppercase"
          }
        ]}
      >
        {props.children}
      </Text>
    </View>
  );

  if (props.disabled) {
    return content;
  }
  if (Platform.OS === "android") {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableOpacity onPress={props.onPress} {...props}>
        {content}
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    margin: 5,
    borderRadius: 30
  },
  disabled: {
    backgroundColor: "#eee"
  },
  disabledText: {
    color: "gray"
  }
});

export default buttonwithbg;
