import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

/**
 * refs: https://www.npmjs.com/package/@react-google-maps/api
 *       https://www.youtube.com/watch?v=9e-5QHpadi0
 */

const Maps = (props) => {

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

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) =>{
    map.setZoom(11);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);
  
  // If loaded render the map, if not then don't
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/**
       * For each coordinate in props.coordinates, render a Marker at that coordinate
       */}
      {props.coordinates.map((coordinate) => <Marker position={coordinate} />)};
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(Maps);
