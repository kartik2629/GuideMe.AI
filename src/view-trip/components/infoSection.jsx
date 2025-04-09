import { GetPlaceDetails } from "@/service/GlobalAPI";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1080&maxWidthPx=1080&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    if (
      !trip?.userSelection?.location?.label &&
      !trip?.userSelection?.location
    ) {
      setLoading(false);
      return;
    }

    const locationQuery =
      trip?.userSelection?.location?.label || trip?.userSelection?.location;
    const data = {
      textQuery: locationQuery,
    };

    try {
      const resp = await GetPlaceDetails(data);
      if (
        resp?.data?.places &&
        resp.data.places.length > 0 &&
        resp.data.places[0]?.photos &&
        resp.data.places[0].photos.length > 0
      ) {
        const PhotoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[0].name
        );
        setPhotoUrl(PhotoUrl);
      } else {
        setPhotoUrl("/placeholder-image.jpg");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
      setPhotoUrl("/placeholder-image.jpg");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="relative w-full h-64 rounded-xl overflow-hidden">
        {loading ? (
          <div className="animate-pulse bg-gray-300 w-full h-full rounded-xl" />
        ) : (
          <img
            src={photoUrl || "/placeholder-image.jpg"}
            className="h-full w-full object-cover rounded-xl transition-opacity duration-300"
            alt={
              trip?.userSelection?.location?.label ||
              trip?.userSelection?.location ||
              "Destination"
            }
            style={{ opacity: loading ? 0 : 1 }}
            onLoad={() => setLoading(false)}
          />
        )}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-xl md:text-2xl">
            {trip?.userSelection?.location?.label ||
              trip?.userSelection?.location ||
              "Destination"}
          </h2>
          <div className="flex flex-wrap gap-2">
            <h2 className="p-1 px-2 bg-gray-200 rounded-full text-gray-500 text-xs">
              📅{trip?.userSelection?.numberOfDays || "N/A"} Days
            </h2>
            <h2 className="p-1 px-2 bg-gray-200 rounded-full text-gray-500 text-xs">
              💰{trip?.userSelection?.budget || "N/A"}
            </h2>
            <h2 className="p-1 px-2 bg-gray-200 rounded-full text-gray-500 text-xs">
              😉No. of Traveller:{trip?.userSelection?.numberOfPeople || "N/A"}
            </h2>
            <h2 className="p-1 px-2 bg-gray-200 rounded-full text-gray-500 text-xs">
              ⌛{trip?.tripData?.tripData?.bestTimeToVisit || "N/A"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

InfoSection.propTypes = {
  trip: PropTypes.shape({
    userSelection: PropTypes.shape({
      location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      numberOfDays: PropTypes.string,
      budget: PropTypes.string,
      numberOfPeople: PropTypes.string,
    }),
    tripData: PropTypes.shape({
      tripData: PropTypes.shape({
        bestTimeToVisit: PropTypes.string,
      }),
    }),
  }),
};

export default InfoSection;
