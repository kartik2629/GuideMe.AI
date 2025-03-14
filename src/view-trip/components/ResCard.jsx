import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";

function ResCard({ restaurant, index }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    restaurant && GetPlacePhoto();
  }, [restaurant]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: restaurant?.name,
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      const photoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[0].name
      );
      setPhotoUrl(photoUrl);
    });
  };

  return (
    <Link
      key={index}
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        restaurant.name
      )}+${encodeURIComponent(restaurant.location)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block text-inherit"
    >
      <div className="hover:scale-105 transition-all cursor-pointer shadow-xl rounded-md h-full">
        <img src={photoUrl} className="rounded-lg h-56 w-96 object-cover" />
        <div className="my-2 mx-2">
          <h2 className="font-medium text-black">{restaurant.name}</h2>
          <div className="flex items-center gap-2">
            📍
            <h2 className="font-medium text-black">{restaurant.location}</h2>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-2">
              💸
              <h2 className="font-small text-sm text-gray-600">
                {restaurant.priceRange}
              </h2>
            </div>

            <h2 className="font-small text-sm text-gray-600">
              🍽 {restaurant.cuisine}
            </h2>
            <p className="text-sm text-gray-500">{restaurant.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
ResCard.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    priceRange: PropTypes.string,
    cuisine: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
};

export default ResCard;
