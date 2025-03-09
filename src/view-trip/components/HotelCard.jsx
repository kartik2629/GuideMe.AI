import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";

function HotelCard({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel.hotelName,
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
        />
        <div className="my-2 mx-2 ">
          <h2 className="font-medium text-black">{hotel.hotelName}</h2>
          <div className="flex items-center gap-2">
            📍
            <h2 className="font-medium text-black"> {hotel.hotelAddress}</h2>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-2">
              💸
              <h2 className="font-small text-sm text-gray-600">
                {" "}
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
