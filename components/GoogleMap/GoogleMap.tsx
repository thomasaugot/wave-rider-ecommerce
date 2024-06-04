"use Client";

import React, { useMemo } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import "./GoogleMap.scss";

export const GoogleMapComponent: React.FC = ({}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  });
  const center = useMemo(
    () => ({ lat: 28.72832679748535, lng: -13.863363265991211 }),
    []
  );

  return (
    <>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={15}
        >
          <Marker
            position={{ lat: 28.72832679748535, lng: -13.863363265991211 }}
          />
        </GoogleMap>
      )}
    </>
  );
};
