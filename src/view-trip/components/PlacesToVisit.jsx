import { useState, useEffect } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.tripData?.itinerary;

  if (
    !itinerary ||
    typeof itinerary !== "object" ||
    Object.keys(itinerary).length === 0
  ) {
    return (
      <p className="text-gray-500 text-center mt-6">No itinerary available.</p>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="font-bold text-xl mb-3">Day Wise Itinerary</h2>
      {Object.entries(itinerary)
        .sort(([dayA], [dayB]) => dayA.localeCompare(dayB))
        .map(([dayKey, day], index) => (
          <div key={dayKey} className="mt-4">
            <h2 className="font-medium text-lg mb-2">
              Day {index + 1} : {day.theme}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {Array.isArray(day.places) &&
                day.places.map((place, placeIndex) => (
                  <PlaceCard key={placeIndex} place={place} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}

function PlaceCard({ place }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (place?.placeName) {
      GetPlacePhoto(place.placeName);
    }
  }, [place.placeName]);

  const GetPlacePhoto = async (placeName) => {
    if (!placeName) return;
    try {
      setLoading(true);
      const data = { textQuery: placeName };
      const result = await GetPlaceDetails(data);
      if (result?.data?.places?.[0]?.photos?.[0]?.name) {
        const photoRef = result.data.places[0].photos[0].name;
        setPhotoUrl(PHOTO_REF_URL.replace("{NAME}", photoRef));
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="block text-inherit">
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=$${encodeURIComponent(
          place.placeName
        )}+${encodeURIComponent(place.placeName)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-inherit"
      >
        <div className="hover:scale-105 transition-all cursor-pointer shadow-md rounded-md h-full flex flex-col sm:flex-row">
          {loading ? (
            <div className="h-40 w-full sm:w-64 bg-gray-300 animate-pulse rounded-t-md sm:rounded-l-md sm:rounded-r-none" />
          ) : (
            <img
              src={photoUrl || "/src/assets/place.jpeg"}
              alt={place.placeName}
              className="rounded-t-md sm:rounded-l-md sm:rounded-r-none h-40 w-full sm:w-64 object-cover"
              loading="lazy"
            />
          )}
          <div className="p-3 flex-grow">
            <h2 className="font-medium text-black text-lg">
              {place.placeName}
            </h2>
            <p className="text-gray-600 text-sm mb-2">{place.details}</p>
            <div className="flex flex-col gap-1 text-sm text-gray-700">
              {place.address && (
                <p className="flex items-center gap-1">
                  📍 <span>{place.address}</span>
                </p>
              )}
              {place.ticketPricing && (
                <p className="flex items-center gap-1">
                  🎟 <span>{place.ticketPricing}</span>
                </p>
              )}
              {place.travelTime && (
                <p className="flex items-center gap-1">
                  🕒 <span>{place.travelTime}</span>
                </p>
              )}
              {place.bestTimeToVisit && (
                <p className="flex items-center gap-1">
                  ⏰ <span>{place.bestTimeToVisit}</span>
                </p>
              )}
              {place.contact && (
                <p className="flex items-center gap-1">
                  📞 <span>{place.contact}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
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
                address: PropTypes.string,
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

PlaceCard.propTypes = {
  place: PropTypes.shape({
    placeName: PropTypes.string.isRequired,
    details: PropTypes.string,
    address: PropTypes.string,
    ticketPricing: PropTypes.string,
    travelTime: PropTypes.string,
    bestTimeToVisit: PropTypes.string,
    contact: PropTypes.string,
  }).isRequired,
};

export default PlacesToVisit;
