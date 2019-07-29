import React, { Component } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { deletePlace } from "../../store/actions/index";
import Icon from "react-native-vector-icons/Ionicons";
import { Navigation } from "react-native-navigation";
import { Platform } from "react-native";

class PlaceDetail extends Component {
  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    Navigation.pop(this.props.componentId);
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={this.props.selectedPlace.image}
            resizeMode="contain"
            style={styles.placeImage}
          />
          <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={this.placeDeletedHandler}
            style={styles.deletebtn}
          >
            <Icon
              size={30}
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              color="red"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  //this is where we get our states from redux store
  return {
    onDeletePlace: key => dispatch(deletePlace(key))
  };
};

const styles = StyleSheet.create({
  container: {
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
export default connect(
  null,
  mapDispatchToProps
)(PlaceDetail);
