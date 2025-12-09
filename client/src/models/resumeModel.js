// src/models/resumeModel.js

export const resumeModel = {
  _id: "",
  title: "",

  personal_info: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    image: null,
    linkedin: "",
    github: "",
    website: "",
  },

  summary: "",

  experience: [
    // {
    //   company: "",
    //   title: "",
    //   start: "",
    //   end: "",
    //   desc: "",
    // }
  ],

  education: [
    // {
    //   school: "",
    //   degree: "",
    //   start: "",
    //   end: "",
    //   desc: "",
    // }
  ],

  projects: [
    // {
    //   title: "",
    //   link: "",
    //   desc: "",
    // }
  ],

  skills: [],

  template: "classic",
  accent_color: "#3B82F6",
  public: false,
};
