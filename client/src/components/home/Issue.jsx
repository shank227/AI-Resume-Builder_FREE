import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const Issue = () => {
  const formRef = useRef();

  // Handle submit
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_e5uf6em", // From EmailJS dashboard
        "template_bkxi3wt", // The template you created
        formRef.current,
        "PtSnrGunhdxWInE8k" // Public key
      )
      .then(
        () => {
          alert("Message sent successfully! Will get back to you as soon as possible");
          e.target.reset();
        },
        (error) => {
          alert("Failed to send message. Try again.");
          console.log(error);
        }
      );
  };

  return (
    <div id="Issue" className="mt-50">
      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="flex flex-col items-center text-sm text-slate-800"
      >
        <p className="text-xs bg-indigo-200 text-indigo-600 font-medium px-3 py-1 rounded-full">
          Contact Us
        </p>
        <h1 className="text-4xl font-bold py-4 text-center">
          Any Issues? Message the Developer.
        </h1>

        <p className="max-md:text-sm text-gray-500 pb-10 text-center">
          Or reach out manually at{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            cvaichemy.help@gmail.com
          </a>
        </p>

        <div className="max-w-96 w-full px-4">
          {/* Full Name */}
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
            <input
              type="text"
              name="user_name"
              className="h-full px-2 w-full outline-none bg-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <label htmlFor="email" className="font-medium">
            Email Address
          </label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
            <input
              type="email"
              name="user_email"
              className="h-full px-2 w-full outline-none bg-transparent"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Message */}
          <label htmlFor="message" className="font-medium">
            Message
          </label>
          <textarea
            name="message"
            rows="4"
            className="w-full mt-2 p-2 bg-transparent border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-indigo-400 transition-all"
            placeholder="Enter your message"
            required
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-1 mt-5 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 w-full rounded-full transition"
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default Issue;
