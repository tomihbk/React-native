import React from "react";
import DefaultInput from "../UI/DefaultInput/DefaultInput";

const placeInput = props => (
  <DefaultInput
    value={props.placeName}
    onChangeText={props.onChangeText}
    placeholder="Place Name"
  />
);

export default placeInput;
