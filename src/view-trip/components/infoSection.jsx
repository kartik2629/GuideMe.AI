import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaShareSquare } from "react-icons/fa";


function InfoSection({ trip }) {

  const [photoUrl,setPhotoUrl] = useState();

  // useEffect(() => {
  //   trip && GetPlacePhoto();
  // }, [trip]);
  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);



  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location,
      };
      const result = await GetPlaceDetails(data);

      if (
        result?.data?.places?.length > 0 &&
        result.data.places[0].photos?.length > 0
      ) {
        const photoRef = result.data.places[0].photos[0].name;
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoRef);
        setPhotoUrl(photoUrl);
      } else {
        console.error("No photo found for the given location.");
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };


  return (
    <div>
      <img
        src={photoUrl}
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-2 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅{trip?.userSelection?.numberOfDays} Days
            </h2>
            <h2 className="p-1 px-2 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰{trip?.userSelection?.budget}
            </h2>
            <h2 className="p-1 px-2 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              😉No. of Traveller:{trip?.userSelection?.numberOfPeople}
            </h2>
            <h2 className="p-1 px-2 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              ⌛{trip?.tripData?.tripData?.bestTimeToVisit}
            </h2>
          </div>
        </div>
        <Button>
          <FaShareSquare />
        </Button>
      </div>
    </div>
  );
}

InfoSection.propTypes = {
  trip: PropTypes.shape({
    userSelection: PropTypes.shape({
      location: PropTypes.string,
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
