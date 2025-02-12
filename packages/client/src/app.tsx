import { useState, type ChangeEvent } from 'react';
import { HotelsCountriesCities } from './lib/types/state';
import LocationResultsDropDown from './lib/components/locationResultsDropDown/locationResultsDropDown';
import { initialLocationsState } from './lib/constants/initialStates';
import { fetchLocations } from './lib/api/fetchLocations';

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

function App() {
  const [locations, setLocations] = useState<HotelsCountriesCities>(
    initialLocationsState,
  );
  const [showClearBtn, setShowClearBtn] = useState(false);

  const fetchData = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setLocations(initialLocationsState);
      setShowClearBtn(false);
      return;
    }

    const data = await fetchLocations(event.target.value);
    setShowClearBtn(true);
    setLocations(data);
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
              <LocationResultsDropDown locations={locations} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
