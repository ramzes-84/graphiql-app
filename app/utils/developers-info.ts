export type PersonInfo = {
  name: string;
  role: string;
  photoUrl: string;
  githubUrl: string;
  description: string;
  contributions: string[];
};

export const persons: PersonInfo[] = [
  {
    name: "Roman Shevyakov",
    role: "Team Lead",
    photoUrl: "/Shevyakov.jpg",
    githubUrl: "https://github.com/ramzes-84",
    description:
      "Was born in 1984 in Tula`s region. Owns a binoculars. Worked as a lawyer for a long time but after moving to another country faced with a necessity to make some changes in profession. The RSSchool learning is the first attempt to enter the IT world.",
    contributions: [
      "repository setup and development environment configuration;",
      "Product`s Page development;",
      "Cart`s Page development;",
      "searching and integration of additional components and modules (sliders and others);",
      "testing.",
    ],
  },
  {
    name: "Lyubov Agulova",
    role: "Developer",
    photoUrl: "/Agulova.jpg",
    githubUrl: "https://github.com/lu7623",
    description:
      "Was born in Voronezh, Russia in 1992, now I live in Saint Petersburg . Graduated as a Bachelor of radiophysics from Voronezh State University in 2013. Currently working as a stained glass crafter in my small home workshop. I’m a self-taught glass artist and I think self education is a strong point of my personality. Also running business gave me skills such as flexibility, resourcefulness, and persistence in achieving goals.",
    contributions: [
      "Catalog page with pagination, sorting, search and filtering options;",
      "Header and routing;",
      "App design solutions;",
      "Content maker and owner.",
    ],
  },
  {
    name: "Kseniya Merkulova",
    role: "Developer",
    photoUrl: "/Merkulova.jpg",
    githubUrl: "https://github.com/mksenni",
    description:
      "Born in Petropavlovsk, Kazakhstan, in 1992 and soon my family moved to Russia. Received an economic education and worked for 6 years as a financial consultant in a bank. But I always wanted to change my profession and see the result of my work. Then I became a mother, went to live in Tyumen, Russia, and while on maternity leave began my way into IT. I was HR in an IT company, then took a short course on basics of front-end development. Studying at RS School is first serious training in the IT world.",
    contributions: [
      "Development and validation of forms for Registration Page and Login Page;",
      "Development of display and editing of User Profile Page;",
      "Implementation of use of promocodes;",
      "Creating an About Us page.",
    ],
  },
];
