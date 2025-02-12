import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CountryWithId } from '../lib/types/dbTypes';
import { API_URL } from '../lib/functions/getApiUrl';
import { API_ENDPOINTS_V1 } from '../lib/constants/apiEndpoints';

const CountryPage = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const [country, setCountry] = useState<CountryWithId | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async (id: string) => {
      try {
        const response = await fetch(
          `${API_URL}${API_ENDPOINTS_V1.COUNTRY}/${id}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCountry(data);
      } catch (error) {
        console.error('Error fetching country:', error);
        setError('Failed to load country data.');
      }
    };

    if (countryId) {
      fetchCountry(countryId);
    }
  }, [countryId]);

  if (error) return <p>{error}</p>;
  if (!country) return <p>Loading...</p>;

  return (
    <div>
      <h1>{country.country}</h1>
    </div>
  );
};

export default CountryPage;
