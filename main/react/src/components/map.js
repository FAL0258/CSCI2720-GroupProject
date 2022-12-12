import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

/**
 * refs: https://www.npmjs.com/package/@react-google-maps/api
 *       https://www.youtube.com/watch?v=9e-5QHpadi0
 */

const locdata = [
  { lat: 22.501639, lng: 114.128911 },
  { lat: 22.39181, lng: 113.976771 },
  { lat: 22.35665, lng: 114.12623 },
  { lat: 22.44152, lng: 114.02289 },
];

const Maps = (props) => {
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
  

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {locdata.map((coordinates) => <Marker position={coordinates} />)};
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(Maps);
