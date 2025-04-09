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


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// Component Imports
import InfoSection from "../components/infoSection";
import Hotels from "../components/Hotels";
import Restaurent from "../components/Restaurent";
import Activities from "../components/Activities";
import PlacesToVisit from "../components/PlacesToVisit";

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, "GuideMeAi", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTrip(docSnap.data());
      } else {
        toast.error("No trip found!");
        setError("No trip found!");
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
      toast.error("Failed to load trip details. Please try again.");
      setError("Failed to load trip details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <AiOutlineLoading3Quarters className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 md:px-20 lg:px-44 xl:px-56 text-red-500">
        {error}
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="p-10 md:px-20 lg:px-44 xl:px-56">
        Loading trip details...
      </div>
    );
  }

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection trip={trip} />

      {/* Recommended Section - Hotels */}
      {trip.tripData && <Hotels trip={trip} />}

      {/* Daily Itinerary */}
      {trip.tripData && <PlacesToVisit trip={trip} />}

      {/* Restaurants */}
      {trip.tripData && <Restaurent trip={trip} />}

      {/* Activities */}
      {trip.tripData && <Activities trip={trip} />}

      {/* Footer (if needed) */}
    </div>
  );
}

export default Viewtrip;