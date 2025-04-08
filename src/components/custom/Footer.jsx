import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Company Information */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold">🌍 GuideMe.AI</h2>
          <h3 className="text-lg">AI Trips and Itinerary Planner</h3>
          <p className="text-sm text-gray-500">
            Plan your journeys with ease and confidence.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
          <a href="/about" className="hover:text-black">
            About
          </a>
          <a href="/services" className="hover:text-black">
            Services
          </a>
          <a href="/contact-us" className="hover:text-black">
            Contact
          </a>
          <a href="/policy" className="hover:text-black">
            Privacy Policy
          </a>
          <a href="/termOfService" className="hover:text-black">
            Terms of Service
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-4 text-lg">
          <a
            href="https://github.com/kartik2629"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            <FaGithub className="size-10 text-black" />
          </a>
          <a
            href="https://www.linkedin.com/in/kartik-gupta-15792a174/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            <FaLinkedin className="size-10 text-black" />
          </a>
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="text-center py-4 border-t text-xs text-gray-400">
        © {new Date().getFullYear()} Kartik Gupta • All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
