import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HotelWithId } from '../lib/types/dbTypes';
import { API_ENDPOINTS_V1 } from '../lib/constants/apiEndpoints';
import fetchDBDocument from '../lib/api/fetchDDDocument';
import LoadingData from '../lib/components/common/loadingData';

const HotelPage = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [hotel, setHotel] = useState<HotelWithId | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hotelId) {
      fetchDBDocument(
        hotelId,
        API_ENDPOINTS_V1.HOTEL,
        setHotel,
        setError,
        'hotel',
      );
    }
  }, [hotelId]);

  if (error) return <p>{error}</p>;
  if (!hotel) return <LoadingData />;

  return (
    <main>
      <h1>{hotel.hotel_name}</h1>
    </main>
  );
};

export default HotelPage;
