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

import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOption,
  SelectDestinationType,
  SelectTravelList,
} from "@/constants/options.jsx";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import "../../public/a.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { auth, provider, signInWithPopup } from "@/service/firebaseConfig";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
      OnGenerateTrip();
    } catch (error) {
      console.error("Firebase login error:", error);
      toast.error("Failed to sign in with Google.");
    }
  };

  const SaveAiTrip = async (TripData, docId, toastId) => {
    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await setDoc(doc(db, "GuideMeAi", docId), {
        tripData: JSON.parse(TripData),
        userSelection: formData,
        userEmail: user?.email,
        id: docId,
      });
      toast.success("Itinerary saved successfully!", { id: toastId });
      setLoading(false);
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      console.error("Error saving trip data:", error);
      if (error instanceof SyntaxError) {
        toast.error("Failed to process AI response. Please try again.", {
          id: toastId,
        });
      } else {
        toast.error("Failed to save the generated trip.", { id: toastId });
      }
      setLoading(false);
    }
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.location?.label ||
      !formData?.budget ||
      !formData?.numberOfPeople ||
      !formData?.destinationType ||
      !formData?.numberOfDays
    ) {
      toast.error("Please fill in all the travel preferences.");
      return;
    }

    setLoading(true);
    const locationName = formData.location.label;

    window.scrollTo({ top: 0, behavior: "smooth" });

    const toastId = toast.loading(
      `Generating itinerary for ${locationName}...`
    );

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", locationName)
      .replace("{numberOfDays}", formData?.numberOfDays)
      .replace("{travelType}", formData?.travelType)
      .replace("{budget}", formData?.budget)
      .replace("{numberOfPeople}", formData?.numberOfPeople)
      .replace("{destinationType}", formData?.destinationType);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const aiResponseText = result?.response?.text();

      if (!aiResponseText) {
        throw new Error("Empty response from AI.");
      }

      const docId = Date.now().toString();
      SaveAiTrip(aiResponseText, docId, toastId);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error(
        `Failed to generate trip: ${error.message || "Please try again."}`,
        { id: toastId }
      );
      setLoading(false);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        customized itineraries based on your preferences
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
                handleInputChange("location", v);
              },
              styles: {
                control: (provided) => ({
                  ...provided,
                  borderRadius: "0.375rem",
                  borderColor: "#d1d5db",
                }),
              },
            }}
          />
          {formData?.location?.label && (
            <p className="text-sm text-gray-600 mt-1">
              Selected: {formData.location.label}
            </p>
          )}
        </div>

        <div className="">
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex. 3"}
            type="number"
            min="1"
            id="numberOfDays"
            className="no-spinner"
            onChange={(e) => handleInputChange("numberOfDays", e.target.value)}
            value={formData.numberOfDays || ""}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 justify-between gap-5 mt-5">
            {SelectBudgetOption.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border bg-transparent cursor-pointer rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out
                   ${
                     formData?.budget === item.title
                       ? "shadow-lg border-black ring-1 ring-black"
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

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on travelling with?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 justify-between gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  handleInputChange("numberOfPeople", item.people);
                  handleInputChange("travelType", item.title);
                }}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out ${
                  formData?.numberOfPeople === item.people
                    ? "shadow-lg border-black ring-1 ring-black"
                    : "border-gray-300"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg mt-1">{item.title}</h2>
                <h2 className="text-sm text-gray-400 mt-1">
                  Persons: {item.people}
                </h2>
                <h2 className="text-sm text-gray-500 mt-1">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            What type of destination do you prefer?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 justify-between gap-5 mt-5">
            {SelectDestinationType.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("destinationType", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out ${
                  formData?.destinationType === item.title
                    ? "shadow-lg border-black ring-1 ring-black"
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
      <div className="my-10 justify-center flex">
        <Button onClick={OnGenerateTrip} disabled={loading} size="lg">
          {loading ? (
            <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
          ) : (
            "Plan your Trip!"
          )}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription asChild>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <img
                    src="/guidemeai.png"
                    alt="GuideMe AI Logo"
                    className="head-logo w-32 h-auto"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => setOpenDialog(false)}
                  >
                    X<span className="sr-only">Close</span>
                  </Button>
                </div>
                <h2 className="font-bold text-lg mt-4">Sign In With Google</h2>
                <p className="text-sm text-gray-600">
                  Sign in securely to save and view your trips.
                </p>
                <Button
                  onClick={loginWithGoogle}
                  className="mt-5 w-full flex gap-3 items-center justify-center"
                >
                  <FcGoogle className="h-6 w-6" />
                  Sign In with Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
