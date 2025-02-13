import { HotelWithId } from '../../types/dbTypes';

export type HotelResultsDropdownProps = {
  hotels: HotelWithId[];
};

const HotelResultsDropdown: React.FC<HotelResultsDropdownProps> = ({
  hotels,
}) => {
  return (
    <ul className="list-unstyled">
      {hotels.length ? (
        hotels.map((hotel) => (
          <li key={hotel._id}>
            <a href={`/hotel/${hotel._id}`} className="dropdown-item">
              <i className="fa fa-building mr-2"></i>
              {hotel.hotel_name}
            </a>
            <hr className="divider" />
          </li>
        ))
      ) : (
        <p>No hotels matched</p>
      )}
    </ul>
  );
};

export default HotelResultsDropdown;
