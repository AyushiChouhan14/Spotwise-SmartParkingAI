import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import AxiosInstance from "../AxiosInstance";
import UserNavbar from "./UserNavbar";
import "../User/ViewMaps.css";

const ViewMap = () => {
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const [parkingPlaces, setParkingPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const [placeName, setPlaceName] = useState("");
  const [mapCenter, setMapCenter] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCUA3uUquQ88On7YaIFbBpByARvNj64GAU",
  });

  const fetchParkingPlaces = async () => {
    try {
      const response = await AxiosInstance.get("/parking");
      console.log("Parking places fetched: ", response.data);
      if (response.data.success) {
        setParkingPlaces(response.data.parkingPlace);
        setFilteredPlaces(response.data.parkingPlace);
        setError(null);
      } else {
        setError("Failed to load parking places.");
      }
    } catch (err) {
      console.error("Error fetching parking places:", err);
      setError("An error occurred while fetching parking places.");
    } finally {
      setLoadingPlaces(false);
    }
  };

  const fetchParkingPlacesByArea = async () => {
    setLoadingPlaces(true);
    const foundPlaces = parkingPlaces.filter((place) =>
      place.placeName.toLowerCase().includes(placeName.toLowerCase())
    );
    if (foundPlaces.length > 0) {
      setFilteredPlaces(foundPlaces);
      setError(null);

      const firstPlace = foundPlaces[0];
      setMapCenter({
        lat: parseFloat(firstPlace.latitude),
        lng: parseFloat(firstPlace.longitude),
      });

      if (mapInstance) {
        mapInstance.setCenter({
          lat: parseFloat(firstPlace.latitude),
          lng: parseFloat(firstPlace.longitude),
        });
        placeMarkers(mapInstance);
      }
    } else {
      setFilteredPlaces([]);
      setError("No parking places found for this search.");
    }
    setLoadingPlaces(false);
  };

  useEffect(() => {
    fetchParkingPlaces();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLoc);
          setMapCenter(userLoc);
          setLoadingLocation(false);
        },
        (error) => {
          setError("Unable to retrieve location.");
          setLoadingLocation(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoadingLocation(false);
    }
  }, []);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const onMapLoad = (map) => {
    setMapInstance(map);
    if (userLocation) {
      new window.google.maps.Marker({
        position: userLocation,
        map: map,
        title: "Your Location",
      });
    }

    placeMarkers(map);
  };

  const placeMarkers = (map) => {
    filteredPlaces.forEach((place) => {
      const lat = parseFloat(place.latitude);
      const lng = parseFloat(place.longitude);

      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "blue",
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: "white",
        },
        title: place.placeName || "Parking Place",
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="font-size: 14px;">
      <h4>${place.placeName || "Parking Place"}</h4>
      <img src="${
        place.image
          ? `http://localhost:8080/images/${place.image}`
          : "placeholder.jpg"
      }" alt="${place.placeName}" style="width:100px;height:auto;"/>
      <p>${place.description || "No description available"}</p>
      <p><strong>Area:</strong> ${place.areaName || "Unknown"}</p>
      <button onclick="navigateToBooking(${
        place.lender.id
      })" style="margin-top: 10px; padding: 6px 12px; background-color: blue; color: white; border: none; border-radius: 4px; cursor: pointer;">Book This Place</button>
    </div>
        `,
      });

      window.navigateToBooking = (lenderId) => {
        window.location.href = `/book-parking/${lenderId}`;
      };

      marker.addListener("click", () => {
        infoWindow.open({
          anchor: marker,
          map: map,
          shouldFocus: false,
        });
      });
    });
  };

  const handleSearch = () => {
    fetchParkingPlacesByArea();
  };

  return (
    <div>
      <UserNavbar />
      <section className="py-12">
        <div className="container mx-auto">
          <input
            type="text"
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
            placeholder="Enter place name"
            className="border p-2"
          />
          <button
            onClick={handleSearch}
            className="ml-2 border p-2 bg-blue-500 text-white"
          >
            Search
          </button>
          {loadingLocation || loadingPlaces ? (
            <div>Loading map...</div>
          ) : error ? (
            <div>{error}</div>
          ) : userLocation && isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter || userLocation}
              zoom={12}
              onLoad={onMapLoad}
            />
          ) : (
            <div>Unable to retrieve location</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ViewMap;
