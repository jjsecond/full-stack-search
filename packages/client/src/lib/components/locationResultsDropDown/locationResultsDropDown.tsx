//locationResultsDropDown

import { HotelsCountriesCities } from '../../types/state';
import CityResultsDropdown from '../cityResultsDropdown/cityResultsDropdown';
import CountryResultsDropdown from '../countryResultsDropdown/countryResultsDropdown';
import HotelResultsDropdown from '../hotelResultsDropdown/hotelResultsDropdown';

export type LocationResultsDropDownProps = {
  locations: HotelsCountriesCities;
  searchBarHasText: boolean;
};

const LocationResultsDropDown: React.FC<LocationResultsDropDownProps> = ({
  locations,
  searchBarHasText,
}) => {
  return (
    <>
      {searchBarHasText && (
        <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
          <h2>Hotels</h2>
          <HotelResultsDropdown hotels={locations.hotels} />
          <h2>Countries</h2>
          <CountryResultsDropdown countries={locations.countries} />
          <h2>Cities</h2>
          <CityResultsDropdown cities={locations.cities} />
        </div>
      )}
    </>
  );
};

export default LocationResultsDropDown;
