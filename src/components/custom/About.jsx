
const About = () => {
  return (
    <section className="relative bg-gradient-to-br from-purple-200/60 via-blue-100/60 to-pink-100/60 h-screen">
      {/* Glass blur overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/20" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-gray-800 px-4">
        <div className="max-w-5xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-lg md:text-xl mb-10 px-2 md:px-12">
            At GuideMe.AI, we are committed to delivering exceptional travel
            experiences. Our AI-driven technology ensures that every plan is
            smart, efficient, and deeply personal.
          </p>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
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
                className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-md hover:scale-[1.03] transition-transform"
              >
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-sm">{value.desc}</p>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="mt-10">
            <a href="/services">
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-md transition-all">
                Learn More
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
