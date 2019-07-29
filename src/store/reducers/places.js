import { ADD_PLACE, DELETE_PLACE } from "../actions/actionTypes";
const initialState = {
  places: [],
  selectedPlace: null
};
//In redux we don't maniplate directly the state, but we replace it
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random(),
          name: action.placeName,
          image: {
            uri: "https://images4.alphacoders.com/101/thumb-1920-1011715.jpg"
          }
        })
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.placeKey;
        }),
        selectedPlace: null
      };
    default:
      return state;
  }
};

export default reducer;
