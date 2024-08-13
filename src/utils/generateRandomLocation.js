function generateRandomLocation() {
  const latitude = (Math.random() * 180 - 90).toFixed(6); // Latitude ranges from -90 to 90
  const longitude = (Math.random() * 360 - 180).toFixed(6); // Longitude ranges from -180 to 180

  return {
    longitude: longitude,
    latitude: latitude,
  };
}

module.exports = generateRandomLocation;
