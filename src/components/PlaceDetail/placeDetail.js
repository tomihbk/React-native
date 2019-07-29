import React from "react";
import {
  Modal,
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

const placeDetail = props => {
  let modalContent = null;

  if (props.selectedPlace) {
    modalContent = (
      <View>
        <Image
          source={props.selectedPlace.image}
          resizeMode="contain"
          style={styles.placeImage}
        />
        <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
      </View>
    );
  }
  return (
    <Modal
      onRequestClose={props.onModalClosed} //when you physically click back on phone
      visible={props.selectedPlace !== null}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        {modalContent}
        <View>
          <TouchableOpacity
            onPress={props.onItemDeleted}
            style={styles.deletebtn}
          >
            <Icon size={30} name="ios-trash" color="red" />
          </TouchableOpacity>
          <Button title="Close" onPress={props.onModalClosed} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 25
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontSize: 34,
    textAlign: "center",
    fontWeight: "bold",
    color: "black"
  },
  deletebtn: {
    alignItems: "center"
  }
});
export default placeDetail;
