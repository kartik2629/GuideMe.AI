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
