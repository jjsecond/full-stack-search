import express from 'express';
import getHotelsCitiesCountriesByText from 'handlers/getHotelsCitiesCountriesByText';
import getCityById from 'handlers/getCityById';
import getCountryById from 'handlers/getCountryById';
import getHotelById from 'handlers/getHotelById';

export const routerV1 = express.Router();

routerV1.get('/hotel/:id', getHotelById);
routerV1.get('/city/:id', getCityById);
routerV1.get('/country/:id', getCountryById);

routerV1.get('/hotels-cities-countries/:text', getHotelsCitiesCountriesByText);
