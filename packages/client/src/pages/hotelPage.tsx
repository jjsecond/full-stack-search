import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HotelWithId } from '../lib/types/dbTypes';
import { API_URL } from '../lib/functions/getApiUrl';
import { API_ENDPOINTS_V1 } from '../lib/constants/apiEndpoints';

const HotelPage = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [hotel, setHotel] = useState<HotelWithId | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotel = async (id: string) => {
      try {
        const response = await fetch(
          `${API_URL}${API_ENDPOINTS_V1.HOTEL}/${id}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error('Error fetching hotel:', error);
        setError('Failed to load hotel data.');
      }
    };

    if (hotelId) {
      fetchHotel(hotelId);
    }
  }, [hotelId]);

  if (error) return <p>{error}</p>;
  if (!hotel) return <p>Loading...</p>;

  return (
    <div>
      <h1>{hotel.hotel_name}</h1>
    </div>
  );
};

export default HotelPage;
