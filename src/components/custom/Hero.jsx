import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h2 className="font-extrabold text-[60px] text-center mt-16">
        <span className="text-[#D6B745]">Discover the World Your Way:</span>{" "}
        Custom Itineraries at Your Command ✍️ with AI 🧠
      </h2>
      <p className="text-xl text-gray-500 text-center">
        Plan your perfect journey effortlessly with our AI-powered platform. Get
        personalized itineraries tailored to your preferences, ensuring
        unforgettable adventures at your fingertips. Explore, customize, and
        embark today!
      </p>
      <Link to="/create-trip">
        <Button className="bg-neutral-100 border-slate-500 text-[#D6B746]">
          Get Started, Its Free
        </Button>
      </Link>
    </div>
  );
}

export default Hero;
