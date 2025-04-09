import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function TermsOfService() {
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
    <div className="max-w-4xl mx-auto px-6 py-12 my-10 rounded-xl backdrop-blur-sm bg-white/40 shadow-lg relative">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
        Terms of Service
      </h1>

      <p className="text-gray-700 mb-4 text-sm">
        Welcome to GuideMe.AI! These terms of service outline the rules and
        regulations for the use of our application and services. By accessing or
        using the app, you agree to comply with and be bound by these terms.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
        1. Use of the App
      </h2>
      <p className="text-gray-700 text-sm">
        You agree to use GuideMe.AI only for lawful purposes and in a way that
        does not infringe on the rights of others or restrict their use of the
        app.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
        2. Account Security
      </h2>
      <p className="text-gray-700 text-sm">
        You are responsible for maintaining the confidentiality of your account
        and password, including but not limited to restricting access to your
        device. Any activity under your account is your responsibility.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
        3. Intellectual Property
      </h2>
      <p className="text-gray-700 text-sm">
        All content in this app, including the design, logo, and content, is the
        intellectual property of GuideMe.AI. You may not use or reproduce any
        part of this app without prior permission.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
        4. Limitation of Liability
      </h2>
      <p className="text-gray-700 text-sm">
        GuideMe.AI is not liable for any direct, indirect, incidental, or
        consequential damages that result from your use of the app.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
        5. Updates and Changes
      </h2>
      <p className="text-gray-700 text-sm">
        We reserve the right to modify these terms at any time. Changes will be
        effective immediately upon posting. We encourage you to review the terms
        regularly.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
        6. Contact
      </h2>
      <p className="text-gray-700 text-sm">
        If you have any questions about these Terms, feel free to contact us at{" "}
        <a href="/contact-us" className="underline text-blue-700">
          Contact Us
        </a>
        .
      </p>

      <p className="mt-8 text-sm text-gray-600 text-center">
        Last updated on {new Date().toLocaleDateString()}.
      </p>

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
}

export default TermsOfService;
