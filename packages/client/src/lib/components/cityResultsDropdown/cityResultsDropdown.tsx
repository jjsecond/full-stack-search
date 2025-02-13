import { CityWithId } from '../../types/dbTypes';

export type CityResultsDropdownProps = {
  cities: CityWithId[];
};

const CityResultsDropdown: React.FC<CityResultsDropdownProps> = ({
  cities,
}) => {
  return (
    <ul className="list-unstyled">
      {cities.length ? (
        cities.map((city) => (
          <li key={city._id}>
            <a href={`/city/${city._id}`} className="dropdown-item">
              <i className="fa fa-street-view mr-2"></i>
              {city.name}
            </a>
            <hr className="divider" />
          </li>
        ))
      ) : (
        <p>No cities matched</p>
      )}
    </ul>
  );
};

export default CityResultsDropdown;
