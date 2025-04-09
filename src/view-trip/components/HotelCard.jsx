import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";

function HotelCard({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    try {
      setLoading(true);
      const data = {
        textQuery: hotel.hotelName,
      };
      const resp = await GetPlaceDetails(data);

      const place = resp?.data?.places?.[0];
      const photos = place?.photos;

      if (photos && photos.length > 0) {
        const photoName = photos[1]?.name || photos[0].name;
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
        setPhotoUrl(photoUrl);
      } else {
        setPhotoUrl("/src/assets/place.jpeg");
        console.warn("No photos available for this hotel");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=$${encodeURIComponent(
        hotel.hotelName
      )}+${encodeURIComponent(hotel.hotelAddress)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block text-inherit"
    >
      <div className="hover:scale-105 transition-all cursor-pointer shadow-md rounded-md h-full">
        <div className="relative w-full h-40 rounded-t-md overflow-hidden">
          {loading ? (
            <div className="animate-pulse bg-gray-300 w-full h-full rounded-t-md" />
          ) : (
            <img
              src={photoUrl}
              className="rounded-t-md h-full w-full object-cover transition-opacity duration-300"
              onError={(e) => (e.target.src = "/src/assets/place.jpeg")}
              alt={hotel.hotelName}
              style={{ opacity: loading ? 0 : 1 }}
              onLoad={() => setLoading(false)}
            />
          )}
        </div>
        <div className="p-3">
          <h2 className="font-medium text-black text-lg">{hotel.hotelName}</h2>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            📍 <span>{hotel.hotelAddress}</span>
          </div>
          <div className="flex flex-col justify-between mt-2">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              💸 <span>{hotel.price}</span>
            </div>
            <h2 className="font-small text-sm text-gray-600">
              ⭐ {hotel.rating} stars
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

HotelCard.propTypes = {
  hotel: PropTypes.shape({
    hotelName: PropTypes.string.isRequired,
    hotelAddress: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default HotelCard;
