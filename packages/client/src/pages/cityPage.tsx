import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CityWithId } from '../lib/types/dbTypes';
import { API_ENDPOINTS_V1 } from '../lib/constants/apiEndpoints';
import fetchDBDocument from '../lib/api/fetchDDDocument';
import LoadingData from '../lib/components/common/loadingData';

const CityPage = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [city, setCity] = useState<CityWithId | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cityId) {
      fetchDBDocument(cityId, API_ENDPOINTS_V1.CITY, setCity, setError, 'city');
    }
  }, [cityId]);

  if (error) return <p>{error}</p>;
  if (!city) return <LoadingData />;

  return (
    <main>
      <h1>{city.name}</h1>
    </main>
  );
};

export default CityPage;
