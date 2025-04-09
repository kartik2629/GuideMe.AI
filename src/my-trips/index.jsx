// import { db } from "@/service/firebaseConfig";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UserTripCardItem from "./components/UserTripCardItem";

// function MyTrips() {
//   const [userTrips, setUserTrips] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     GetUserTrip();
//   }, []);

//   const GetUserTrip = async () => {
//     const user = JSON.parse(localStorage.getItem("user"));

//     if (!user) {
//       navigate("/");
//       return;
//     }

//     const q = query(
//       collection(db, "GuideMeAi"),
//       where("userEmail", "==", user?.email)
//     );
//     const querySnapshot = await getDocs(q);

//     const trips = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     setUserTrips(trips);
//     setLoading(false);
//   };

//   const handleDeleteTrip = async () => {
//     window.location.reload();
//   };

//   return (
//     <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
//       <h2 className="font-bold text-3xl">My Trips</h2>

//       {loading ? (
//         <div className="flex flex-col items-center mt-10">
//           <div className="flex space-x-2 mb-8">
//             <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
//             <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
//             <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
//             {[...Array(6)].map((_, index) => (
//               <div
//                 key={index}
//                 className="h-48 rounded-lg bg-gray-200 animate-pulse"
//               ></div>
//             ))}
//           </div>
//         </div>
//       ) : userTrips.length === 0 ? (
//         <p className="text-gray-500 mt-5 text-center">
//           No itineraries created yet.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
//           {userTrips.map((trip) => (
//             <UserTripCardItem
//               key={trip.id}
//               trip={trip}
//               onDelete={handleDeleteTrip}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default MyTrips;


import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    GetUserTrip();
  }, []);

  const GetUserTrip = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "GuideMeAi"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);

    const trips = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setUserTrips(trips);
    setLoading(false);
  };

  const handleDeleteTrip = async (deletedTripId) => {
    setUserTrips((prevTrips) =>
      prevTrips.filter((trip) => trip.id !== deletedTripId)
    );
    // Optionally, you might want to show a success toast here
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>

      {loading ? (
        <div className="flex flex-col items-center mt-10">
          <div className="flex space-x-2 mb-8">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-48 rounded-lg bg-gray-200 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      ) : userTrips.length === 0 ? (
        <p className="text-gray-500 mt-5 text-center">
          No itineraries created yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {userTrips.map((trip) => (
            <UserTripCardItem
              key={trip.id}
              trip={trip}
              onDelete={handleDeleteTrip}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTrips;