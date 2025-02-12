import { useRef, useState, type ChangeEvent } from 'react';
import { HotelsCountriesCities } from './lib/types/state';
import LocationResultsDropDown from './lib/components/locationResultsDropDown/locationResultsDropDown';
import { initialLocationsState } from './lib/constants/initialStates';
import { fetchLocations } from './lib/api/fetchLocations';

// TODO: consider moving the filtering and checking to the api
//   ({ chain_name, hotel_name, city, country }) =>
//     chain_name.toLowerCase().includes(value.toLowerCase()) ||
//     hotel_name.toLowerCase().includes(value.toLowerCase()) ||
//     city.toLowerCase().includes(value.toLowerCase()) ||
//     country.toLowerCase().includes(value.toLowerCase())

function App() {
  const [locations, setLocations] = useState<HotelsCountriesCities>(
    initialLocationsState,
  );
  const [searchBarHasText, setSearchBarHasText] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const fetchData = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setLocations(initialLocationsState);
      setSearchBarHasText(false);
      return;
    }

    const data = await fetchLocations(event.target.value);
    setSearchBarHasText(true);
    setLocations(data);
  };

  const clearSearchBar = () => {
    setLocations(initialLocationsState);
    setSearchBarHasText(false);

    if (searchInputRef.current) {
      searchInputRef.current.value = '';
    }
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
                  ref={searchInputRef}
                />
                {searchBarHasText && (
                  <span className="left-pan" onClick={clearSearchBar}>
                    <i className="fa fa-close"></i>
                  </span>
                )}
              </div>
              <LocationResultsDropDown
                locations={locations}
                searchBarHasText={searchBarHasText}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
