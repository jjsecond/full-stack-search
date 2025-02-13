import { API_URL } from '../functions/getApiUrl';

export const fetchDBDocument = async <T>(
  id: string,
  apiEndpoint: string,
  stateSetter: React.Dispatch<React.SetStateAction<T | null>>,
  errorSetter: React.Dispatch<React.SetStateAction<string | null>>,
  documentCollectionType: string,
) => {
  try {
    const response = await fetch(`${API_URL}${apiEndpoint}/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    stateSetter(data);
  } catch (error) {
    console.error(`Error fetching ${documentCollectionType}:`, error);
    errorSetter(`Failed to load ${documentCollectionType} data.`);
  }
};

export default fetchDBDocument;
