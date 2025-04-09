import PropTypes from "prop-types";

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
                  <div key={placeIndex} className="block text-inherit">
                    <div className="hover:scale-105 transition-all cursor-pointer shadow-xl rounded-md h-full flex ">
                      <img
                        src={"/src/assets/place.jpeg"}
                        alt={place.placeName}
                        className="rounded-lg h-40 w-64 object-cover"
                      />
                      <div className="my-2 mx-2">
                        <h2 className="font-medium text-black">
                          {place.placeName}
                        </h2>
                        <p className="text-gray-600 text-sm">{place.details}</p>
                        <div className="flex flex-col gap-1 mt-2">
                          {place.address && (
                            <p className="text-gray-700">📍 {place.address}</p>
                          )}
                          {/* {place.coordinates && (
                            <p className="text-gray-700">
                              🌍 Lat: {place.coordinates.latitude}, Lng:{" "}
                              {place.coordinates.longitude}
                            </p>
                          )} */}
                          {place.ticketPricing && (
                            <p className="text-gray-700">
                              🎟 {place.ticketPricing}
                            </p>
                          )}
                          {place.travelTime && (
                            <p className="text-gray-700">
                              🕒 {place.travelTime}
                            </p>
                          )}
                          {place.bestTimeToVisit && (
                            <p className="text-gray-700">
                              ⏰ {place.bestTimeToVisit}
                            </p>
                          )}
                          {place.contact && (
                            <p className="text-gray-700">📞 {place.contact}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
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
};

export default PlacesToVisit;



// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { toast } from "sonner";
// import { db } from "@/service/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";

// // Component Imports
// import InfoSection from "../components/infoSection";
// import Hotels from "../components/Hotels";
// import Restaurent from "../components/Restaurent";
// import Activities from "../components/Activities";
// import PlacesToVisit from "../components/PlacesToVisit";

// function Viewtrip() {
//   const { tripId } = useParams();
//   const [trip, setTrip] = useState(null); // Default state to null for better error handling
  

//   useEffect(() => {
//     if (tripId) {
//       GetTripData();
//     }
//   }, [tripId]);

//   const GetTripData = async () => {
//     try {
//       const docRef = doc(db, "GuideMeAi", tripId);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         // console.log("Document Data:", docSnap.data());
//         setTrip(docSnap.data());
//       } else {
//         // console.log("No such document!");
//         toast.error("No trip found!");
//       }
//     } catch (error) {
//       console.error("Error fetching trip data:", error);
//       toast.error("Failed to load trip details. Please try again.");
//     }
//   };

//   return (
//     <div className="p-10 md:px-20 lg:px-44 xl:px-56">
//       {/* Information Section */}
//       <InfoSection trip={trip} />

//       {/* Recommended Section - Hotels */}
//       <Hotels trip={trip} />

//       {/* Daily Itinerary */}
//       <PlacesToVisit trip={trip} />

//       {/* Restaurants */}
//       <Restaurent trip={trip} />

//       {/* Activities */}
//       <Activities trip={trip} />

//       {/* Footer (if needed) */}
//     </div>
//   );
// }

// export default Viewtrip;


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
