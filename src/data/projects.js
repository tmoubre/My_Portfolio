// src/data/projects.js

const projects = [
    {
        title: "Responsive Portfolio Website",
        description:
            "Personal portfolio application designed and developed to showcase my product leadership, technical experience, certifications, and software development work. Built with a responsive, accessible interface and deployed as a production website.",
        stack: ["React", "Vite", "CSS", "Netlify"],
        links: {
            live: "https://troyoubre.com",
            github: "https://github.com/tmoubre/My_Portfolio",
        },
    },

    {
        title: "myFlix — REST API (Backend)",
        description:
            "REST API supporting a movie application with user registration, authentication, movie discovery, and favorites management. Designed around a structured API architecture with persistent MongoDB data storage.",
        stack: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT"],
        links: {
            live: "",
            github: "https://github.com/tmoubre/Movie-api",
        },
    },

    {
        title: "myFlix — React Client (Frontend)",
        description:
            "Responsive React single-page application consuming the myFlix REST API to provide movie discovery, detailed views, favorites management, search, routing, and user profile functionality.",
        stack: ["React", "Bootstrap", "Parcel"],
        links: {
            live: "https://sci-fi-movies.netlify.app/login",
            github: "https://github.com/tmoubre/myFlix-client",
        },
    },

    {
        title: "Meet App — Serverless PWA",
        description:
            "Progressive web application for discovering events by city using the Google Calendar API. Combines serverless authentication, offline capabilities, installable PWA behavior, and data visualization in a responsive application.",
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
            "Cross-platform mobile chat application built with React Native and Expo. Supports messaging, media sharing, location sharing, offline access, and synchronization through Firebase services.",
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
            "Angular implementation of the myFlix frontend with authentication, movie discovery, and dedicated director and genre views. Built with Angular Material and structured documentation for application handoff.",
        stack: [
            "Angular",
            "Angular Material",
            "TypeDoc/JSDoc",
        ],
        links: {
            live: "https://angular-movieapp.netlify.app/",
            github: "https://github.com/tmoubre/myFlix-Angular-client",
        },
    },
];

export default projects;