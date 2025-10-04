import { getData } from "./useGetData";
import { getGeoLocation } from "./useGetGeoLocation";
import { getOS } from "./useGetOs";

export async function getLocationInfo() {
  let geo = { latitude: null, longitude: null };
  let data = {
    countryName: null,
    countryCode: null,
    continent: null,
    locality: null,
    city: null,
  };
  const OS = getOS();

  try {
    geo = await getGeoLocation();
  } catch (err) {
    console.log(`User denied location, continuing with null values ${err}`);
  }

  if (geo.latitude && geo.longitude) {
    try {
      data = await getData(geo.latitude, geo.longitude);
    } catch (err) {
      console.log(`Geo Data fetch failed, continuing with nulls ${err}`);
    }
  }

  // final loc object
  return {
    languages: navigator.languages,
    country: data.countryName || null,
    countryCode: data.countryCode || null,
    continent: data.continent || null,
    locality: data.locality || null,
    city: data.city || null,
    latitude: geo.latitude || null,
    longitude: geo.longitude || null,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    browser: navigator.userAgent,
    os: OS,
    deviceType: /Mobi|Android/i.test(navigator.userAgent)
      ? "Mobile"
      : "Desktop",
  };
}
