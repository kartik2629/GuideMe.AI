import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";

function HotelCard({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    try {
      const data = { textQuery: hotel.hotelName };
      const result = await GetPlaceDetails(data);

      if (
        result?.data?.places?.length > 0 &&
        result.data.places[0].photos?.length > 0
      ) {
        const photoRef = result.data.places[0].photos[0].name;
        const url = PHOTO_REF_URL.replace("{NAME}", photoRef);
        setPhotoUrl(url);
      } else {
        console.warn("No photo found for:", hotel.hotelName);
        setPhotoUrl("/src/assets/place.jpeg");
      }
    } catch (error) {
      console.error("Error fetching hotel photo:", error);
      setPhotoUrl("/src/assets/place.jpeg"); 
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        hotel.hotelName
      )}+${encodeURIComponent(hotel.hotelAddress)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block text-inherit"
    >
      <div className="hover:scale-105 transition-all cursor-pointer shadow-xl rounded-md h-full">
        <img
          src={photoUrl}
          className="rounded-lg h-56 w-96 object-cover"
          onError={(e) => (e.target.src = "/src/assets/place.jpeg")} 
          alt={hotel.hotelName}
        />
        <div className="my-2 mx-2">
          <h2 className="font-medium text-black">{hotel.hotelName}</h2>
          <div className="flex items-center gap-2">
            📍 <h2 className="font-medium text-black">{hotel.hotelAddress}</h2>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-2">
              💸{" "}
              <h2 className="font-small text-sm text-gray-600">
                {hotel.price}
              </h2>
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
