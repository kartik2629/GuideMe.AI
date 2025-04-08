import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  SelectBudgetOption,
  SelectDestinationType,
  SelectTravelList,
} from "@/constants/options";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itineraries based on your preferences
      </p>
      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v.label);
              },
            }}
          />
        </div>
        <div className="">
          <h2 className="text-xl my-3 font-medium">
            How many days you are planning your trip?
          </h2>
          <Input
            placeholder={"Ex. 3"}
            type="number"
            onChange={(e) => handleInputChange("numberOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-3 justify-between gap-5 mt-5">
            {SelectBudgetOption.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border bg-transparent cursor-pointer rounded-lg hover:shadow-lg
                          ${
                            formData?.budget == item.title &&
                            "shadow-lg border-black"
                          } `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-xl my-3 font-medium">
              Who do you plan on travelling on your next adventure?
            </h2>
            <div className="grid grid-cols-3 justify-between gap-5 mt-5">
              {SelectTravelList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleInputChange("numberOfPeople", item.people);
                    handleInputChange("travelType", item.title);
                  }}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                    formData?.numberOfPeople == item.people &&
                    "shadow-lg border-black"
                  }`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-400">
                    Persons : {item.people}
                  </h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">
              Who do you plan on travelling on your next adventure?
            </h2>
            <div className="grid grid-cols-3 justify-between gap-5 mt-5">
              {SelectDestinationType.map((item, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleInputChange("destinationType", item.title)
                  }
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                    formData?.destinationType == item.title &&
                    "shadow-lg border-black"
                  }`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="my-10 justify-center flex">
          <Button onClick={OnGenerateTrip} disabled={loading}>
            {loading ? (
              <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
            ) : (
              "Plan your Trip!"
            )}
          </Button>
        </div>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="guidemeai.png" alt="" className="head-logo" />
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <p>Sign in with google authentication securely</p>
                <Button
                  onClick={login}
                  className="mt-5 w-full flex gap-4 items-center"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign In with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}
      </div>
    </div>
  );
}

export default CreateTrip;




//UserTripCardItem.jsx

// import { GetPlaceDetails } from "@/service/GlobalAPI";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { doc, deleteDoc } from "firebase/firestore";
// import { db } from "@/service/firebaseConfig";
// import PropTypes from "prop-types";
// import { FaTrash } from "react-icons/fa";

// function UserTripCardItem({ trip, onDelete }) {
//   const [photoUrl, setPhotoUrl] = useState();

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
//         const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoRef);
//         setPhotoUrl(photoUrl);
//       } else {
//         console.error("No photo found for the given location.");
//       }
//     } catch (error) {
//       console.error("Error fetching place photo:", error);
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

//   return (
//     <div className="rounded-xl shadow-md overflow-hidden border border-gray-200 hover:scale-105 transform transition-all duration-300">
//       <Link
//         to={`/view-trip/${trip?.id}`}
//         className="text-black hover:text-black"
//       >
//         <img
//           src={photoUrl}
//           className="w-full h-[200px] object-cover rounded-t-xl"
//           alt={trip?.userSelection?.location}
//         />
//       </Link>
//       <div className="p-3">
//         <h2 className="font-bold text-lg">{trip?.userSelection?.location}</h2>
//         <h2 className="text-sm text-gray-600">
//           {trip?.userSelection?.numberOfDays} Days trip with{" "}
//           {trip?.userSelection?.budget} Budget
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




//mytrip/index.jsx
// // import { db } from "@/service/firebaseConfig";
// // import { collection, getDocs, query, where } from "firebase/firestore";
// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import UserTripCardItem from "./components/UserTripCardItem";

// // function MyTrips() {
// //   const [userTrips, setUserTrips] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     GetUserTrip();
// //   }, []);

// //   const GetUserTrip = async () => {
// //     const user = JSON.parse(localStorage.getItem("user"));

// //     if (!user) {
// //       navigate("/");
// //       return;
// //     }

// //     const q = query(
// //       collection(db, "GuideMeAi"),
// //       where("userEmail", "==", user?.email)
// //     );
// //     const querySnapshot = await getDocs(q);

// //     const trips = querySnapshot.docs.map((doc) => ({
// //       id: doc.id,
// //       ...doc.data(),
// //     }));
// //     setUserTrips(trips);
// //   };

// //   const handleDeleteTrip = async () => {
// //     window.location.reload();
// //   };

// //   return (
// //     <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
// //       <h2 className="font-bold text-3xl">My Trips</h2>

// //       {userTrips.length === 0 ? (
// //         <p className="text-gray-500 mt-5 text-center">
// //           No itineraries created yet.
// //         </p>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
// //           {userTrips.map((trip) => (
// //             <UserTripCardItem
// //               key={trip.id}
// //               trip={trip}
// //               onDelete={handleDeleteTrip} 
// //             />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default MyTrips;


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

//     try {
//       const q = query(
//         collection(db, "GuideMeAi"),
//         where("userEmail", "==", user?.email)
//       );
//       const querySnapshot = await getDocs(q);

//       const trips = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setUserTrips(trips);
//     } catch (error) {
//       console.error("Error fetching trips:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteTrip = async () => {
//     window.location.reload();
//   };

//   return (
//     <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
//       <h2 className="font-bold text-3xl">My Trips</h2>

//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
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