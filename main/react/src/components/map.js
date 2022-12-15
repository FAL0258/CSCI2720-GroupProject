/**
 * refs: https://react-leaflet.js.org/docs/example-popup-marker/
 */

/**
 * TODO:
 * -Modify dataset to accomodate for clickable markers: each coordinate needs to be associated to a certain location ID
 */

import React from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Maps = (props) => {
  let zoom;
  if (props.zoom === undefined) {
    zoom = 11;
  } else {
    zoom = props.zoom;
  }
  let center;

  if (props.center === undefined) {
    center = {
      //to see the whole HK map
      lat: 22.3453,
      lng: 114.1372,
    };
  } else {
    center = props.center;
  }

  const leafletStyle = {
    width: props.mapWidth,
    height: props.mapHeight
  };

  const addMarker = (coordinate, index) => {
    // Text in popup will be link to corresponding /locationpage/:locID, index needs to be changed to locationID once backend is connected
    const locationId = props.locationIds[index].locationId;
    const url = "/locationpage/" + locationId;
    return (
      <Marker key={locationId} position={coordinate}>
        <Popup>
          <Link to={url}>View details</Link>
        </Popup>
      </Marker>
    );
  };

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} style={leafletStyle}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/** Create marker for each location */}
      {props.coordinates.map((coordinate, index) => addMarker(coordinate, index))}
    </MapContainer>
  );
}

export default React.memo(Maps);
