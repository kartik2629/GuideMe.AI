// // import { useEffect, useState } from "react";
// // import { AiOutlineLoading3Quarters } from "react-icons/ai";
// // import "@/components/ui/button"; // Ensure this path is correct
// // import { Input } from "@/components/ui/input";
// // import {
// //   AI_PROMPT,
// //   SelectBudgetOption,
// //   SelectDestinationType,
// //   SelectTravelList,
// // } from "@/constants/options.jsx";
// // import { FcGoogle } from "react-icons/fc";
// // import { Button } from "@/components/ui/button";
// // import { toast } from "sonner";
// // import { chatSession } from "@/service/AIModel";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// // } from "@/components/ui/dialog";
// // import "../../public/a.css"; // Ensure this path is correct
// // import { doc, setDoc } from "firebase/firestore";
// // import { db } from "@/service/firebaseConfig";
// // import { auth, provider, signInWithPopup } from "@/service/firebaseConfig"; // Import Firebase Auth
// // import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// // import { useNavigate } from "react-router-dom";

// // function CreateTrip() {
// //   const [place, setPlace] = useState(null);
// //   const [formData, setFormData] = useState({});
// //   const navigate = useNavigate();
// //   const [openDialog, setOpenDialog] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   const handleInputChange = (name, value) => {
// //     setFormData((prevData) => ({
// //       ...prevData,
// //       [name]: value,
// //     }));
// //   };
// //   useEffect(() => {}, [formData]);

// //   const loginWithGoogle = async () => {
// //     try {
// //       const result = await signInWithPopup(auth, provider);
// //       const userData = result.user;
// //       const formattedUser = {
// //         name: userData.displayName,
// //         email: userData.email,
// //         picture: userData.photoURL,
// //       };
// //       localStorage.setItem("user", JSON.stringify(formattedUser));
// //       setOpenDialog(false);
// //       OnGenerateTrip(); // Generate trip after successful login
// //     } catch (error) {
// //       console.error("Firebase login error:", error);
// //       toast.error("Failed to sign in with Google.");
// //     }
// //   };

// //   const SaveAiTrip = async (TripData) => {
// //     setLoading(true);
// //     const user = JSON.parse(localStorage.getItem("user"));
// //     const docId = Date.now().toString();
// //     try {
// //       await setDoc(doc(db, "GuideMeAi", docId), {
// //         tripData: JSON.parse(TripData),
// //         userSelection: formData,
// //         userEmail: user?.email,
// //         id: docId,
// //       });
// //       setLoading(false);
// //       navigate(`/view-trip/${docId}`);
// //     } catch (error) {
// //       console.error("Error saving trip data:", error);
// //       toast.error("Failed to save the generated trip.");
// //       setLoading(false);
// //     }
// //   };

// //   const OnGenerateTrip = async () => {
// //     const user = localStorage.getItem("user");

// //     if (!user) {
// //       setOpenDialog(true);
// //       return;
// //     }

// //     if (
// //       !formData?.location ||
// //       !formData?.budget ||
// //       !formData?.numberOfPeople ||
// //       !formData?.destinationType ||
// //       !formData?.numberOfDays
// //     ) {
// //       toast.error("Please fill in all the travel preferences.");
// //       return;
// //     }

// //     setLoading(true);
// //     const FINAL_PROMPT = AI_PROMPT.replace(
// //       "{location}",
// //       formData?.location?.label || formData?.location
// //     )
// //       .replace("{numberOfDays}", formData?.numberOfDays)
// //       .replace("{travelType}", formData?.travelType)
// //       .replace("{budget}", formData?.budget)
// //       .replace("{numberOfPeople}", formData?.numberOfPeople)
// //       .replace("{destinationType}", formData?.destinationType)
// //       .replace("{numberOfDays}", formData?.numberOfDays)
// //       .replace("{location}", formData?.location?.label || formData?.location);

// //     try {
// //       const result = await chatSession.sendMessage(FINAL_PROMPT);
// //       setLoading(false);
// //       SaveAiTrip(result?.response?.text());
// //     } catch (error) {
// //       console.error("Error generating trip:", error);
// //       toast.error("Failed to generate trip. Please try again.");
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
// //       <h2 className="font-bold text-3xl">
// //         Tell us your travel preferences 🏕️🌴
// //       </h2>
// //       <p className="mt-3 text-gray-500 text-xl">
// //         Just provide some basic information, and our trip planner will generate
// //         customized itineraries based on your preferences
// //       </p>
// //       <div className="mt-20 flex flex-col gap-9">
// //         <div>
// //           <h2 className="text-xl my-3 font-medium">
// //             What is your destination?
// //           </h2>
// //           <GooglePlacesAutocomplete
// //             apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
// //             selectProps={{
// //               place,
// //               onChange: (v) => {
// //                 setPlace(v);
// //                 handleInputChange("location", v);
// //               },
// //             }}
// //           />
// //         </div>

// //         <div className="">
// //           <h2 className="text-xl my-3 font-medium">
// //             How many days you are planning your trip?
// //           </h2>
// //           <Input
// //             placeholder={"Ex. 3"}
// //             type="number"
// //             id="numberOfDays"
// //             className="no-spinner"
// //             onChange={(e) => handleInputChange("numberOfDays", e.target.value)}
// //           />
// //         </div>

// //         <div>
// //           <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
// //           <div className="grid grid-cols-3 justify-between gap-5 mt-5">
// //             {SelectBudgetOption.map((item, index) => (
// //               <div
// //                 key={index}
// //                 onClick={() => handleInputChange("budget", item.title)}
// //                 className={`p-4 border bg-transparent cursor-pointer rounded-lg hover:shadow-lg
// //                   ${
// //                     formData?.budget === item.title && "shadow-lg border-black"
// //                   } `}
// //               >
// //                 <h2 className="text-4xl">{item.icon}</h2>
// //                 <h2 className="font-bold text-lg">{item.title}</h2>
// //                 <h2 className="text-sm text-gray-500">{item.desc}</h2>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div>
// //           <h2 className="text-xl my-3 font-medium">
// //             Who do you plan on travelling on your next adventure?
// //           </h2>
// //           <div className="grid grid-cols-3 justify-between gap-5 mt-5 trasition-all">
// //             {SelectTravelList.map((item, index) => (
// //               <div
// //                 key={index}
// //                 onClick={() => {
// //                   handleInputChange("numberOfPeople", item.people);
// //                   handleInputChange("travelType", item.title);
// //                 }}
// //                 className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
// //                   formData?.numberOfPeople === item.people &&
// //                   "shadow-lg border-black"
// //                 }`}
// //               >
// //                 <h2 className="text-4xl">{item.icon}</h2>
// //                 <h2 className="font-bold text-lg">{item.title}</h2>
// //                 <h2 className="text-sm text-gray-400">
// //                   Persons : {item.people}
// //                 </h2>
// //                 <h2 className="text-sm text-gray-500">{item.desc}</h2>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div>
// //           <h2 className="text-xl my-3 font-medium">
// //             What type of plan do you want on your next trip?
// //           </h2>
// //           <div className="grid grid-cols-3 justify-between gap-5 mt-5 transition-all">
// //             {SelectDestinationType.map((item, index) => (
// //               <div
// //                 key={index}
// //                 onClick={() => handleInputChange("destinationType", item.title)}
// //                 className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
// //                   formData?.destinationType === item.title &&
// //                   "shadow-lg border-black"
// //                 }`}
// //               >
// //                 <h2 className="text-4xl">{item.icon}</h2>
// //                 <h2 className="font-bold text-lg">{item.title}</h2>
// //                 <h2 className="text-sm text-gray-500">{item.desc}</h2>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //       <div className="my-10 justify-center flex">
// //         <Button onClick={OnGenerateTrip} disabled={loading}>
// //           {loading ? (
// //             <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
// //           ) : (
// //             "Plan your Trip!"
// //           )}
// //         </Button>
// //       </div>
// //       <Dialog open={openDialog}>
// //         <DialogContent>
// //           <DialogHeader>
// //             <DialogDescription>
// //               <div className="flex justify-between items-center">
// //                 <img src="/guidemeai.png" alt="" className="head-logo" />
// //                 <Button
// //                   className="h-10 w-10"
// //                   onClick={() => setOpenDialog(false)}
// //                 >
// //                   X
// //                 </Button>
// //               </div>
// //               <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
// //               <p>Sign in with Google authentication securely</p>
// //               <Button
// //                 onClick={loginWithGoogle}
// //                 className="mt-5 w-full flex gap-4 items-center"
// //               >
// //                 <FcGoogle className="h-7 w-7" />
// //                 Sign In with Google
// //               </Button>
// //             </DialogDescription>
// //           </DialogHeader>
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //   );
// // }

// // export default CreateTrip;

// import { useEffect, useState } from "react";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import "@/components/ui/button"; // Ensure this path is correct
// import { Input } from "@/components/ui/input";
// import {
//   AI_PROMPT,
//   SelectBudgetOption,
//   SelectDestinationType,
//   SelectTravelList,
// } from "@/constants/options.jsx";
// import { FcGoogle } from "react-icons/fc";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { chatSession } from "@/service/AIModel";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
// } from "@/components/ui/dialog";
// import "../../public/a.css"; // Ensure this path is correct
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "@/service/firebaseConfig";
// import { auth, provider, signInWithPopup } from "@/service/firebaseConfig"; // Import Firebase Auth
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import { useNavigate } from "react-router-dom";

// function CreateTrip() {
//   const [place, setPlace] = useState(null);
//   const [formData, setFormData] = useState({});
//   const navigate = useNavigate();
//   const [openDialog, setOpenDialog] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (name, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   useEffect(() => {}, [formData]);

//   const loginWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const userData = result.user;
//       const formattedUser = {
//         name: userData.displayName,
//         email: userData.email,
//         picture: userData.photoURL,
//       };
//       localStorage.setItem("user", JSON.stringify(formattedUser));
//       setOpenDialog(false);
//       OnGenerateTrip(); // Generate trip after successful login
//     } catch (error) {
//       console.error("Firebase login error:", error);
//       toast.error("Failed to sign in with Google.");
//     }
//   };

//   const SaveAiTrip = async (TripData) => {
//     setLoading(true);
//     const user = JSON.parse(localStorage.getItem("user"));
//     const docId = Date.now().toString();
//     try {
//       await setDoc(doc(db, "GuideMeAi", docId), {
//         tripData: JSON.parse(TripData),
//         userSelection: formData,
//         userEmail: user?.email,
//         id: docId,
//       });
//       setLoading(false);
//       navigate(`/view-trip/${docId}`);
//     } catch (error) {
//       console.error("Error saving trip data:", error);
//       toast.error("Failed to save the generated trip.");
//       setLoading(false);
//     }
//   };

//   const OnGenerateTrip = async () => {
//     const user = localStorage.getItem("user");

//     if (!user) {
//       setOpenDialog(true);
//       return;
//     }

//     if (
//       !formData?.location?.label || // Ensure location has a label
//       !formData?.budget ||
//       !formData?.numberOfPeople ||
//       !formData?.destinationType ||
//       !formData?.numberOfDays
//     ) {
//       toast.error("Please fill in all the travel preferences.");
//       return;
//     }

//     setLoading(true);
//     const FINAL_PROMPT = AI_PROMPT.replace(
//       "{location}",
//       formData?.location?.label // Use the label for the AI prompt
//     )
//       .replace("{numberOfDays}", formData?.numberOfDays)
//       .replace("{travelType}", formData?.travelType)
//       .replace("{budget}", formData?.budget)
//       .replace("{numberOfPeople}", formData?.numberOfPeople)
//       .replace("{destinationType}", formData?.destinationType)
//       .replace("{numberOfDays}", formData?.numberOfDays)
//       .replace("{location}", formData?.location?.label); // Use the label here as well

//     try {
//       const result = await chatSession.sendMessage(FINAL_PROMPT);
//       setLoading(false);
//       SaveAiTrip(result?.response?.text());
//     } catch (error) {
//       console.error("Error generating trip:", error);
//       toast.error("Failed to generate trip. Please try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
//       <h2 className="font-bold text-3xl">
//         Tell us your travel preferences 🏕️🌴
//       </h2>
//       <p className="mt-3 text-gray-500 text-xl">
//         Just provide some basic information, and our trip planner will generate
//         customized itineraries based on your preferences
//       </p>
//       <div className="mt-20 flex flex-col gap-9">
//         <div>
//           <h2 className="text-xl my-3 font-medium">
//             What is your destination?
//           </h2>
//           <GooglePlacesAutocomplete
//             apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//             selectProps={{
//               place,
//               onChange: (v) => {
//                 setPlace(v);
//                 handleInputChange("location", v); // Store the entire object for now
//               },
//             }}
//           />
//         </div>

//         <div className="">
//           <h2 className="text-xl my-3 font-medium">
//             How many days you are planning your trip?
//           </h2>
//           <Input
//             placeholder={"Ex. 3"}
//             type="number"
//             id="numberOfDays"
//             className="no-spinner"
//             onChange={(e) => handleInputChange("numberOfDays", e.target.value)}
//           />
//         </div>

//         <div>
//           <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
//           <div className="grid grid-cols-3 justify-between gap-5 mt-5">
//             {SelectBudgetOption.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleInputChange("budget", item.title)}
//                 className={`p-4 border bg-transparent cursor-pointer rounded-lg hover:shadow-lg
//                   ${
//                     formData?.budget === item.title && "shadow-lg border-black"
//                   } `}
//               >
//                 <h2 className="text-4xl">{item.icon}</h2>
//                 <h2 className="font-bold text-lg">{item.title}</h2>
//                 <h2 className="text-sm text-gray-500">{item.desc}</h2>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h2 className="text-xl my-3 font-medium">
//             Who do you plan on travelling on your next adventure?
//           </h2>
//           <div className="grid grid-cols-3 justify-between gap-5 mt-5 trasition-all">
//             {SelectTravelList.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => {
//                   handleInputChange("numberOfPeople", item.people);
//                   handleInputChange("travelType", item.title);
//                 }}
//                 className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
//                   formData?.numberOfPeople === item.people &&
//                   "shadow-lg border-black"
//                 }`}
//               >
//                 <h2 className="text-4xl">{item.icon}</h2>
//                 <h2 className="font-bold text-lg">{item.title}</h2>
//                 <h2 className="text-sm text-gray-400">
//                   Persons : {item.people}
//                 </h2>
//                 <h2 className="text-sm text-gray-500">{item.desc}</h2>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h2 className="text-xl my-3 font-medium">
//             What type of plan do you want on your next trip?
//           </h2>
//           <div className="grid grid-cols-3 justify-between gap-5 mt-5 transition-all">
//             {SelectDestinationType.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleInputChange("destinationType", item.title)}
//                 className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
//                   formData?.destinationType === item.title &&
//                   "shadow-lg border-black"
//                 }`}
//               >
//                 <h2 className="text-4xl">{item.icon}</h2>
//                 <h2 className="font-bold text-lg">{item.title}</h2>
//                 <h2 className="text-sm text-gray-500">{item.desc}</h2>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="my-10 justify-center flex">
//         <Button onClick={OnGenerateTrip} disabled={loading}>
//           {loading ? (
//             <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
//           ) : (
//             "Plan your Trip!"
//           )}
//         </Button>
//       </div>
//       <Dialog open={openDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogDescription>
//               <div className="flex justify-between items-center">
//                 <img src="/guidemeai.png" alt="" className="head-logo" />
//                 <Button
//                   className="h-10 w-10"
//                   onClick={() => setOpenDialog(false)}
//                 >
//                   X
//                 </Button>
//               </div>
//               <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
//               <p>Sign in with Google authentication securely</p>
//               <Button
//                 onClick={loginWithGoogle}
//                 className="mt-5 w-full flex gap-4 items-center"
//               >
//                 <FcGoogle className="h-7 w-7" />
//                 Sign In with Google
//               </Button>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default CreateTrip;

import { useEffect, useState, useRef } from "react"; // Added useRef
import { AiOutlineLoading3Quarters } from "react-icons/ai";
// Removed unused import: import "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOption,
  SelectDestinationType,
  SelectTravelList,
} from "@/constants/options.jsx";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import "../../public/a.css"; // Ensure this path is correct
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { auth, provider, signInWithPopup } from "@/service/firebaseConfig"; // Import Firebase Auth
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const topRef = useRef(null); // Optional: Ref for more precise scrolling if needed, but window.scrollTo is simpler here

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Removed empty useEffect, not needed
  // useEffect(() => {}, [formData]);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = result.user;
      const formattedUser = {
        name: userData.displayName,
        email: userData.email,
        picture: userData.photoURL,
      };
      localStorage.setItem("user", JSON.stringify(formattedUser));
      setOpenDialog(false);
      await OnGenerateTrip(); // Generate trip after successful login - added await
    } catch (error) {
      console.error("Firebase login error:", error);
      toast.error("Failed to sign in with Google.");
      // Ensure loading is false if login fails during trip generation attempt
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    // setLoading(true) is already set in OnGenerateTrip, no need to set again unless specifically for saving
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    try {
      // Attempt to parse the TripData first to catch potential JSON errors early
      const parsedTripData = JSON.parse(TripData);

      await setDoc(doc(db, "GuideMeAi", docId), {
        tripData: parsedTripData, // Use the parsed data
        userSelection: formData,
        userEmail: user?.email,
        id: docId,
      });
      // Keep setLoading(false) here if you want the generating message to disappear *after* saving
      // setLoading(false);
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      console.error("Error parsing or saving trip data:", error);
      toast.error(
        "Failed to save the generated trip. The format might be invalid."
      );
      setLoading(false); // Ensure loading stops on error
    }
    // It's generally better to set loading false *after* navigation or in a finally block if needed elsewhere
    // setLoading(false); moved below try/catch for clarity or handled within try/catch
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return; // Stop execution if user is not logged in
    }

    // Validation Check
    if (
      !formData?.location?.label || // Ensure location object and its label exist
      !formData?.budget ||
      !formData?.numberOfPeople ||
      !formData?.destinationType ||
      !formData?.numberOfDays
    ) {
      toast.error("Please fill in all the travel preferences.");
      return; // Stop execution if validation fails
    }

    // --- Modifications Start ---
    // 1. Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // 2. Set loading state (which will show the "Generating..." message)
    setLoading(true);
    // --- Modifications End ---

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData.location.label // Use the label directly
    )
      .replace("{numberOfDays}", formData.numberOfDays)
      .replace("{travelType}", formData.travelType)
      .replace("{budget}", formData.budget)
      .replace("{numberOfPeople}", formData.numberOfPeople)
      .replace("{destinationType}", formData.destinationType);
    // No need to replace {numberOfDays} and {location} twice

    console.log("Sending Prompt:", FINAL_PROMPT); // Good for debugging

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const aiResponseText = result?.response?.text();

      if (!aiResponseText) {
        throw new Error("Received empty response from AI.");
      }

      console.log("AI Response received"); // Debug log
      // setLoading(false); // Move setLoading(false) to after SaveAiTrip or inside it
      await SaveAiTrip(aiResponseText); // Wait for saving to complete
    } catch (error) {
      console.error("Error generating or processing trip:", error);
      toast.error(
        `Failed to generate trip: ${error.message || "Please try again."}`
      );
      setLoading(false); // Ensure loading stops on error
    }
  };

  return (
    // ref={topRef} // Optional ref added to the main div if needed
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        customized itineraries based on your preferences
      </p>

      {/* --- New Loading Message Block --- */}
      {loading && (
        <div className="text-center my-10 p-5 border rounded-lg shadow-lg bg-white">
          <AiOutlineLoading3Quarters className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-xl font-semibold text-blue-600 ">
            Generating itinerary... Please wait.
          </p>
          <p className="text-gray-500 mt-2">This may take a moment.</p>
        </div>
      )}
      {/* --- End New Loading Message Block --- */}

      {/* Form sections - kept collapsible for readability, no functional change */}
      <div
        className={`mt-10 flex flex-col gap-9 ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {" "}
        {/* Optionally disable form while loading */}
        {/* Destination */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v); // Keep track of the selected place object
                handleInputChange("location", v); // Store the entire object { label: '...', value: {...} }
              },
              placeholder: "Search for a city or place...",
              styles: {
                // Optional: Add some basic styling
                control: (provided) => ({
                  ...provided,
                  borderRadius: "0.5rem", // Match other inputs/buttons
                  borderColor: "#d1d5db", // gray-300
                }),
                input: (provided) => ({
                  ...provided,
                  color: "#1f2937", // gray-800
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected
                    ? "#3b82f6"
                    : state.isFocused
                    ? "#eff6ff"
                    : "white", // blue-500, blue-50
                  color: state.isSelected ? "white" : "#1f2937",
                }),
              },
            }}
          />
          {/* Debugging: Show selected location label */}
          {/* {formData.location && <p className="text-sm mt-1 text-gray-600">Selected: {formData.location.label}</p>} */}
        </div>
        {/* Number of Days */}
        <div className="">
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex. 3"}
            type="number"
            min="1" // Add min validation
            id="numberOfDays"
            className="no-spinner" // Ensure your CSS for no-spinner is working
            value={formData.numberOfDays || ""} // Control the input value
            onChange={(e) => handleInputChange("numberOfDays", e.target.value)}
          />
        </div>
        {/* Budget */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 justify-between gap-5 mt-5">
            {" "}
            {/* Responsive columns */}
            {SelectBudgetOption.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border bg-transparent cursor-pointer rounded-lg hover:shadow-lg transition-shadow duration-200
                  ${
                    formData?.budget === item.title
                      ? "shadow-lg border-black ring-2 ring-black" // Enhanced selection style
                      : "border-gray-300"
                  } `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg mt-1">{item.title}</h2>
                <h2 className="text-sm text-gray-500 mt-1">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        {/* Travel Companions */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on travelling with?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 justify-between gap-5 mt-5">
            {" "}
            {/* Responsive columns */}
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  handleInputChange("numberOfPeople", item.people);
                  handleInputChange("travelType", item.title); // Also update travelType based on selection
                }}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition-shadow duration-200 ${
                  formData?.numberOfPeople === item.people // Check against numberOfPeople for consistency
                    ? "shadow-lg border-black ring-2 ring-black" // Enhanced selection style
                    : "border-gray-300"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg mt-1">{item.title}</h2>
                <h2 className="text-sm text-gray-500 mt-1">
                  {item.desc} ({item.people})
                </h2>
              </div>
            ))}
          </div>
        </div>
        {/* Destination Type */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            What type of activities or vibe are you looking for?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 justify-between gap-5 mt-5">
            {" "}
            {/* Responsive columns */}
            {SelectDestinationType.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("destinationType", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition-shadow duration-200 ${
                  formData?.destinationType === item.title
                    ? "shadow-lg border-black ring-2 ring-black" // Enhanced selection style
                    : "border-gray-300"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg mt-1">{item.title}</h2>
                <h2 className="text-sm text-gray-500 mt-1">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="my-10 justify-center flex">
        {/* Button is disabled by the 'loading' state already */}
        <Button
          onClick={OnGenerateTrip}
          disabled={loading}
          size="lg"
          className="w-full sm:w-auto"
        >
          {loading ? (
            <>
              <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin mr-2" />
              Generating... {/* Changed text while loading */}
            </>
          ) : (
            "Plan your Trip!"
          )}
        </Button>
      </div>

      {/* Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {" "}
        {/* Allow closing dialog by clicking outside */}
        <DialogContent>
          <DialogHeader>
            {/* Dialog Title moved inside DialogHeader for better structure */}
            {/* <DialogTitle>Sign In Required</DialogTitle>  */}
            <DialogDescription>
              <div className="flex justify-between items-center mb-4">
                <img
                  src="/guidemeai.png"
                  alt="GuideMe AI Logo"
                  className="h-8 w-auto"
                />{" "}
                {/* Adjusted size */}
                {/* Close button can be handled by shadcn Dialog's default */}
                {/* <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpenDialog(false)}> X </Button> */}
              </div>
              <h2 className="font-bold text-lg mt-5 text-center">
                Sign In With Google
              </h2>
              <p className="text-center text-gray-600 mb-5">
                Please sign in to generate and save your trip itinerary.
              </p>
              <Button
                onClick={loginWithGoogle}
                className="w-full flex gap-4 items-center justify-center" // Centered content
                variant="outline" // Optional: Style preference
              >
                <FcGoogle className="h-6 w-6" /> {/* Adjusted size */}
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;