// src/pages/FirstTimeUser.js
import  MapWithPins from '../components/Map';

function MapPage() {

    const [restaurantData, setRestaurantData] = useState([]);
    const [organizationData, setOrganizationData] = useState([]);
    const [coordinates, setCoordinates] = useState([]);

    // Fetch data from backend endpoint
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('YOUR_BACKEND_ENDPOINT'); // Replace with your backend endpoint
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
    <div >
        <MapWithPins
            blueCoords={[
                { coord: [37.7749, -122.4194], name: "Location 1", address: "San Francisco, CA" },
                { coord: [40.7128, -74.0060], name: "Location 2", address: "New York, NY" }
            ]}
            redCoords={[
                { coord: [34.0522, -118.2437], name: "Location 3", address: "Los Angeles, CA" },
                { coord: [41.8781, -87.6298], name: "Location 4", address: "Chicago, IL" }
            ]}
        />

    </div>
    );
}

export default MapPage;

