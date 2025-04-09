import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

function Hero() {
  const scrollRef = useRef(null);

  const testimonials = [
    {
      text: "I used to spend hours planning trips — now it's done in minutes. Love it!",
      author: "Aarav S., Delhi",
    },
    {
      text: "The AI itinerary blew my mind. It picked spots I didn’t even know I’d love!",
      author: "Meera T., Bengaluru",
    },
    {
      text: "Custom travel planning made effortless. I recommend it to all my friends.",
      author: "Rajeev M., Mumbai",
    },
    {
      text: "Super intuitive and easy to use. My travel life is now 10x better!",
      author: "Sneha K., Pune",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const scrollAmount = container.offsetWidth;
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });

        if (
          container.scrollLeft + container.offsetWidth >=
          container.scrollWidth - 5
        ) {
          setTimeout(() => {
            container.scrollTo({ left: 0, behavior: "smooth" });
          }, 500);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-9 px-5 sm:px-10 md:px-24 lg:px-32 xl:px-56">
      <h2 className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-center mt-16 leading-tight">
        <span className="text-[#453911]">Discover the World Your Way:</span>{" "}
        Custom Itineraries at Your Command ✍️ with AI 🧠
      </h2>

      <p className="text-lg sm:text-xl text-gray-700 text-center">
        Plan your perfect journey effortlessly with our AI-powered platform. Get
        personalized itineraries tailored to your preferences, ensuring
        unforgettable adventures at your fingertips. Explore, customize, and
        embark today!
      </p>

      <Link to="/create-trip">
        <Button className="bg-black border-slate-500 text-[#dad2b3] hover:bg-[#d8d8d8] hover:text-[#2f2c12] transition-all duration-600">
          Get Started, It's Free
        </Button>
      </Link>

      <div
        ref={scrollRef}
        className="w-full overflow-x-auto mt-12 whitespace-nowrap scroll-smooth no-scrollbar"
      >
        <div className="inline-flex gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[#f7f4e8] min-w-[300px] sm:min-w-[350px] md:min-w-[400px] p-6 rounded-xl shadow-lg flex-shrink-0"
            >
              <p className="italic text-gray-700 text-base sm:text-lg mb-2">
                “{item.text}”
              </p>
              <p className="font-semibold text-[#453911]">{item.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
