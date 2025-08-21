// src/data/projects.js
const projects = [
  {
    title: "Responsive Portfolio Website",
    description:
      "A multi‑page, responsive website (Home, About, Work, Contact) that showcases my projects and makes it easy to get in touch. Built with semantic HTML and accessible CSS so it looks good and works well on any device.",
    stack: ["HTML", "CSS"],
    links: {
      live: "https://tmoubre.github.io/Porfolio-WebSite/",
      github: "https://github.com/tmoubre/Porfolio-WebSite",
    },
  },
  {
    title: "myFlix — REST API (Backend)",
    description:
      "A secure movie API that lets people register, log in, explore movies, and manage a list of favorites. Includes endpoints for movies, directors, and genres, with data stored in MongoDB.",
    stack: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT"],
    links: {
      live: "",
      github: "https://github.com/tmoubre/Movie-api",
    },
  },
  {
    title: "myFlix — React Client (Frontend)",
    description:
      "A responsive single‑page app for browsing movies, reading details, and managing favorites. Includes search, routing, and a personal profile view that updates user info.",
    stack: ["React", "Bootstrap", "Parcel"],
    links: {
      live: "https://sci-fi-movies.netlify.app/login",
      github: "https://github.com/tmoubre/myFlix-client",
    },
  },
  {
    title: "Meet App — Serverless PWA",
    description:
      "An events app that shows what’s happening by city using the Google Calendar API. Works offline, can be installed to the home screen, and includes charts to understand locations and event genres. Built with a test‑driven approach.",
    stack: [
      "React",
      "Serverless (AWS Lambda)",
      "Google Calendar API",
      "Service Worker",
      "Data Visualization",
    ],
    links: {
      live: "https://meet-rouge.vercel.app/oauth2callback",
      github: "https://github.com/tmoubre/Meet",
    },
  },
  {
    title: "React Native Chat App (Expo)",
    description:
      "A mobile chat app where users jump into a room, send messages, share photos, and optionally share their location. Messages work offline and sync when back online.",
    stack: [
      "React Native",
      "Expo",
      "Firebase Auth",
      "Firestore",
      "Firebase Storage",
      "Gifted Chat",
    ],
    links: {
      demo: "",
      github: "https://github.com/tmoubre/Chat-Demo",
    },
  },
  {
    title: "myFlix — Angular Client",
    description:
      "An Angular version of the myFlix frontend with login/registration, an all‑movies view, and dedicated views for director and genre details. Styled with Angular Material and documented for handoff.",
    stack: ["Angular", "Angular Material", "TypeDoc/JSDoc"],
    links: {
      live: "",
      github: "",
    },
  },
];

export default projects;
