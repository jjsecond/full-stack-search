import { CityWithId } from '../../types/dbTypes';

export type CityResultsDropdownProps = {
  cities: CityWithId[];
};

const CityResultsDropdown: React.FC<CityResultsDropdownProps> = ({
  cities,
}) => {
  return (
    <ol>
      {cities.length ? (
        cities.map((city) => (
          <li key={city._id}>
            <a href={`/city/${city._id}`} className="dropdown-item">
              <i className="fa fa-building mr-2"></i>
              {city.name}
            </a>
            <hr className="divider" />
          </li>
        ))
      ) : (
        <p>No cities matched</p>
      )}
    </ol>
  );
};

export default CityResultsDropdown;
