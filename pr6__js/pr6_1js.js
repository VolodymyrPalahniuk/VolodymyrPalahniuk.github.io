document.addEventListener('DOMContentLoaded', getMyLocation);

let watchId = null;
let map;
let userMarker;
let destinationMarker;
const ourCoords = { latitude: 48.94321, longitude: 24.73380 };

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initializeMap);
        document.getElementById("watch").onclick = watchLocation;
        document.getElementById("clearWatch").onclick = clearWatch;
        document.getElementById("scrollToDestination").onclick = scrollToDestination;
    } else {
        alert("Oops, no geolocation support");
    }
}

function initializeMap(position) {
    const { latitude, longitude } = position.coords;

    map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    userMarker = L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(`You are here: ${latitude}, ${longitude}`)
        .openPopup();

    displayLocation(position);
}

function watchLocation() {
    watchId = navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;

        if (userMarker) {
            map.removeLayer(userMarker);
        }
        userMarker = L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(`You are here: ${latitude}, ${longitude} (updated)`);

        L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(`Updated location: ${latitude}, ${longitude} at ${new Date().toLocaleTimeString()}`);

        displayLocation(position);
    }, displayError);
}

function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

function displayLocation(position) {
    const { latitude, longitude } = position.coords;
    document.getElementById("location").innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`;
    document.getElementById("distance").innerHTML = `You are ${computeDistance(position.coords, ourCoords).toFixed(2)} km from the College`;
}

function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    const errorMessage = errorTypes[error.code] || "Unknown error";
    document.getElementById("location").innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords) {
    const startLatRads = degreesToRadians(startCoords.latitude);
    const startLongRads = degreesToRadians(startCoords.longitude);
    const destLatRads = degreesToRadians(destCoords.latitude);
    const destLongRads = degreesToRadians(destCoords.longitude);
    const Radius = 6371; 
    
    return Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)) * Radius;
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function scrollToDestination() {
    const input = document.getElementById("destCoords").value;
    const [lat, lon] = input.split(',').map(Number);

    if (!isNaN(lat) && !isNaN(lon)) {
        if (destinationMarker) {
            map.removeLayer(destinationMarker);
        }
        destinationMarker = L.marker([lat, lon])
            .addTo(map)
            .bindPopup(`Destination: ${lat}, ${lon}`)
            .openPopup();

        map.setView([lat, lon], 13);
    } else {
        alert("Please enter valid coordinates (format: lat,lon)");
    }
}
