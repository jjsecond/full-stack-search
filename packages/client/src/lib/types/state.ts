import { CityWithId, CountryWithId, HotelWithId } from './dbTypes';

export type HotelsCountriesCities = {
  hotels: HotelWithId[];
  countries: CountryWithId[];
  cities: CityWithId[];
};
