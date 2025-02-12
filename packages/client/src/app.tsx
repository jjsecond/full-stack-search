import { useState, type ChangeEvent } from 'react';
import { getCodeSandboxHost } from '@codesandbox/utils';
import { CityWithId, CountryWithId, HotelWithId } from './lib/types/dbTypes';
import HotelResultsDropdown from './lib/components/hotelResultsDropdown/hotelResultsDropdown';
import CountryResultsDropdown from './lib/components/countryResultsDropdown/countryResultsDropdown';
import CityResultsDropdown from './lib/components/cityResultsDropdown/cityResultsDropdown';
import { API_ENDPOINTS_V1 } from './lib/constants/apiEndpoints';

const codeSandboxHost = getCodeSandboxHost(3001);
const API_URL = codeSandboxHost
  ? `https://${codeSandboxHost}`
  : 'http://localhost:3001';

// const fetchAndFilterHotels = async (value: string) => {
//   const hotelsData = await fetch(`${API_URL}/v1/hotels-cities-countries/${value}`);
//   const hotels = (await hotelsData.json()) as Hotel[];

//   console.log(hotels)
//   return hotels
// return hotels.hotels.filter(
//   ({ chain_name, hotel_name, city, country }) =>
//     chain_name.toLowerCase().includes(value.toLowerCase()) ||
//     hotel_name.toLowerCase().includes(value.toLowerCase()) ||
//     city.toLowerCase().includes(value.toLowerCase()) ||
//     country.toLowerCase().includes(value.toLowerCase())
// );
// };
const initialHotelsCitiesCountriesState = {
  hotels: [],
  countries: [],
  cities: [],
};

const fetchHotelsCitiesCountries = async (value: string) => {
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
    return initialHotelsCitiesCountriesState;
  }
};

function App() {
  const [hotelsCitiesCountries, setHotelsCitiesCountries] = useState<{
    hotels: HotelWithId[];
    countries: CountryWithId[];
    cities: CityWithId[];
  }>({
    hotels: [],
    countries: [],
    cities: [],
  });

  const [showClearBtn, setShowClearBtn] = useState(false);

  const fetchData = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setHotelsCitiesCountries(initialHotelsCitiesCountriesState);
      setShowClearBtn(false);
      return;
    }

    const data = await fetchHotelsCitiesCountries(event.target.value);
    setShowClearBtn(true);
    setHotelsCitiesCountries(data);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="dropdown">
              <div className="form">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="Search accommodation..."
                  onChange={fetchData}
                />
                {showClearBtn && (
                  <span className="left-pan">
                    <i className="fa fa-close"></i>
                  </span>
                )}
              </div>
              {!!hotelsCitiesCountries.hotels.length && (
                <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
                  <h2>Hotels</h2>
                  <HotelResultsDropdown hotels={hotelsCitiesCountries.hotels} />
                  <h2>Countries</h2>
                  <CountryResultsDropdown
                    countries={hotelsCitiesCountries.countries}
                  />
                  <h2>Cities</h2>
                  <CityResultsDropdown cities={hotelsCitiesCountries.cities} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
