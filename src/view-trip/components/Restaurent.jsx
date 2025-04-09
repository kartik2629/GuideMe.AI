import PropTypes from "prop-types";

import ResCard from "./ResCard";

function Restaurent({ trip }) {
  return (
    <div className="mt-6">
      <h2 className="font-bold text-xl mb-3">Restaurants Recommendation</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
