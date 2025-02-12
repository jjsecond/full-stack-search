import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HotelPage from './pages/hotelPage.tsx';
import NotFoundPage from './pages/notFoundPage.tsx';
import CountryPage from './pages/countryPage.tsx';
import CityPage from './pages/cityPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: 'hotels/:hotelId',
    element: <HotelPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: 'country/:countryId',
    element: <CountryPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: 'city/:cityId',
    element: <CityPage />,
    errorElement: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
