import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CountryWithId } from '../lib/types/dbTypes';
import { API_ENDPOINTS_V1 } from '../lib/constants/apiEndpoints';
import fetchDBDocument from '../lib/api/fetchDBDocument';
import LoadingData from '../lib/components/common/loadingData';

const CountryPage = () => {
  const { countryId } = useParams<{ countryId: string }>();
  const [country, setCountry] = useState<CountryWithId | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (countryId) {
      fetchDBDocument(
        countryId,
        API_ENDPOINTS_V1.COUNTRY,
        setCountry,
        setError,
        'country',
      );
    }
  }, [countryId]);

  if (error) return <p>{error}</p>;
  if (!country) return <LoadingData />;

  return (
    <main>
      <h1>{country.country}</h1>
    </main>
  );
};

export default CountryPage;
