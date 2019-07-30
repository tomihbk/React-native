import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Button,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { addPlace } from "../../store/actions/index";
import { Navigation } from "react-native-navigation";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocation/PickLocation";
import validate from "../../utility/validation";

class SharePlaceScreen extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.state = {
      controls: {
        placeName: {
          value: "",
          valid: false,
          touched: false,
          validationRules: {
            notEmpty: true
          }
        },
        location: {
          value: null,
          valid: false
        },
        image: {
          value: null,
          valid: false
        }
      }
    };
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "sideDrawerToggle") {
      Navigation.mergeOptions(this.props.componentId, {
        //This will trigger the sidemenu visibility
        sideMenu: {
          left: {
            visible: true
          }
        }
      });
    }
  }

  placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            valid: validate(val, prevState.controls.placeName.validationRules),
            touched: true
          }
        }
      };
    });
  };

  locationPickedHandler = location => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          location: {
            value: location,
            valid: true
          }
        }
      };
    });
  };

  imagePickedHandler = image => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          image: {
            value: image,
            valid: true
          }
        }
      };
    });
  };

  placeAddedHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value
    );
  };
  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <HeadingText>Share a Place with us!</HeadingText>
          <PickImage onImagePicked={this.imagePickedHandler} />
          <PickLocation onLocationPick={this.locationPickedHandler} />
          <PlaceInput
            placeName={this.state.controls.placeName.value}
            onChangeText={this.placeNameChangedHandler}
          />
          <Button
            title="Share the Place"
            disabled={
              !this.state.controls.placeName.valid ||
              !this.state.controls.location.valid ||
              !this.state.controls.image.valid
            }
            onPress={this.placeAddedHandler}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName, location, image) =>
      dispatch(addPlace(placeName, location, image))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SharePlaceScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  }
});
