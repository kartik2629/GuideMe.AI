import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./../components/ui/button";
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
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import "./../../public/a.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function CreateTrip() {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {}, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "GuideMeAi", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.location ||
      !formData?.budget ||
      !formData?.numberOfPeople ||
      !formData?.destinationType ||
      !formData?.numberOfDays
    ) {
      toast("Please fill all the fields", "error");

      return;
    }
    console.log(formData);
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{numberOfDays}", formData?.numberOfDays)
      .replace("{travelType}", formData?.travelType)
      .replace("{budget}", formData?.budget)
      .replace("{numberOfPeople}", formData?.numberOfPeople)
      .replace("{destinationType}", formData?.destinationType)
      .replace("{numberOfDays}", formData?.numberOfDays)
      .replace("{location}", formData?.location?.label);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

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
                    formData?.budget == item.title && "shadow-lg border-black"
                  } `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
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
                onClick={() => handleInputChange("destinationType", item.title)}
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
      <div className="my-10 justify-center flex">
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
      </Dialog>
    </div>
  );
}

export default CreateTrip;




// import { useEffect, useState } from "react";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import "./../components/ui/button";
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
// import "./../../public/a.css";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "@/service/firebaseConfig";

// import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import { useNavigate } from "react-router-dom";

// function CreateTrip() {
//   const [place, setPlace] = useState();

//   const [formData, setFormData] = useState([]);
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

//   const login = useGoogleLogin({
//     onSuccess: (codeResp) => GetUserProfile(codeResp),
//     onError: (error) => console.log(error),
//   });

//   const GetUserProfile = (tokenInfo) => {
//     axios
//       .get(
//         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
//         {
//           headers: {
//             Authorization: `Bearer ${tokenInfo?.access_token}`,
//             Accept: "Application/json",
//           },
//         }
//       )
//       .then((resp) => {
//         // console.log(resp);

//         localStorage.setItem("user", JSON.stringify(resp.data));
//         setOpenDialog(false);
//         OnGenerateTrip();
//       });
//   };

//   const SaveAiTrip = async (TripData) => {
//     setLoading(true);
//     const user = JSON.parse(localStorage.getItem("user"));
//     const docId = Date.now().toString();
//     await setDoc(doc(db, "GuideMeAi", docId), {
//       tripData: JSON.parse(TripData),
//       userSelection: formData,
//       userEmail: user?.email,
//       id: docId,
//     });
//     setLoading(false);
//     navigate("/view-trip/" + docId);
//   };

//   const OnGenerateTrip = async () => {
//     const user = localStorage.getItem("user");

//     if (!user) {
//       setOpenDialog(true);
//       return;
//     }

//     if (
//       !formData?.location ||
//       !formData?.budget ||
//       !formData?.numberOfPeople ||
//       !formData?.destinationType ||
//       !formData?.numberOfDays
//     ) {
//       toast("Please fill all the fields", "error");

//       return;
//     }
//     // console.log(formData);
//     setLoading(true);
//     const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
//       .replace("{numberOfDays}", formData?.numberOfDays)
//       .replace("{travelType}", formData?.travelType)
//       .replace("{budget}", formData?.budget)
//       .replace("{numberOfPeople}", formData?.numberOfPeople)
//       .replace("{destinationType}", formData?.destinationType)
//       .replace("{numberOfDays}", formData?.numberOfDays)
//       .replace("{location}", formData?.location?.label);

//     // console.log(FINAL_PROMPT);

//     const result = await chatSession.sendMessage(FINAL_PROMPT);
//     // console.log("--", result?.response?.text());
//     setLoading(false);
//     SaveAiTrip(result?.response?.text());
//   };

//   return (
//     <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
//       <h2 className="font-bold text-3xl">
//         Tell us your travel preferences 🏕️🌴
//       </h2>
//       <p className="mt-3 text-gray-500 text-xl">
//         Just provide some basic information, and our trip planner will generate
//         a customized itineraries based on your preferences
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
//                 handleInputChange("location", v.label);
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
//                     formData?.budget == item.title && "shadow-lg border-black"
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
//                   formData?.numberOfPeople == item.people &&
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
//                   formData?.destinationType == item.title &&
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
//               <p>Sign in with google authentication securely</p>
//               <Button
//                 onClick={login}
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
