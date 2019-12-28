/* global google */
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  withGoogleMap,
  DirectionsRenderer
} from "react-google-maps";

export default function Map({
  startCoordinates,
  destinationCoordinates,
  handleUpdateDistance
}) {
  const [directions, setDirections] = useState(null);

  function MapConfigs() {
    return (
      <GoogleMap
        defaultZoom={5}
        defaultCenter={{ lat: -23.423731, lng: -51.8866 }}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    );
  }

  const WrappedMap = withGoogleMap(MapConfigs);

  useEffect(() => {
    if (presentCoordinates()) {
      handleDirectionsUpdate();
    }
  }, [startCoordinates, destinationCoordinates]);

  function presentCoordinates() {
    if (
      startCoordinates.lat &&
      startCoordinates.lng &&
      destinationCoordinates.lat &&
      destinationCoordinates.lng
    ) {
      return true;
    } else {
      return false;
    }
  }

  function handleDirectionsUpdate() {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: new google.maps.LatLng(
          startCoordinates.lat,
          startCoordinates.lng
        ),
        destination: new google.maps.LatLng(
          destinationCoordinates.lat,
          destinationCoordinates.lng
        ),
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
          handleUpdateDistance(
            (result.routes[0].legs[0].distance.value / 1000).toFixed(2)
          );
        } else {
          alert("Something wrong hapenned!");
        }
      }
    );
  }

  return (
    <div style={{ height: `800px` }}>
      <WrappedMap
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
