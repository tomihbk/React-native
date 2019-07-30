import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { deletePlace } from "../../store/actions/index";
import Icon from "react-native-vector-icons/Ionicons";
import { Navigation } from "react-native-navigation";
import { Platform } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

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
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              initialRegion={{
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta:
                  (Dimensions.get("window").width /
                    Dimensions.get("window").height) *
                  0.0122
              }}
              ref={ref => (this.map = ref)}
            >
              <MapView.Marker coordinate={this.props.selectedPlace.location} />
            </MapView>
          </View>
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
  },
  mapContainer: {
    width: "100%",
    height: 300
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
export default connect(
  null,
  mapDispatchToProps
)(PlaceDetail);
