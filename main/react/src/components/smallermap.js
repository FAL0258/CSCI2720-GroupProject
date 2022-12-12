import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const locData = [{lat:22.501639,lng:114.128911 },{lat:22.391810,lng:113.976771},{lat:22.35665,lng:114.12623},{lat:22.44152,lng:114.02289 }];

const containerStyle = {
    width: '500px',
    height: '500px',
};
  
const center = { //to see the whole HK map
    lat: 22.3453,
    lng: 114.1372
};

const SmallerMaps = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD0bhHj99UCaw3koa6z2St9AwIJYfn7xHo"
    });

    const [map, setMap] = useState(null);

    const onLoad = React.useCallback((map) => {
        map.setZoom(11);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback((map) => {
        setMap(null);
    }, []);


    const addMarker = (item) => {
        let marker = new window.google.maps.Marker({
            position: item,
            map: map
        });

        locData.map(addMarker);

        return isLoaded ? (
        
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
            </GoogleMap>
        
        ) : <></>
    }
}

export default React.memo(SmallerMaps);