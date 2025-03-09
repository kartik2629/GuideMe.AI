import PropTypes from "prop-types";

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.tripData?.itinerary;

  if (
    !itinerary ||
    typeof itinerary !== "object" ||
    Object.keys(itinerary).length === 0
  ) {
    return (
      <p className="text-gray-500 text-center mt-5">No itinerary available.</p>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Day Wise Itinerary</h2>

      {Object.entries(itinerary)
        .sort(([dayA], [dayB]) => dayA.localeCompare(dayB))
        .map(([dayKey, day], index) => (
          <div key={dayKey} className="mt-5">
            <h2 className="font-medium text-lg">
              Day {index + 1} : {day.theme}
            </h2>

            <div className="grid grid-rows-1 gap-5 mt-5">
              {Array.isArray(day.places) &&
                day.places.map((place, placeIndex) => (
                  <div key={placeIndex} className="block text-inherit">
                    <div className="hover:scale-105 transition-all cursor-pointer shadow-xl rounded-md h-full">
                      <img
                        src={place.image || "/src/assets/place.jpeg"}
                        alt={place.placeName}
                        className="rounded-lg h-56 w-96 object-cover"
                      />

                      <div className="my-2 mx-2">
                        <h2 className="font-medium text-black">
                          {place.placeName}
                        </h2>

                        {place.address && (
                          <div className="flex items-center gap-2">
                            📍{" "}
                            <h2 className="font-medium text-black">
                              {place.address}
                            </h2>
                          </div>
                        )}

                        <div className="flex flex-col justify-between">
                          {place.bestTimeToVisit && (
                            <div className="flex items-center gap-2">
                              ⏰{" "}
                              <h2 className="font-small text-sm text-gray-600">
                                {place.bestTimeToVisit}
                              </h2>
                            </div>
                          )}

                          {place.contact && (
                            <h2 className="font-small text-sm text-gray-600">
                              📞 {place.contact}
                            </h2>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}

PlacesToVisit.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.shape({
      itinerary: PropTypes.objectOf(
        PropTypes.shape({
          places: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string,
              address: PropTypes.string,
              openingHours: PropTypes.string,
              contact: PropTypes.string,
              image: PropTypes.string,
            })
          ),
        })
      ),
      tripData: PropTypes.shape({
        itinerary: PropTypes.objectOf(
          PropTypes.shape({
            places: PropTypes.arrayOf(
              PropTypes.shape({
                name: PropTypes.string,
                address: PropTypes.string,
                openingHours: PropTypes.string,
                contact: PropTypes.string,
                image: PropTypes.string,
              })
            ),
          })
        ),
        tripData: PropTypes.shape({
          itinerary: PropTypes.objectOf(
            PropTypes.shape({
              places: PropTypes.arrayOf(
                PropTypes.shape({
                  name: PropTypes.string,
                  address: PropTypes.string,
                  openingHours: PropTypes.string,
                  contact: PropTypes.string,
                  image: PropTypes.string,
                })
              ),
            })
          ),
        }),
      }),
    }),
  }),
};

export default PlacesToVisit;
