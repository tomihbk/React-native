import { Navigation } from "react-native-navigation";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const startTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === "android" ? "md-map" : "ios-map", 30),
    Icon.getImageSource(
      Platform.OS === "android" ? "md-share-alt" : "ios-share-alt",
      30
    ),
    Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-menu", 30)
  ]).then(sources => {
    Navigation.setRoot({
      root: {
        sideMenu: {
          left: {
            component: {
              name: "awesome-places.SideDrawer"
            }
          },
          center: {
            bottomTabs: {
              children: [
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: "awesome-places.FindPlaceScreen",
                          passProps: {
                            text: "This is tab 1"
                          }
                        }
                      }
                    ],
                    options: {
                      bottomTab: {
                        text: "Find Place",
                        icon: sources[0],
                        iconColor: "gray",
                        selectedIconColor: "green"
                      },
                      statusBar: {
                        style: "light",
                        backgroundColor: "blue",
                        drawBehind: false,
                        visible: true
                      },
                      topBar: {
                        elevation: 0, //to remove header elevated shadow
                        title: {
                          text: "Find Place"
                        },
                        leftButtons: [
                          {
                            id: "sideDrawerToggle",
                            icon: sources[2],
                            color: "green"
                          }
                        ]
                      }
                    }
                  }
                },
                {
                  stack: {
                    children: [
                      {
                        component: {
                          name: "awesome-places.SharePlaceScreen",
                          passProps: {
                            text: "This is tab 1",
                            label: "Hey"
                          }
                        }
                      }
                    ],
                    options: {
                      bottomTab: {
                        text: "Share",
                        icon: sources[1],
                        iconColor: "gray",
                        selectedIconColor: "green"
                      },
                      topBar: {
                        elevation: 0,
                        title: {
                          text: "Share"
                        },
                        leftButtons: [
                          {
                            id: "sideDrawerToggle",
                            icon: sources[2],
                            color: "green"
                          }
                        ]
                      }
                    }
                  }
                }
              ]
            }
          }
        }
      }
    });
  });
};

export default startTabs;
