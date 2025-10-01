export default async function getFullLocationDetails() {
  if (!navigator.geolocation) {
    throw new Error("Geolocation is not supported by this browser.");
  }

  // Step 1: Get latitude & longitude
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  });

  const { latitude, longitude } = position.coords;

  // Step 2: Use free reverse geocoding API (OpenStreetMap / Nominatim)
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch location details from API.");
  }

  const data = await response.json();

  // Step 3: Return a clean object
  return {
    latitude,
    longitude,
    address: data.address || {},
    displayName: data.display_name || "",
  };
}