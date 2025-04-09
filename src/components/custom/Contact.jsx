import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { FaArrowUp } from "react-icons/fa";

function Contact() {
  const formRef = useRef();
  const [done, setDone] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_mu9iquw",
        "template_5lygsjs",
        formRef.current,
        "d2grrtuepNYiHkyHc"
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setDone(true);
          formRef.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  const [isVisible, setIsVisible] = useState(false); // Line 11: Added isVisible state

  const scrollToTop = () => {
    // Line 13: Added scrollToTop function
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
    <motion.div
      className="max-w-3xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-2xl backdrop-blur-md bg-white/40"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
        📩 Contact Us
      </h2>
      <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-5">
        <Input type="text" name="name" placeholder="Your Name" required />
        <Input type="email" name="email" placeholder="Your Email" required />
        <Textarea name="message" placeholder="Your Message" rows="4" required />
        <Button type="submit">Send Message</Button>
        {done && (
          <p className="text-green-600 text-center mt-2">
            ✅ Message sent successfully!
          </p>
        )}
      </form>
      {isVisible && ( // Line 64: Added scroll to top button
        <div
          className="fixed bottom-8 right-8 cursor-pointer z-50"
          onClick={scrollToTop}
        >
          <div className="bg-gray-300 rounded-full shadow-md p-2 hover:bg-gray-400">
            <FaArrowUp className="text-black" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Contact;
