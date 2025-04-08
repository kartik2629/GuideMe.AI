import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h2 className="font-extrabold text-[60px] text-center mt-16">
        <span className="text-[#453911]">Discover the World Your Way:</span>{" "}
        Custom Itineraries at Your Command ✍️ with AI 🧠
      </h2>
      <p className="text-xl text-gray-700 text-center">
        Plan your perfect journey effortlessly with our AI-powered platform. Get
        personalized itineraries tailored to your preferences, ensuring
        unforgettable adventures at your fingertips. Explore, customize, and
        embark today!
      </p>
      <Link to="/create-trip">
        <Button className="bg-black border-slate-500 text-[#dad2b3] hover:bg-[#fff] hover:text-[#b7ae4c]">
          Get Started, Its Free
        </Button>
      </Link>
    </div>
  );
}

export default Hero;
