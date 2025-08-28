// Put full-size certificate images and thumbnails into /public/certs
// Then update the paths below to match your filenames.
// You can add more certificates by appending to this array.
export const certs = [
  {
    id: "intro-frontend",
    title: "Intro to Frontend Development",
    issuer: "CareerFoundry",
    date: "2025",
    thumbnail: "/certs/intro-frontend-thumb.jpg",
    image: "/certs/intro-frontend.jpg",
    description: "Fundamentals of HTML, CSS, JavaScript, and responsive design.",
    // Optional: link to credential verification page if available (e.g., Credly or school portal)
    verifyUrl: "",
    // Downloading someone’s certificates is usually unnecessary—leave this off by default.
    // Set allowDownload: true if you explicitly want to provide a download file (e.g., watermarked PDF).
    allowDownload: false,
    // Optionally provide a dedicated download URL (e.g., a watermarked PDF)
    downloadUrl: "",
    // Accessible alternative text
    alt: "CareerFoundry Intro to Frontend Development certificate for Troy",
  },
];
