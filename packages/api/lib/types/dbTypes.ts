export type Hotel = {
  chain_name: string
  hotel_name: string
  addressline1: string
  addressline2: string
  zipcode: string
  city: string
  state: string
  country: string
  countryisocode: string
  star_rating: number
}

export type HotelWithId<T extends Partial<Hotel> = Hotel> = T & { _id?: string }

export type Country = {
  country: string
  countryisocode: string
}

export type CountryWithId<T extends Partial<Country> = Country> = T & {
  _id?: string
}

export type City = {
  name: string
}

export type CityWithId<T extends Partial<City> = City> = T & { _id?: string }

// Projection limited types
export type HotelProjectionLimited = Pick<HotelWithId, '_id' | 'hotel_name'>
export type CountryProjectionLimited = Pick<CountryWithId, '_id' | 'country'>
export type CityProjectionLimited = Pick<CityWithId, '_id' | 'name'>
