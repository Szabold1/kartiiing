// Open google maps in a new tab, searching 'location' which is a string
function openGoogleMaps(location) {
  const baseUrl = "https://www.google.com/maps/search/";
  const url = `${baseUrl}${encodeURIComponent(location)}`;
  window.open(url, "_blank");
}

export { openGoogleMaps };
