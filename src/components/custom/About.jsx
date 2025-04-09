import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-2xl backdrop-blur-md bg-white/40 relative"> {/* Line 16: Added 'relative' */}
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
        About Us
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        At GuideMe.AI, we are committed to delivering exceptional travel
        experiences. Our AI-driven technology ensures that every plan is smart,
        efficient, and deeply personal.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Integrity",
            desc: "We uphold the highest standards of honesty in all actions.",
          },
          {
            title: "Innovation",
            desc: "Constantly evolving to bring cutting-edge AI travel solutions.",
          },
          {
            title: "Customer Commitment",
            desc: "Creating unforgettable experiences by understanding your needs.",
          },
        ].map((value, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:scale-[1.03] transition-transform"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {value.title}
            </h3>
            <p className="text-sm text-gray-600">{value.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a href="/services">
          <Button>Learn More</Button>
        </a>
      </div>

      {isVisible && (
        <div
          className="fixed bottom-8 right-8 cursor-pointer z-50"
          onClick={scrollToTop}
        >
          <div className="bg-gray-300 rounded-full shadow-md p-2 hover:bg-gray-400">
            <FaArrowUp className="text-black" />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;