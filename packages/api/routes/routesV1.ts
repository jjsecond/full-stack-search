import express from 'express';
import getHotelsByNameOrLocation from 'handlers/getHotelsByNameOrLocation';
import getCitiesByName from 'handlers/getCitiesByName';
import getCountriesByName from 'handlers/getCountriesByName';
import getHotelsCitiesCountriesByText from 'handlers/getHotelsCitiesCountriesByText';

export const routerV1 = express.Router();

routerV1.get(
  '/getHotelsByNameOrLocation/:textSearch',
  getHotelsByNameOrLocation,
);
routerV1.get('/getCitiesByName/:name', getCitiesByName);
routerV1.get('/getCountriesByName/:name', getCountriesByName);

routerV1.get(
  '/getHotelsCitiesCountriesByText/:textSearch',
  getHotelsCitiesCountriesByText,
);
