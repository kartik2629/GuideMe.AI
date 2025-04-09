// // import { GetPlaceDetails } from "@/service/GlobalAPI";
// // import { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { doc, deleteDoc } from "firebase/firestore";
// // import { db } from "@/service/firebaseConfig";
// // import PropTypes from "prop-types";
// // import { FaTrash } from "react-icons/fa";

// // function UserTripCardItem({ trip, onDelete }) {
// //   const [photoUrl, setPhotoUrl] = useState();
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (trip) {
// //       GetPlacePhoto();
// //     }
// //   }, [trip]);

// //   const GetPlacePhoto = async () => {
// //     try {
// //       const PHOTO_REF_URL =
// //         "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=720&maxWidthPx=1080&key=" +
// //         import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

// //       const data = {
// //         textQuery: trip?.userSelection?.location,
// //       };
// //       const result = await GetPlaceDetails(data);

// //       if (
// //         result?.data?.places?.length > 0 &&
// //         result.data.places[0].photos?.length > 0
// //       ) {
// //         const photoRef = result.data.places[0].photos[1].name;
// //         const url = PHOTO_REF_URL.replace("{NAME}", photoRef);
// //         setPhotoUrl(url);
// //       } else {
// //         console.error("No photo found for the given location.");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching place photo:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async () => {
// //     if (window.confirm("Are you sure you want to delete this trip?")) {
// //       try {
// //         await deleteDoc(doc(db, "GuideMeAi", trip.id));
// //         onDelete(trip.id);
// //       } catch (error) {
// //         console.error("Error deleting trip:", error);
// //       }
// //     }
// //   };

// //   return (
// //     <div className="rounded-xl shadow-md overflow-hidden border border-gray-200 hover:scale-105 transform transition-all duration-300 relative">
// //       <Link
// //         to={`/view-trip/${trip?.id}`}
// //         className="text-black hover:text-black"
// //       >
// //         {loading ? (
// //           <div className="w-full h-[200px] bg-gray-200 animate-pulse rounded-t-xl" />
// //         ) : (
// //           <img
// //             src={photoUrl}
// //             onLoad={() => setLoading(false)}
// //             className="w-full h-[200px] object-cover rounded-t-xl"
// //             alt={trip?.userSelection?.location}
// //           />
// //         )}
// //       </Link>
// //       <div className="p-3">
// //         <h2 className="font-bold text-lg">{trip?.userSelection?.location}</h2>
// //         <h2 className="text-sm text-gray-600">
// //           {trip?.userSelection?.numberOfDays} Days trip with{" "}
// //           {trip?.userSelection?.budget} Budget
// //         </h2>
// //         <button
// //           onClick={handleDelete}
// //           className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition"
// //         >
// //           <FaTrash />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // UserTripCardItem.propTypes = {
// //   trip: PropTypes.shape({
// //     id: PropTypes.string.isRequired,
// //     userSelection: PropTypes.shape({
// //       location: PropTypes.string,
// //       numberOfDays: PropTypes.string,
// //       budget: PropTypes.string,
// //     }),
// //   }).isRequired,
// //   onDelete: PropTypes.func.isRequired,
// // };

// // export default UserTripCardItem;

// import { GetPlaceDetails } from "@/service/GlobalAPI";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { doc, deleteDoc } from "firebase/firestore";
// import { db } from "@/service/firebaseConfig";
// import PropTypes from "prop-types";
// import { FaTrash } from "react-icons/fa";

// function UserTripCardItem({ trip, onDelete }) {
//   const [photoUrl, setPhotoUrl] = useState();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (trip) {
//       GetPlacePhoto();
//     }
//   }, [trip]);

//   const GetPlacePhoto = async () => {
//     try {
//       const PHOTO_REF_URL =
//         "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=720&maxWidthPx=1080&key=" +
//         import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

//       const data = {
//         textQuery: trip?.userSelection?.location,
//       };
//       const result = await GetPlaceDetails(data);

//       if (
//         result?.data?.places?.length > 0 &&
//         result.data.places[0].photos?.length > 0
//       ) {
//         const photoRef = result.data.places[0].photos[1].name;
//         const url = PHOTO_REF_URL.replace("{NAME}", photoRef);
//         setPhotoUrl(url);
//       } else {
//         console.error("No photo found for the given location.");
//       }
//     } catch (error) {
//       console.error("Error fetching place photo:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete this trip?")) {
//       try {
//         await deleteDoc(doc(db, "GuideMeAi", trip.id));
//         onDelete(trip.id);
//       } catch (error) {
//         console.error("Error deleting trip:", error);
//       }
//     }
//   };

//   const getTextOrLabel = (item) => {
//     if (typeof item === "object" && item !== null && "label" in item) {
//       return item.label;
//     }
//     return item;
//   };

//   return (
//     <div className="rounded-xl shadow-md overflow-hidden border border-gray-200 hover:scale-105 transform transition-all duration-300 relative">
//       <Link
//         to={`/view-trip/${trip?.id}`}
//         className="text-black hover:text-black"
//       >
//         {loading ? (
//           <div className="w-full h-[200px] bg-gray-200 animate-pulse rounded-t-xl" />
//         ) : (
//           <img
//             src={photoUrl}
//             onLoad={() => setLoading(false)}
//             className="w-full h-[200px] object-cover rounded-t-xl"
//             alt={getTextOrLabel(trip?.userSelection?.location)}
//           />
//         )}
//       </Link>
//       <div className="p-3">
//         <h2 className="font-bold text-lg">
//           {getTextOrLabel(trip?.userSelection?.location)}
//         </h2>
//         <h2 className="text-sm text-gray-600">
//           {getTextOrLabel(trip?.userSelection?.numberOfDays)} Days trip with{" "}
//           {getTextOrLabel(trip?.userSelection?.budget)} Budget
//         </h2>
//         <button
//           onClick={handleDelete}
//           className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition"
//         >
//           <FaTrash />
//         </button>
//       </div>
//     </div>
//   );
// }

// UserTripCardItem.propTypes = {
//   trip: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     userSelection: PropTypes.shape({
//       location: PropTypes.string,
//       numberOfDays: PropTypes.string,
//       budget: PropTypes.string,
//     }),
//   }).isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

// export default UserTripCardItem;

import { GetPlaceDetails } from "@/service/GlobalAPI";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";

function UserTripCardItem({ trip, onDelete }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const PHOTO_REF_URL =
        "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=720&maxWidthPx=1080&key=" +
        import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

      const locationQuery =
        typeof trip?.userSelection?.location === "object" &&
        trip?.userSelection?.location !== null &&
        trip?.userSelection?.location &&
        typeof trip.userSelection.location === "object" &&
        "label" in trip.userSelection.location
          ? trip.userSelection.location.label
          : trip?.userSelection?.location;

      if (!locationQuery) {
        console.error("Location is missing for fetching photo.");
        setLoading(false);
        return;
      }

      const data = {
        textQuery: locationQuery,
      };
      const result = await GetPlaceDetails(data);

      if (
        result?.data?.places?.length > 0 &&
        result.data.places[0].photos?.length > 0
      ) {
        const photoRef = result.data.places[0].photos[1].name;
        const url = PHOTO_REF_URL.replace("{NAME}", photoRef);
        setPhotoUrl(url);
      } else {
        console.error("No photo found for the given location.");
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        await deleteDoc(doc(db, "GuideMeAi", trip.id));
        onDelete(trip.id);
      } catch (error) {
        console.error("Error deleting trip:", error);
      }
    }
  };

  const getTextOrLabel = (item) => {
    if (typeof item === "object" && item !== null && "label" in item) {
      return item.label;
    }
    return item;
  };

  return (
    <div className="rounded-xl shadow-md overflow-hidden border border-gray-200 hover:scale-105 transform transition-all duration-300 relative">
      <Link
        to={`/view-trip/${trip?.id}`}
        className="text-black hover:text-black"
      >
        {loading ? (
          <div className="w-full h-[200px] bg-gray-200 animate-pulse rounded-t-xl" />
        ) : (
          <img
            src={photoUrl || "/placeholder-image.jpg"} // Added placeholder
            onLoad={() => setLoading(false)}
            className="w-full h-[200px] object-cover rounded-t-xl"
            alt={getTextOrLabel(trip?.userSelection?.location) || "Destination"} // Added default alt
          />
        )}
      </Link>
      <div className="p-3">
        <h2 className="font-bold text-lg">
          {getTextOrLabel(trip?.userSelection?.location) || "Destination"}
        </h2>
        <h2 className="text-sm text-gray-600">
          {getTextOrLabel(trip?.userSelection?.numberOfDays) || "N/A"} Days trip
          with {getTextOrLabel(trip?.userSelection?.budget) || "N/A"} Budget
        </h2>
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

UserTripCardItem.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userSelection: PropTypes.shape({
      location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Updated propType
      numberOfDays: PropTypes.string,
      budget: PropTypes.string,
    }),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserTripCardItem;
