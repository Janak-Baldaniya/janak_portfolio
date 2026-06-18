

export const portfolioData = {
  personalInfo: {
    fullName: "Janak Baldaniya",
    title: "Full Stack Developer",
    experienceStat: "1 Year Of Experience",
    bio: "I build responsive, high-performance, and visually engaging web applications. Specializing in modern JavaScript frameworks, robust API design, and clean user experiences, I focus on writing maintainable code that solves real-world business problems.",
    resumeUrl: "https://drive.google.com/file/d/1obVJUEEXJrqCKoZntsJ62N0miRsBYAaK/view?usp=sharing", // Can be replaced with a real URL or local path
    avatarUrl: "/janak.jpeg" // High-quality profile photo
  },
  socialLinks: {
    github: "https://github.com/Janak-Baldaniya",
    linkedin: "https://www.linkedin.com/in/janak-baldaniya-68635a344",
    email: "baldaniyajanak1826@gmail.com",
    phone: "+91 7984568772",
  },
  skills: {
    frontend: [
      { name: "HTML5", iconName: "SiHtml5" },
      { name: "CSS3", iconName: "SiCss3" },
      { name: "JavaScript", iconName: "SiJavascript" },
      { name: "TypeScript", iconName: "SiTypescript" },
      { name: "React", iconName: "SiReact" },
      { name: "Next.js", iconName: "SiNextdotjs" },
      { name: "Tailwind CSS", iconName: "SiTailwindcss" },
      { name: "Bootstrap", iconName: "SiBootstrap" },
      { name: "Framer Motion", iconName: "SiFramer" },
      { name: "Redux", iconName: "SiRedux" }
    ],
    backend: [
      { name: "Node.js", iconName: "SiNodedotjs" },
      { name: "Express.js", iconName: "SiExpress" },
      { name: "REST API", iconName: "SiPostman" },
      { name: "JWT Auth", iconName: "SiJsonwebtokens" },
      { name: "Socket.io", iconName: "SiSocketdotio" },
      { name: "PHP", iconName: "SiPhp" }
    ],
    database: [
      { name: "MongoDB", iconName: "SiMongodb" },
      { name: "MySQL", iconName: "SiMysql" },
      { name: "MariaDB", iconName: "SiFirebase" },
      { name: "Mongoose", iconName: "SiMongoose" }
    ],
    tools: [
      { name: "Git", iconName: "SiGit" },
      { name: "GitHub", iconName: "SiGithub" },
      { name: "VS Code", iconName: "SiVisualstudiocode" },
      { name: "Postman", iconName: "SiPostman" },
      { name: "Vercel", iconName: "SiVercel" },
      { name: "Netlify", iconName: "SiNetlify" },
      { name: "Figma", iconName: "SiFigma" },
      { name: "npm", iconName: "SiNpm" },
      { name: "Vite", iconName: "SiVite" }
    ]
  },
  experience: [
    {
      id: 1,
      role: "Full Stack Developer",
      company: "Inspire fox UI/UX Design Agency – Full Stack Developer",
      duration: "SEP 2025 - Present",
      description: [
        "Developed and maintained high-performance web applications using React and Node.js.",
        "Built and integrated secure RESTful APIs improving backend system latency by 20%.",
        "Collaborated with multidisciplinary team members using agile methodologies to deliver projects on time.",
        "Improved application performance, resulting in a 15% increase in Core Web Vitals scores."
      ]
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Vocation (B.Voc.) in Software Development",
      institution: "R.N.G. Patel Institute of Technology, affiliated with Gujarat Technological University (GTU)",
      location: "Isroli, Surat, Gujarat",
      duration: "2022 – Expected June 2025",
      grade: "9.30 CGPA",
      description: [
        "Specialized in software development with a strong focus on full-stack web technologies.",
        "Studied core subjects including Data Structures, DBMS, Operating Systems, and Web Development.",
        "Completed industry-relevant projects using React, Node.js, and MongoDB.",
        "Participated in college tech events, coding workshops, and industry-oriented internships."
      ],
      highlight: "Full Stack Specialization"
    }
  ],
  projects: [
    {
      id: 1,
      title: "A modern, responsive landing page",
      description: "A modern, responsive landing page built with React, Tailwind CSS, and Framer Motion. It features smooth animations, interactive components, a testimonials carousel, a newsletter form, a company logo showcase, and a pricing calculator. Swiper.js enhances the carousel, while React Icons add stylish elements for a clean and engaging design.",
      image: "/project01.png",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "Swiper.js", "React Icons"],
      liveLink: "https://morden-landing-page.vercel.app/",
      githubLink: "https://github.com/Janak-Baldaniya/Morden-Landing-Page"
    },
    {
      id: 2,
      title: "Expense Tracker - Financial Management App",
      description: "An expense tracker web app that allows users to add, update, and delete income and expense records, with all data securely stored in MongoDB. It offers a user-friendly, responsive interface designed for easy financial tracking and management. The app includes an interactive line chart to help users visualize spending and income trends over time, enabling better budgeting decisions. Built with the MERN stack, it provides seamless performance, efficient data handling, and insightful analytics across all devices.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=500",
      technologies: ["React", "Express.js", "MongoDB", "Tailwind CSS", "Chart.js", "React Icons", "Mongoose", "JWT"],
      liveLink: "", // Empty liveLink to demonstrate optional Github-only display
      githubLink: "https://github.com/Janak-Baldaniya/Expense-Tracker"
    }
  ],
  certificates: [
    {
      id: 1,
      title: "Web Developer",
      issuer: "UNISTAR SOFTECH PRIVATE LIMITED",

      certificateLink: "https://drive.google.com/file/d/183C3EpAcaetfWNmvVZ15p31lI9FThtPY/view?usp=sharing"
    },
    {
      id: 2,
      title: "Database System Assistant",
      issuer: "BITKHANAN IT EDUCATION",

      certificateLink: "https://drive.google.com/file/d/1I0cSwSJhdTSMX7QS4A88gsrmuqW5imXW/view?usp=sharing"
    },
    {
      id: 3,
      title: "user Experience Designer",
      issuer: "PIXETA APP LAB",

      certificateLink: "https://drive.google.com/file/d/1MCVkYzP1HaKR8MJaDN6s7tAua_ZtIn9H/view?usp=sharing"
    },
    {
      id: 4,
      title: "Android Programming",
      issuer: "TECHIE BROTHERS",

      certificateLink: "https://drive.google.com/file/d/1HQiho1J69KQs_m_7nfpjPQFMMCxsMPX6/view?usp=sharing"
    },

  ],
  github: {
    username: "Janak-Baldaniya",
    profileUrl: "https://github.com/Janak-Baldaniya",
    avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150&h=150",
    repositoriesCount: 9,
    contributionsCount: 100,
    contributionGridUrl: "https://ghchart.rshah.org/2563eb/Janak-Baldaniya" // Dynamic green/blue GitHub contribution graph builder
  },
  linkedin: {
    profileUrl: "https://www.linkedin.com/in/janak-baldaniya-68635a344",
    headline: "Full Stack Developer at Inspire fox UI/UX Design Agency | React & Node.js Specialist",
    connectionsCount: "150+",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
  }
};




// Portfolio ma
// hero image add , education details add , conatct form submission add ok
// resume ma kai ghate to e and certificate ne add karvanu 
// time malo to ek new project create karvano che ok