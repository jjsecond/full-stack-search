import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CityWithId } from '../lib/types/dbTypes';
import { API_URL } from '../lib/functions/getApiUrl';
import { API_ENDPOINTS_V1 } from '../lib/constants/apiEndpoints';

const CityPage = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [city, setCity] = useState<CityWithId | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCity = async (id: string) => {
      try {
        const response = await fetch(
          `${API_URL}${API_ENDPOINTS_V1.CITY}/${id}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCity(data);
      } catch (error) {
        console.error('Error fetching city:', error);
        setError('Failed to load city data.');
      }
    };

    if (cityId) {
      fetchCity(cityId);
    }
  }, [cityId]);

  if (error) return <p>{error}</p>;
  if (!city) return <p>Loading...</p>;

  return (
    <div>
      <h1>{city.name}</h1>
    </div>
  );
};

export default CityPage;
