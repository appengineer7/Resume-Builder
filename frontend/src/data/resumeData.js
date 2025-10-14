import profilePic from "../assets/images/avatar-icons/propic.png";

const resumeData = {
  personal: {
    fullName: "Abul Saad",
    title: "Full Stack Developer",
    email: "abul.saad@example.com",
    phone: "+91 98765 43210",
    location: "Chandigarh, India",
    summary:
      "Full Stack Developer with over 5 years of hands-on experience designing, developing, and maintaining web applications. Skilled in React, Node.js, and MongoDB, with a passion for crafting clean, efficient, and user-focused code. Dedicated to continuous learning and staying current with modern web technologies.",
    profileImage: profilePic,
    hobbies: [
      "Reading tech blogs",
      "Traveling",
      "Gaming",
      "Photography",
      "Cooking",
    ],
  },

  experiences: [
    {
      id: 1,
      title: "Software Engineer",
      company: "ABC Tech Pvt. Ltd.",
      from: "Jan 2020",
      to: "Present",
      description:
        "Developed scalable web applications using React, Node.js, and MongoDB. Implemented RESTful APIs, optimized performance, and collaborated with cross-functional teams to deliver high-quality solutions.",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "XYZ Solutions",
      from: "Jun 2018",
      to: "Dec 2019",
      description:
        "Built responsive and dynamic user interfaces with HTML, CSS, JavaScript, and React. Improved page load speed by 35% through code optimization and image compression.",
    }
  ],

  education: [
    {
      id: 1,
      degree: "B.Tech in Computer Science Engineering",
      institution: "Chandigarh University",
      from: "2022",
      to: "2025",
      grade: "8.5 CGPA",
    },
    {
      id: 2,
      degree: "Diploma in Web Development",
      institution: "NIIT Chandigarh",
      from: "2018",
      to: "2019",
      grade: "Completed with Distinction",
    },
  ],

  skills: [
    "JavaScript (ES6+)",
    "React.js",
    "Node.js",
    "Express.js",
    "HTML5",
    "CSS3",
    "TailwindCSS",
    "MongoDB",
    "MySQL"
  ],

  projects: [
    {
      id: 2,
      name: "E-commerce App",
      description:
        "Built a full-stack e-commerce application using the MERN stack. Implemented user authentication, product management, and a shopping cart system with secure checkout.",
      technologies: "MongoDB, Express, React, Node.js, JWT, Redux",
      link: "https://github.com/abulsaad/ecommerce-app",
    },
    {
      id: 3,
      name: "Chat Application",
      description:
        "Created a real-time chat application supporting private and group messaging using Socket.io and Node.js.",
      technologies: "React, Node.js, Socket.io, MongoDB",
      link: "https://github.com/abulsaad/chat-app",
    },
  ],

  certifications: [
    {
      id: 2,
      name: "Full Stack Developer Bootcamp",
      issuer: "Udemy",
      date: "2020-11",
    },
    {
      id: 3,
      name: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      date: "2019-08",
    },
  ],
};

export default resumeData;
