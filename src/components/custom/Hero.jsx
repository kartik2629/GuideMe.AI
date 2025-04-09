import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Wand2, Globe, Sparkles } from "lucide-react";

function Hero() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48 gap-12 text-center mt-12 sm:mt-16">
      {/* Main Heading */}
      <h2 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#453911]">
        Discover the World Your Way:
        <br className="hidden sm:block" />
        <span className="text-black">
          {" "}
          Custom Itineraries at Your Command ✍️ with AI 🧠
        </span>
      </h2>

      {/* Subheading */}
      <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl">
        Plan your perfect journey effortlessly with our AI-powered platform. Get
        personalized itineraries tailored to your preferences, ensuring
        unforgettable adventures at your fingertips. Explore, customize, and
        embark today!
      </p>

      {/* CTA Button */}
      <Link to="/create-trip">
        <Button className="bg-black border-slate-500 text-[#dad2b3] hover:bg-[#d8d8d8] hover:text-[#2f2c12] transition-all duration-500 text-sm sm:text-base px-6 py-2 rounded-md">
          Get Started, It's Free
        </Button>
      </Link>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <FeatureCard
          icon={<Wand2 className="text-[#453911]" size={40} />}
          title="AI Magic"
          description="Let AI do the planning for you. Enter your interests, get custom trips instantly."
        />
        <FeatureCard
          icon={<Globe className="text-[#453911]" size={40} />}
          title="Worldwide Coverage"
          description="Explore thousands of destinations around the world with curated suggestions."
        />
        <FeatureCard
          icon={<Sparkles className="text-[#453911]" size={40} />}
          title="Flexible & Fun"
          description="Edit, save, and share your itineraries. Perfect for solo travelers or group trips."
        />
      </div>

      {/* Testimonial */}
      <div className="bg-[#f7f4e8] p-6 sm:p-10 mt-12 rounded-xl shadow-lg max-w-4xl w-full">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#453911] mb-4">
          What travelers are saying:
        </h3>
        <p className="text-gray-700 text-base sm:text-lg italic">
          “I used to spend hours planning my trips — now I just enter a few
          details and let GuideMeAI handle the rest. It’s like having a personal
          travel assistant in my pocket!” — <strong>Aarav S., Delhi</strong>
        </p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center px-4 py-6 rounded-lg bg-[#fefdf9] shadow-md hover:shadow-lg transition duration-300">
      <div className="mb-4">{icon}</div>
      <h4 className="text-lg font-semibold text-[#2c240d]">{title}</h4>
      <p className="text-gray-600 mt-2 text-sm">{description}</p>
    </div>
  );
}

export default Hero;
