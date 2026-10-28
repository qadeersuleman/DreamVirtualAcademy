export interface MockQuestion {
  questionText: string;
  options: string[];
  correctAnswer: number;
}

export interface SubjectData {
  id: number;
  subject: string; // "Science" | "Mathematics" | "Chemistry" | "Physics" | "Computer Basics"
  questions: {
    easy: MockQuestion[];
    medium: MockQuestion[];
    hard: MockQuestion[];
  };
}

export const mockTestsData: SubjectData[] = [
  {
    id: 1,
    subject: "Science",
    questions: {
      easy: [
        {
          questionText: "Which organelle is known as the powerhouse of the cell?",
          options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Body"],
          correctAnswer: 1
        },
        {
          questionText: "What gas do humans need to breathe in order to survive?",
          options: ["Carbon Dioxide", "Nitrogen", "Oxygen", "Helium"],
          correctAnswer: 2
        },
        {
          questionText: "What is the closest planet to the Sun?",
          options: ["Venus", "Earth", "Mars", "Mercury"],
          correctAnswer: 3
        }
      ],
      medium: [
        {
          questionText: "Which pigment gives leaves their green color?",
          options: ["Carotene", "Chlorophyll", "Xanthophyll", "Anthocyanin"],
          correctAnswer: 1
        },
        {
          questionText: "What is the approximate speed of sound in dry air at 20 °C?",
          options: ["343 m/s", "1500 m/s", "300,000 km/s", "100 m/s"],
          correctAnswer: 0
        },
        {
          questionText: "Which blood cells are responsible for fighting infections?",
          options: ["Red blood cells", "White blood cells", "Platelets", "Plasma cells"],
          correctAnswer: 1
        }
      ],
      hard: [
        {
          questionText: "What is the main function of the ribosome in a biological cell?",
          options: ["Lipid synthesis", "Energy production", "Protein synthesis", "Waste excretion"],
          correctAnswer: 2
        },
        {
          questionText: "Which layer of the Earth's atmosphere contains the ozone layer?",
          options: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"],
          correctAnswer: 1
        },
        {
          questionText: "What type of macromolecule are enzymes composed of?",
          options: ["Carbohydrates", "Lipids", "Proteins", "Nucleic Acids"],
          correctAnswer: 2
        }
      ]
    }
  },
  {
    id: 2,
    subject: "Mathematics",
    questions: {
      easy: [
        {
          questionText: "What is the square root of 64?",
          options: ["6", "7", "8", "9"],
          correctAnswer: 2
        },
        {
          questionText: "If a triangle has angles of 60° and 60°, what is the third angle?",
          options: ["30°", "60°", "90°", "120°"],
          correctAnswer: 1
        },
        {
          questionText: "What is the value of 15% of 200?",
          options: ["15", "20", "30", "40"],
          correctAnswer: 2
        }
      ],
      medium: [
        {
          questionText: "What is the value of x in the equation: 3x + 7 = 22?",
          options: ["3", "4", "5", "6"],
          correctAnswer: 2
        },
        {
          questionText: "What is the area of a circle with a radius of 7 units? (Take pi ≈ 22/7)",
          options: ["44 sq units", "154 sq units", "98 sq units", "308 sq units"],
          correctAnswer: 1
        },
        {
          questionText: "If the ratio of two numbers is 3:5 and their sum is 80, what is the larger number?",
          options: ["30", "40", "50", "60"],
          correctAnswer: 2
        }
      ],
      hard: [
        {
          questionText: "What is the value of log₁₀(1000)?",
          options: ["1", "2", "3", "4"],
          correctAnswer: 2
        },
        {
          questionText: "What is the derivative of x² with respect to x?",
          options: ["x", "2x", "2", "x/2"],
          correctAnswer: 1
        },
        {
          questionText: "A bag contains 3 red balls and 7 blue balls. What is the probability of drawing a red ball and then a blue ball without replacement?",
          options: ["21/100", "7/30", "3/10", "7/27"],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 3,
    subject: "Chemistry",
    questions: {
      easy: [
        {
          questionText: "What is the chemical symbol for Water?",
          options: ["CO2", "H2O", "NaCl", "O2"],
          correctAnswer: 1
        },
        {
          questionText: "Which element has the atomic number 1?",
          options: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
          correctAnswer: 2
        },
        {
          questionText: "What is the pH level of pure neutral water?",
          options: ["1", "5", "7", "14"],
          correctAnswer: 2
        }
      ],
      medium: [
        {
          questionText: "What is the chemical name for common table salt?",
          options: ["Sodium Bicarbonate", "Sodium Chloride", "Calcium Carbonate", "Potassium Chloride"],
          correctAnswer: 1
        },
        {
          questionText: "Which gas is produced when an acid reacts with a metal carbonate?",
          options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Chlorine"],
          correctAnswer: 2
        },
        {
          questionText: "What is the molecular formula of Glucose?",
          options: ["C6H12O6", "CH4", "C2H5OH", "C12H22O11"],
          correctAnswer: 0
        }
      ],
      hard: [
        {
          questionText: "What type of chemical bond is formed by the sharing of electron pairs between atoms?",
          options: ["Ionic bond", "Covalent bond", "Hydrogen bond", "Metallic bond"],
          correctAnswer: 1
        },
        {
          questionText: "Which element is considered the basis of all organic chemistry?",
          options: ["Nitrogen", "Oxygen", "Hydrogen", "Carbon"],
          correctAnswer: 3
        },
        {
          questionText: "What is the term for a reaction that releases thermal energy to its surroundings?",
          options: ["Endothermic", "Exothermic", "Catalytic", "Isothermal"],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 4,
    subject: "Physics",
    questions: {
      easy: [
        {
          questionText: "What is the SI unit of electrical resistance?",
          options: ["Ampere", "Volt", "Ohm", "Watt"],
          correctAnswer: 2
        },
        {
          questionText: "According to Newton's law, F = ma. What does 'a' stand for?",
          options: ["Area", "Acceleration", "Amperage", "Altitude"],
          correctAnswer: 1
        },
        {
          questionText: "Which of these is a non-renewable source of energy?",
          options: ["Solar power", "Wind energy", "Coal", "Hydroelectricity"],
          correctAnswer: 2
        }
      ],
      medium: [
        {
          questionText: "What is the acceleration due to gravity on Earth's surface?",
          options: ["8.8 m/s²", "9.8 m/s²", "10.8 m/s²", "12.0 m/s²"],
          correctAnswer: 1
        },
        {
          questionText: "What optical phenomenon is responsible for the formation of a rainbow?",
          options: ["Reflection", "Refraction and Dispersion", "Diffraction", "Polarization"],
          correctAnswer: 1
        },
        {
          questionText: "Which type of mirror is commonly used as a rear-view mirror in vehicles?",
          options: ["Concave mirror", "Convex mirror", "Plane mirror", "Parabolic mirror"],
          correctAnswer: 1
        }
      ],
      hard: [
        {
          questionText: "What is the first law of thermodynamics primarily concerned with?",
          options: ["Entropy", "Conservation of Energy", "Absolute Zero", "Heat flow direction"],
          correctAnswer: 1
        },
        {
          questionText: "Which scientist proposed the Special Theory of Relativity?",
          options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Max Planck"],
          correctAnswer: 1
        },
        {
          questionText: "What color of visible light has the highest frequency and shortest wavelength?",
          options: ["Red", "Green", "Yellow", "Violet"],
          correctAnswer: 3
        }
      ]
    }
  },
  {
    id: 5,
    subject: "Computer Basics",
    questions: {
      easy: [
        {
          questionText: "What does CPU stand for?",
          options: ["Computer Processing Unit", "Central Processing Unit", "Central Program Utility", "Control Power Unit"],
          correctAnswer: 1
        },
        {
          questionText: "Which of the following is an input device?",
          options: ["Monitor", "Printer", "Keyboard", "Speaker"],
          correctAnswer: 2
        },
        {
          questionText: "What is the main operating system developed by Microsoft?",
          options: ["macOS", "Linux", "Windows", "Android"],
          correctAnswer: 2
        }
      ],
      medium: [
        {
          questionText: "What is the temporary memory of a computer system called?",
          options: ["ROM", "RAM", "Hard Disk", "SSD"],
          correctAnswer: 1
        },
        {
          questionText: "What does HTML stand for?",
          options: ["HyperText Markup Language", "HighText Machine Language", "Hyperlink Text Management Language", "Home Tool Markup Language"],
          correctAnswer: 0
        },
        {
          questionText: "Which protocol is used to securely browse websites on the internet?",
          options: ["HTTP", "FTP", "HTTPS", "SMTP"],
          correctAnswer: 2
        }
      ],
      hard: [
        {
          questionText: "What is the primary function of a DNS server?",
          options: ["To encrypt web traffic", "To translate domain names to IP addresses", "To filter spam emails", "To store user databases"],
          correctAnswer: 1
        },
        {
          questionText: "Which of the following is a key-value database system?",
          options: ["MySQL", "PostgreSQL", "Redis", "SQLite"],
          correctAnswer: 2
        },
        {
          questionText: "What does the abbreviation 'IP' stand for in computer networks?",
          options: ["Intranet Protocol", "Information Provider", "Internet Protocol", "Internal Program"],
          correctAnswer: 2
        }
      ]
    }
  }
];
