import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 gap-6 sm:gap-8 md:gap-10 text-center mt-12 sm:mt-16">
      <h2 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#453911]">
        Discover the World Your Way:
        <br className="hidden sm:block" />
        <span className="text-black">
          {" "}
          Custom Itineraries at Your Command ✍️ with AI 🧠
        </span>
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl">
        Plan your perfect journey effortlessly with our AI-powered platform. Get
        personalized itineraries tailored to your preferences, ensuring
        unforgettable adventures at your fingertips. Explore, customize, and
        embark today!
      </p>
      <Link to="/create-trip">
        <Button className="bg-black border-slate-500 text-[#dad2b3] hover:bg-[#d8d8d8] hover:text-[#2f2c12] transition-all duration-500 text-sm sm:text-base px-6 py-2 rounded-md">
          Get Started, It's Free
        </Button>
      </Link>
    </div>
  );
}

export default Hero;
