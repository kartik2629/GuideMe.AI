import PropTypes from "prop-types";

import ResCard from "./ResCard";

function Restaurent({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Restaurants Recommendation</h2>
      <div className="grid grid-cols-2 gap-5 mt-5 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1">
        {trip?.tripData?.tripData?.contextualRecommendations?.restaurants?.map(
          (restaurant, index) => (
            <ResCard key={index} restaurant={restaurant} />
          )
        )}
      </div>
    </div>
  );
}

Restaurent.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.shape({
      tripData: PropTypes.shape({
        contextualRecommendations: PropTypes.shape({
          restaurants: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              location: PropTypes.string.isRequired,
              priceRange: PropTypes.string,
              cuisine: PropTypes.string,
              description: PropTypes.string,
            })
          ),
        }),
      }),
    }),
  }),
};
export default Restaurent;
