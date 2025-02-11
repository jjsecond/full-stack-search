import express from "express";
import getAllCities from "handlers/getAllCities";
import getAllCountries from "handlers/getAllCountries";
import getAllHotels from "handlers/getAllHotels";

export const routerV1 = express.Router();

routerV1.get('/hotels', getAllHotels);
routerV1.get('/countries', getAllCountries);
routerV1.get('/cities', getAllCities);