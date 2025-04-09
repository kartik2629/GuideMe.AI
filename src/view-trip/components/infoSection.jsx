// import { GetPlaceDetails } from "@/service/GlobalAPI";
// import PropTypes from "prop-types";
// import { useEffect, useState } from "react";

// const PHOTO_REF_URL =
//   "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1080&maxWidthPx=1080&key=" +
//   import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
// function InfoSection({ trip }) {
//   const [photoUrl, setPhotoUrl] = useState(null);

//   useEffect(() => {
//     trip && GetPlacePhoto();
//   }, [trip]);

//   const GetPlacePhoto = async () => {
//     const data = {
//       textQuery: trip?.userSelection?.location,
//     };
//     await GetPlaceDetails(data).then((resp) => {
//       const PhotoUrl = PHOTO_REF_URL.replace(
//         "{NAME}",
//         resp.data.places[0].photos[3].name
//       );
//       setPhotoUrl(PhotoUrl);
//     });
//   };

//   return (
//     <div>
//       <img
//         src={photoUrl}
//         className="h-[340px] w-full object-cover rounded-xl"
//       />
//       <div className="flex justify-between items-center">
//         <div className="my-5 flex flex-col gap-2">
//           <h2 className="font-bold text-2xl">
//             {trip?.userSelection?.location}
//           </h2>
//           <div className="flex gap-5">
//             <h2 className="p-1 px-2 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
//               📅{trip?.userSelection?.numberOfDays} Days
//             </h2>
//             <h2 className="p-1 px-2 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
//               💰{trip?.userSelection?.budget}
//             </h2>
//             <h2 className="p-1 px-2 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
//               😉No. of Traveller:{trip?.userSelection?.numberOfPeople}
//             </h2>
//             <h2 className="p-1 px-2 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
//               ⌛{trip?.tripData?.tripData?.bestTimeToVisit}
//             </h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// InfoSection.propTypes = {
//   trip: PropTypes.shape({
//     userSelection: PropTypes.shape({
//       location: PropTypes.string,
//       numberOfDays: PropTypes.string,
//       budget: PropTypes.string,
//       numberOfPeople: PropTypes.string,
//     }),
//     tripData: PropTypes.shape({
//       tripData: PropTypes.shape({
//         bestTimeToVisit: PropTypes.string,
//       }),
//     }),
//   }),
// };

// export default InfoSection;

import { GetPlaceDetails } from "@/service/GlobalAPI";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1080&maxWidthPx=1080&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    if (
      !trip?.userSelection?.location?.label &&
      !trip?.userSelection?.location
    ) {
      return; // Don't make the API call if location is missing
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
        resp.data.places[0].photos.length > 3
      ) {
        const PhotoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[3].name
        );
        setPhotoUrl(PhotoUrl);
      } else {
        setPhotoUrl(null); // Handle cases where photo data is missing
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
      setPhotoUrl(null); // Handle API call errors
    }
  };

  return (
    <div>
      <img
        src={photoUrl || "/placeholder-image.jpg"} // Use a placeholder if photoUrl is null
        className="h-[340px] w-full object-cover rounded-xl"
        alt={
          trip?.userSelection?.location?.label ||
          trip?.userSelection?.location ||
          "Destination"
        }
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label ||
              trip?.userSelection?.location ||
              "Destination"}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-2 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅{trip?.userSelection?.numberOfDays || "N/A"} Days
            </h2>
            <h2 className="p-1 px-2 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰{trip?.userSelection?.budget || "N/A"}
            </h2>
            <h2 className="p-1 px-2 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              😉No. of Traveller:{trip?.userSelection?.numberOfPeople || "N/A"}
            </h2>
            <h2 className="p-1 px-2 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
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
      location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Allow string or object
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