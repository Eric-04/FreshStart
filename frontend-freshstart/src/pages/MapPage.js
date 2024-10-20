
import  MapWithPins from '../components/Map';
import React, { useEffect, useState } from 'react';

// Fetch data from backend endpoint
const fetchData = async (setData, selectedRole) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/${selectedRole}/get`); // Replace with your backend endpoint
        const result = await response.json();
        setData(result);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Fetch coordinates for each address
const fetchCoordinates = async (data, setCoordinates, positionStackApiKey, selectedRole) => {
    const coordsArray = [];

    for (const item of data) {
        const name = item['name'];
        const street_address = item['street_address'];
        const city = item['city'];
        const state = item['state'];

        const address = `${street_address}, ${city}, ${state}`;
        
        const response = await fetch(`http://api.positionstack.com/v1/forward?access_key=${positionStackApiKey}&query=${address}`);

        if (response.ok) {
            const geoData = await response.json();
            if (geoData.data && geoData.data.length > 0) {
                const { latitude, longitude } = geoData.data[0]; // Get the first result
                coordsArray.push({
                    coord : [latitude, longitude],
                    name : name,
                    address : address,
                });
            }
        } else {
            console.error('Error fetching coordinates:', response.statusText);
        }
    }
    setCoordinates(coordsArray);
};
       

function MapPage() {

    const [organizationData, setOrganizationData] = useState([]);
    const [restaurantData, setRestaurantData] = useState([]);
    const [organizationCoords, setOrganizationCoords] = useState([]);
    const [restaurantCoords, setRestaurantCoords] = useState([]);

    const positionStackApiKey = process.env.REACT_APP_MAPTILER_API_KEY;
    
    console.log(process.env)
    // Fetch data from backend endpoint
    useEffect(() => {
        fetchData(setOrganizationData, 'organization');
        fetchData(setRestaurantData, 'restaurant');
    }, []);

    // Fetch coordinates for each organization address
    useEffect(() => {
        if (organizationData.length > 0) {
            fetchCoordinates(organizationData, setOrganizationCoords, positionStackApiKey, 'organization');
        }
    }, [organizationData, positionStackApiKey]);

    // Fetch coordinates for each restaurant address
    useEffect(() => {
        if (restaurantData.length > 0) {
            fetchCoordinates(restaurantData, setRestaurantCoords, positionStackApiKey, 'restaurant');
        }
    }, [restaurantData, positionStackApiKey]);

    return (
        // blue coords = organizations
        // red coords = restaurants
        <div >
            <MapWithPins
                blueCoords={organizationCoords}
                redCoords={restaurantCoords}
            />

        </div>
    );
}

export default MapPage;

