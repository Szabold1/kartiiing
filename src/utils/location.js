// Open google maps in a new tab, searching 'location' which is a string
function openGoogleMaps(location) {
  const baseUrl = "https://www.google.com/maps/search/";
  const url = `${baseUrl}${encodeURIComponent(location)}`;
  window.open(url, "_blank");
}

// Haversine formula to calculate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

// Get location name from latitude and longitude
async function getLocationName(lat, lon) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const response = await fetch(url);
    const data = await response.json();
    return (
      data.address.city ||
      data.address.town ||
      data.address.village ||
      data.address.county
    );
  } catch (e) {
    console.error("Error getting location name:", e);
  }
}

export { openGoogleMaps, calculateDistance, getLocationName };
