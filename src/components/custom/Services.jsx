import {
  FaMapMarkedAlt,
  FaRobot,
  FaCalendarAlt,
  FaComments,
} from "react-icons/fa";

const services = [
  {
    icon: <FaMapMarkedAlt className="text-4xl text-blue-600" />,
    title: "Smart Itinerary Planning",
    description:
      "AI-generated travel plans tailored to your preferences, destinations, and trip duration.",
  },
  {
    icon: <FaCalendarAlt className="text-4xl text-pink-500" />,
    title: "Trip Management",
    description:
      "Easily manage upcoming trips, track your progress, and stay organized throughout your journey.",
  },
  {
    icon: <FaRobot className="text-4xl text-purple-500" />,
    title: "AI Travel Assistant",
    description:
      "Chat with your smart assistant to get suggestions, alternate routes, or hidden gems nearby.",
  },
  {
    icon: <FaComments className="text-4xl text-green-600" />,
    title: "Community Recommendations",
    description:
      "Explore authentic reviews, shared experiences, and hidden spots suggested by real travelers.",
  },
];

function Services() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 my-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
        Our Services
      </h1>

      <div className="grid gap-8 md:grid-cols-2">
        {services.map((service, index) => (
          <div
            key={index}
            className="backdrop-blur-md bg-white/30 rounded-xl shadow-md p-6 hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-white shadow-inner">
                {service.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                {service.title}
              </h2>
            </div>
            <p className="text-gray-700 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
