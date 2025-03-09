import { useState, useEffect } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";

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
                  <PlaceCard key={placeIndex} place={place} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}

import PropTypes from "prop-types";

function PlaceCard({ place }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    place && GetPlacePhoto(place.placeName);
  }, [place.placeName]);

  const GetPlacePhoto = async (placeName) => {
    if (!placeName) return;
    try {
      const data = { textQuery: placeName };
      const result = await GetPlaceDetails(data);
      if (result?.data?.places[0]?.photos?.[3]?.name) {
        const photoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          result.data.places[0].photos[3].name
        );
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  return (
    <div className="block text-inherit">
      <div className="hover:scale-105 transition-all cursor-pointer shadow-xl rounded-md h-full flex ">
        <img
          src={photoUrl || "/src/assets/place.jpeg"}
          alt={place.placeName}
          className="rounded-lg h-40 w-64 object-cover"
        />
        <div className="my-2 mx-2">
          <h2 className="font-medium text-black">{place.placeName}</h2>
          <p className="text-gray-600 text-sm">{place.details}</p>
          <div className="flex flex-col gap-1 mt-2">
            {place.address && (
              <p className="text-gray-700">📍 {place.address}</p>
            )}
            {place.ticketPricing && (
              <p className="text-gray-700">🎟 {place.ticketPricing}</p>
            )}
            {place.travelTime && (
              <p className="text-gray-700">🕒 {place.travelTime}</p>
            )}
            {place.bestTimeToVisit && (
              <p className="text-gray-700">⏰ {place.bestTimeToVisit}</p>
            )}
            {place.contact && (
              <p className="text-gray-700">📞 {place.contact}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

(PlacesToVisit.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.shape({
      tripData: PropTypes.shape({
        userSelection: PropTypes.shape({
          location: PropTypes.string,
        }),
        itinerary: PropTypes.objectOf(
          PropTypes.shape({
            theme: PropTypes.string,
            places: PropTypes.arrayOf(
              PropTypes.shape({
                placeName: PropTypes.string,
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
}),
  (PlaceCard.propTypes = {
    place: PropTypes.shape({
      placeName: PropTypes.string.isRequired,
      details: PropTypes.string,
      address: PropTypes.string,
      ticketPricing: PropTypes.string,
      travelTime: PropTypes.string,
      bestTimeToVisit: PropTypes.string,
      contact: PropTypes.string,
    }).isRequired,
  });

export default PlacesToVisit;
