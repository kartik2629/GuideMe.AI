import PropTypes from "prop-types";

import HotelCard from "./HotelCard";

function Hotels({ trip }) {
  return (
    <div className="mt-6">
      <h2 className="font-bold text-xl mb-3">Hotel Recommendation</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trip?.tripData?.tripData?.hotels?.map((hotel, index) => (
          <HotelCard key={index} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
Hotels.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.shape({
      tripData: PropTypes.shape({
        hotels: PropTypes.arrayOf(
          PropTypes.shape({
            hotelName: PropTypes.string.isRequired,
            hotelAddress: PropTypes.string.isRequired,
            price: PropTypes.string,
          })
        ),
      }),
    }),
  }),
};

export default Hotels;
