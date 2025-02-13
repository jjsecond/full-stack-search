import dbConnection from 'db/dbConnection/dbConnection';
import { Request, Response } from 'express';
import { LIMIT_FOR_MULTI_COLLECTIONS } from 'lib/constants/collections';
import searchCitiesByPartialName from 'lib/helperFunctions/searchCitiesByPartialName';
import searchCountriesByPartialCountry from 'lib/helperFunctions/searchCountriesByPartialCountry';
import searchHotelsByPartialNameOrCountry from 'lib/helperFunctions/searchHotelsByPartialNameOrCountry';
import {
  CityProjectionLimited,
  CountryProjectionLimited,
  HotelProjectionLimited,
} from 'lib/types/dbTypes';

const getHotelsCitiesCountriesByText = async (req: Request, res: Response) => {
  try {
    const { text } = req.params;

    // TODO: consider index with lowercase
    const partialSearchText = new RegExp(text, 'i');

    const db = await dbConnection();

    const limit = LIMIT_FOR_MULTI_COLLECTIONS;

    const [countries, cities, hotels]: [
      CountryProjectionLimited[],
      CityProjectionLimited[],
      HotelProjectionLimited[],
    ] = await Promise.all([
      searchCountriesByPartialCountry(db, partialSearchText, limit),
      searchCitiesByPartialName(db, partialSearchText, limit),
      searchHotelsByPartialNameOrCountry(db, partialSearchText, limit),
    ]);

    res.status(200).json({ countries, cities, hotels });
  } catch (error) {
    console.log(
      'Error searching for hotels,cities and countries by text: ',
      error,
    );
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

export default getHotelsCitiesCountriesByText;
