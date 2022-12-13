/**
 * TODO:
 * -Modify dataset to accomodate for clickable markers: each coordinate needs to be associated to a certain location ID
 */

import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

/**
 * refs: https://www.npmjs.com/package/@react-google-maps/api
 *       https://www.youtube.com/watch?v=9e-5QHpadi0
 */

const Maps = (props) => {

  const filterData = () => {
    // abstract, used for filtering the location coordinates
  }

  // Set height and width accordingly
  const containerStyle = {
    width: props.mapWidth,
    height: props.mapHeight,
    featureType: "poi",
    elementType: "labels",

    stylers: [{ visibility: "off" }],
  };

  const center = {
    //to see the whole HK map
    lat: 22.3453,
    lng: 114.1372,
  };

  // Set whether the map API has loaded or not
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD0bhHj99UCaw3koa6z2St9AwIJYfn7xHo",
  });

  if (!isLoaded) {
    return(
      <div>Loading the map</div>
    );
  } else {
    return(
      <div>
        <GoogleMap
          zoom={11}
          center={center}
          mapContainerStyle={containerStyle}
        >
          {props.coordinates.map((coordinate, index) => <Marker key={index} position={coordinate} />)}
        </GoogleMap>
      </div>
    );
  }
};

export default React.memo(Maps);
