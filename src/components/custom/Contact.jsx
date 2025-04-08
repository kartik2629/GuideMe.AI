import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

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

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-2xl"
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
    </motion.div>
  );
}

export default Contact;
