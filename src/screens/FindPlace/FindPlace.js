import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from "react-native";
import { connect } from "react-redux";
import PlaceList from "../../components/PlaceList/PlaceList";
import { Navigation } from "react-native-navigation";

class FindPlaceScreen extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }
  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    slidePlaces: new Animated.Value(500)
  };

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "sideDrawerToggle") {
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: true
          }
        }
      });
    }
  }

  placesSearchHanlder = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();

    this.setState({
      placesLoaded: true
    });

    Animated.timing(this.state.slidePlaces, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  itemSelectedHandler = key => {
    const selPlace = this.props.places.find(place => {
      return place.key === key;
    });

    Navigation.push(this.props.componentId, {
      component: {
        name: "awesome-places.PlaceDetailScreen",
        passProps: {
          text: "Pushed screen",
          name: "awesome-places.PlaceDetailScreen",
          selectedPlace: selPlace
        },
        options: {
          topBar: {
            title: {
              text: selPlace.name
            }
          }
        }
      }
    });
  };
  render() {
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity
          onPress={this.placesSearchHanlder}
          style={styles.searchButton}
        >
          <View>
            <Text style={styles.searchText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if (this.state.placesLoaded) {
      content = (
        <Animated.View
          style={{
            transform: [
              {
                translateY: this.state.slidePlaces
              }
            ]
          }}
        >
          <PlaceList
            places={this.props.places}
            onItemSelected={this.itemSelectedHandler}
          />
        </Animated.View>
      );
    }
    return (
      <View style={this.state.placesLoaded ? null : styles.searchButtonWrapper}>
        {content}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    places: state.places.places
  };
};
export default connect(mapStateToProps)(FindPlaceScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  searchButtonWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  searchButton: {
    padding: 16,
    borderRadius: 50,
    backgroundColor: "#e8e9ff"
  },
  searchText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "blue"
  }
});
