import { Navigation } from "react-native-navigation";
import AuthScreen from "./src/screens/Auth/Auth";
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
import FindPlaceScreen from "./src/screens/FindPlace/maps";
import PlaceDetailScreen from "./src/screens/PlaceDetail/placeDetail";
import { Provider } from "react-redux";
import configStore from "./src/store/configStore";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
const store = configStore();
//Register screens
Navigation.registerComponentWithRedux(
  "awesome-places.AuthScreen",
  () => AuthScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "awesome-places.SharePlaceScreen",
  () => SharePlaceScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "awesome-places.FindPlaceScreen",
  () => FindPlaceScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "awesome-places.PlaceDetailScreen",
  () => PlaceDetailScreen,
  Provider,
  store
);
Navigation.registerComponentWithRedux(
  "awesome-places.SideDrawer",
  () => SideDrawer,
  Provider,
  store
);
Navigation.events().registerAppLaunchedListener(() => {
  //Start an App
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "awesome-places.AuthScreen"
            }
          }
        ],
        options: {
          topBar: {
            visible: false,
            drawBehind: true,
            animate: false,
            title: {
              text: "Login"
            }
          }
        }
      }
    }
  });
});
