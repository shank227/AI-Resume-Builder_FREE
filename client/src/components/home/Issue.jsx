import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

// -------------------------------
// VALIDATION CONFIG
// -------------------------------
const ALLOWED_EMAIL_DOMAINS = [
  "gmail.com",
  "outlook.com",
  "yahoo.com",
  "zoho.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
  "hotmail.com",
  "rediff.com",
  "zohomail.in"
];

const isValidName = (name) => {
  return /^[A-Za-z ]{2,}$/.test(name.trim());
};

const isAllowedEmail = (email) => {
  if (!email.includes("@")) return false;
  const domain = email.split("@")[1].toLowerCase();
  return ALLOWED_EMAIL_DOMAINS.includes(domain);
};

const Issue = () => {
  const formRef = useRef();
  const [error, setError] = useState("");

  // ---------------------------------
  // SUBMIT HANDLER
  // ---------------------------------
  const sendEmail = (e) => {
    e.preventDefault();
    setError("");

    const form = formRef.current;
    const name = form.user_name.value;
    const email = form.user_email.value;

    if (!isValidName(name)) {
      setError("Name must contain only letters and spaces.");
      return;
    }

    if (!isAllowedEmail(email)) {
      setError(
        "Please use a valid email address"
      );
      return;
    }

    emailjs
      .sendForm(
        "service_e5uf6em",
        "template_bkxi3wt",
        form,
        "PtSnrGunhdxWInE8k"
      )
      .then(
        () => {
          alert(
            "Message sent successfully! Will get back to you as soon as possible."
          );
          form.reset();
        },
        (err) => {
          console.error(err);
          alert("Failed to send message. Try again.");
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
          <span className="text-indigo-600">
            cvaichemy.help@gmail.com
          </span>
        </p>

        <div className="max-w-96 w-full px-4">
          {/* FULL NAME */}
          <label className="font-medium">Name</label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all">
            <input
              type="text"
              name="user_name"
              placeholder="Enter your full name"
              className="h-full px-2 w-full outline-none bg-transparent"
              required
            />
          </div>

          {/* EMAIL */}
          <label className="font-medium">Email Address</label>
          <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all">
            <input
              type="email"
              name="user_email"
              placeholder="Enter your email address"
              className="h-full px-2 w-full outline-none bg-transparent"
              required
            />
          </div>

          {/* MESSAGE */}
          <label className="font-medium">Message</label>
          <textarea
            name="message"
            rows="4"
            className="w-full mt-2 p-2 bg-transparent border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-indigo-400 transition-all"
            placeholder="Enter your message"
            required
          />

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-600 text-xs mt-3 text-center">
              {error}
            </p>
          )}

          {/* SUBMIT */}
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
