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
            <div className="grid grid-cols-1 gap-5 mt-5">
              {Array.isArray(day.places) &&
                day.places.map((place, placeIndex) => (
                  <div key={placeIndex} className="block text-inherit">
                    <div className="hover:scale-105 transition-all cursor-pointer shadow-xl rounded-md h-full flex ">
                      <img
                        src={"/src/assets/place.jpeg"}
                        alt={place.placeName}
                        className="rounded-lg h-40 w-64 object-cover"
                      />
                      <div className="my-2 mx-2">
                        <h2 className="font-medium text-black">
                          {place.placeName}
                        </h2>
                        <p className="text-gray-600 text-sm">{place.details}</p>
                        <div className="flex flex-col gap-1 mt-2">
                          {place.address && (
                            <p className="text-gray-700">📍 {place.address}</p>
                          )}
                          {/* {place.coordinates && (
                            <p className="text-gray-700">
                              🌍 Lat: {place.coordinates.latitude}, Lng:{" "}
                              {place.coordinates.longitude}
                            </p>
                          )} */}
                          {place.ticketPricing && (
                            <p className="text-gray-700">
                              🎟 {place.ticketPricing}
                            </p>
                          )}
                          {place.travelTime && (
                            <p className="text-gray-700">
                              🕒 {place.travelTime}
                            </p>
                          )}
                          {place.bestTimeToVisit && (
                            <p className="text-gray-700">
                              ⏰ {place.bestTimeToVisit}
                            </p>
                          )}
                          {place.contact && (
                            <p className="text-gray-700">📞 {place.contact}</p>
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
      tripData: PropTypes.shape({
        itinerary: PropTypes.objectOf(
          PropTypes.shape({
            theme: PropTypes.string,
            places: PropTypes.arrayOf(
              PropTypes.shape({
                placeName: PropTypes.string.isRequired,
                details: PropTypes.string,
                imageUrl: PropTypes.string,
                coordinates: PropTypes.shape({
                  latitude: PropTypes.number,
                  longitude: PropTypes.number,
                }),
                ticketPricing: PropTypes.string,
                travelTime: PropTypes.string,
                bestTimeToVisit: PropTypes.string,
                contact: PropTypes.string,
              })
            ),
          })
        ),
      }),
    }),
  }),
};

export default PlacesToVisit;