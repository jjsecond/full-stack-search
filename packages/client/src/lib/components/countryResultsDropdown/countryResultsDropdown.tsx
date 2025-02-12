import { CountryWithId } from '../../types/dbTypes';

export type CountryResultsDropdownProps = {
  countries: CountryWithId[];
};

const CountryResultsDropdown: React.FC<CountryResultsDropdownProps> = ({
  countries,
}) => {
  return (
    <ol>
      {countries.length ? (
        countries.map((country) => (
          <li key={country._id}>
            <a href={`/country/${country._id}`} className="dropdown-item">
              <i className="fa fa-building mr-2"></i>
              {country.country}
            </a>
            <hr className="divider" />
          </li>
        ))
      ) : (
        <p>No countries matched</p>
      )}
    </ol>
  );
};

export default CountryResultsDropdown;
