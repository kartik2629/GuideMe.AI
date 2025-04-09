import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import defaultImage from "/src/assets/place.jpeg";

function ResCard({ restaurant, index }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (restaurant) {
      GetPlacePhoto();
    }
  }, [restaurant]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: restaurant.name,
    };
    try {
      setLoading(true);
      const resp = await GetPlaceDetails(data);
      if (resp?.data?.places?.[0]?.photos?.[1]?.name) {
        const PhotoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[1].name
        );
        setPhotoUrl(PhotoUrl);
      } else {
        setPhotoUrl(defaultImage);
      }
    } catch (error) {
      console.error("Error fetching restaurant photo:", error);
      setPhotoUrl(defaultImage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      key={index}
      to={`https://www.google.com/maps/search/?api=1&query=$${encodeURIComponent(
        restaurant.name
      )}+${encodeURIComponent(restaurant.location)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block text-inherit"
    >
      <div className="hover:scale-105 transition-all cursor-pointer shadow-md rounded-md h-full flex flex-col">
        <div className="relative h-40 w-full rounded-t-md overflow-hidden">
          {loading ? (
            <div className="animate-pulse bg-gray-300 w-full h-full rounded-t-md" />
          ) : (
            <img
              src={photoUrl || defaultImage}
              className="rounded-t-md h-full w-full object-cover transition-opacity duration-300"
              onError={(e) => (e.target.src = defaultImage)} // Fallback if image fails to load
              alt={restaurant.name}
              style={{ opacity: loading ? 0 : 1 }}
              onLoad={() => setLoading(false)}
            />
          )}
        </div>
        <div className="p-3 flex-grow">
          <h2 className="font-medium text-black text-lg">{restaurant.name}</h2>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            📍 <span>{restaurant.location}</span>
          </div>
          <div className="flex flex-col justify-between mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              💸 <span>{restaurant.priceRange}</span>
            </div>
            <h2 className="flex items-center gap-1">
              🍽 <span>{restaurant.cuisine}</span>
            </h2>
            <p className="text-gray-500 mt-1">{restaurant.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

ResCard.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    priceRange: PropTypes.string.isRequired,
    cuisine: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number,
};

export default ResCard;
