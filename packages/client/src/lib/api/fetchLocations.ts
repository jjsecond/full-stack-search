import { API_ENDPOINTS_V1 } from '../constants/apiEndpoints';
import { initialLocationsState } from '../constants/initialStates';
import { API_URL } from '../functions/getApiUrl';

export const fetchLocations = async (value: string) => {
  try {
    const response = await fetch(
      `${API_URL}${API_ENDPOINTS_V1.HOTELS_COUNTRIES_CITIES}/${value}`,
    );

    // TODO: considering adding an error message here for user
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data hotels, countries and cities: ', error);
    return initialLocationsState;
  }
};
