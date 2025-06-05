// Elite Quiz Challenge - Full JavaScript Logic
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const restartBtn = document.getElementById("restart-btn");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
const totalQuestionsDisplay = document.getElementById("total-questions");
const correctAnswersDisplay = document.getElementById("correct-answers");
const timeEl = document.getElementById("time");
const progressFill = document.getElementById("progress-fill");

let currentCategory = "";
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let currentQuestions = [];

const quizData = {
  general: [
    {
      question: "What is the capital of France?",
      answers: ["Paris", "Rome", "Madrid", "Berlin"],
      correct: 0,
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: ["Earth", "Mars", "Jupiter", "Venus"],
      correct: 1,
    },
    {
      question: 'Who wrote "Romeo and Juliet"?',
      answers: ["Shakespeare", "Homer", "Dante", "Plato"],
      correct: 0,
    },
    {
      question: "What is the largest ocean on Earth?",
      answers: ["Atlantic", "Pacific", "Indian", "Arctic"],
      correct: 1,
    },
    {
      question: "How many continents are there?",
      answers: ["5", "6", "7", "8"],
      correct: 2,
    },
    {
      question: "What is the chemical symbol for gold?",
      answers: ["Go", "Au", "Ag", "Gd"],
      correct: 1,
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      answers: ["China", "Japan", "Korea", "Thailand"],
      correct: 1,
    },
    {
      question: "What is the smallest country in the world?",
      answers: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"],
      correct: 0,
    },
    {
      question: "Which language has the most native speakers?",
      answers: ["Mandarin", "Spanish", "English", "Hindi"],
      correct: 0,
    },
    {
      question: "What is the name of the longest river in the world?",
      answers: ["Amazon", "Nile", "Yangtze", "Mississippi"],
      correct: 1,
    },
    {
      question: "Who painted the Mona Lisa?",
      answers: ["Michelangelo", "Leonardo da Vinci", "Van Gogh", "Picasso"],
      correct: 1,
    },
    {
      question: "What is the tallest mountain on Earth?",
      answers: ["K2", "Mount Everest", "Kilimanjaro", "Makalu"],
      correct: 1,
    },
    {
      question: "Which country has the largest population?",
      answers: ["India", "USA", "China", "Russia"],
      correct: 2,
    },
    {
      question: "Who invented the telephone?",
      answers: ["Alexander Graham Bell", "Edison", "Tesla", "Newton"],
      correct: 0,
    },
    {
      question: "What is the primary ingredient in guacamole?",
      answers: ["Avocado", "Tomatoes", "Lemon", "Onion"],
      correct: 0,
    },
    {
      question: "What is the official language of Brazil?",
      answers: ["Spanish", "English", "Portuguese", "French"],
      correct: 2,
    },
    {
      question: "Which city is nicknamed the Big Apple?",
      answers: ["New York", "San Francisco", "Los Angeles", "Chicago"],
      correct: 0,
    },
    {
      question: "Who was the first President of the United States?",
      answers: [
        "Abraham Lincoln",
        "Thomas Jefferson",
        "George Washington",
        "John Adams",
      ],
      correct: 2,
    },
    {
      question: "What is the main ingredient in traditional hummus?",
      answers: ["Beans", "Chickpeas", "Lentils", "Potatoes"],
      correct: 1,
    },
    {
      question: "What is the capital city of Canada?",
      answers: ["Toronto", "Ottawa", "Vancouver", "Montreal"],
      correct: 1,
    },
    {
      question: "Which country is famous for the Eiffel Tower?",
      answers: ["Italy", "France", "Germany", "Spain"],
      correct: 1,
    },
    {
      question: "What is the currency of the United Kingdom?",
      answers: ["Dollar", "Euro", "Pound Sterling", "Yen"],
      correct: 2,
    },
    {
      question:
        "Which historical figure is known for the theory of relativity?",
      answers: ["Newton", "Einstein", "Tesla", "Darwin"],
      correct: 1,
    },
    {
      question: 'Which continent is known as the "Dark Continent"?',
      answers: ["Africa", "Asia", "Australia", "South America"],
      correct: 0,
    },
    {
      question: "What year did humans first land on the moon?",
      answers: ["1967", "1969", "1970", "1965"],
      correct: 1,
    },
  ],
  science: [
    {
      question: "What gas do plants absorb from the atmosphere?",
      answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correct: 1,
    },
    {
      question: "What is the boiling point of water?",
      answers: ["90°C", "100°C", "80°C", "120°C"],
      correct: 1,
    },
    {
      question: "Which planet is closest to the Sun?",
      answers: ["Venus", "Earth", "Mercury", "Mars"],
      correct: 2,
    },
    {
      question: "What is the largest planet in the solar system?",
      answers: ["Saturn", "Jupiter", "Neptune", "Earth"],
      correct: 1,
    },
    {
      question: "What is the powerhouse of the cell?",
      answers: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
      correct: 1,
    },
    {
      question: "What is the chemical formula for water?",
      answers: ["HO", "H2O", "O2H", "OH"],
      correct: 1,
    },
    {
      question: "What organ in the human body pumps blood?",
      answers: ["Liver", "Heart", "Brain", "Lungs"],
      correct: 1,
    },
    {
      question: "What type of energy is produced by the Sun?",
      answers: ["Nuclear", "Thermal", "Solar", "Chemical"],
      correct: 2,
    },
    {
      question: "What is the speed of light?",
      answers: ["300 km/s", "3,000 km/s", "300,000 km/s", "30,000 km/s"],
      correct: 2,
    },
    {
      question: "What gas makes up most of Earth’s atmosphere?",
      answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
      correct: 1,
    },
    {
      question: "Which organ is responsible for filtering blood?",
      answers: ["Liver", "Kidney", "Heart", "Pancreas"],
      correct: 1,
    },
    {
      question: "What is the hardest natural substance on Earth?",
      answers: ["Quartz", "Iron", "Diamond", "Gold"],
      correct: 2,
    },
    {
      question: "What is the primary function of red blood cells?",
      answers: [
        "Fight infections",
        "Transport oxygen",
        "Digest nutrients",
        "Filter blood",
      ],
      correct: 1,
    },
    {
      question: "What is the smallest unit of matter?",
      answers: ["Cell", "Molecule", "Atom", "Proton"],
      correct: 2,
    },
    {
      question: "What causes tides on Earth?",
      answers: [
        "Earth’s rotation",
        "Sun’s gravity",
        "Moon’s gravity",
        "Ocean currents",
      ],
      correct: 2,
    },
    {
      question: "What is the study of living organisms called?",
      answers: ["Physics", "Chemistry", "Biology", "Ecology"],
      correct: 2,
    },
    {
      question: 'Which planet is known as the "Red Planet"?',
      answers: ["Earth", "Jupiter", "Mars", "Venus"],
      correct: 2,
    },
    {
      question: "What gas is released by plants during photosynthesis?",
      answers: ["Carbon Dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
      correct: 2,
    },
    {
      question: "What is the scientific name for humans?",
      answers: [
        "Homo erectus",
        "Homo sapiens",
        "Homo habilis",
        "Homo neanderthalensis",
      ],
      correct: 1,
    },
    {
      question: "What is the smallest bone in the human body?",
      answers: ["Stapes", "Tibia", "Femur", "Radius"],
      correct: 0,
    },
    {
      question: "Which part of the atom contains protons and neutrons?",
      answers: ["Electron cloud", "Nucleus", "Shell", "Core"],
      correct: 1,
    },
    {
      question: "What is the process of converting water vapor to liquid?",
      answers: ["Evaporation", "Condensation", "Precipitation", "Sublimation"],
      correct: 1,
    },
    {
      question: 'What chemical element does "C" represent?',
      answers: ["Calcium", "Carbon", "Copper", "Chlorine"],
      correct: 1,
    },
    {
      question: "What type of rock is formed by cooling magma?",
      answers: ["Sedimentary", "Metamorphic", "Igneous", "Fossil"],
      correct: 2,
    },
    {
      question: "Which scientist developed the theory of relativity?",
      answers: ["Newton", "Einstein", "Darwin", "Tesla"],
      correct: 1,
    },
  ],
  technology: [
    {
      question: "HTML stands for?",
      answers: [
        "Hyper Text Markup Language",
        "Hyperlinks Text Markup Language",
        "Home Tool Markup Language",
        "None",
      ],
      correct: 0,
    },
    {
      question: "What does CPU stand for?",
      answers: [
        "Central Process Unit",
        "Central Processing Unit",
        "Computer Personal Unit",
        "Central Programming Unit",
      ],
      correct: 1,
    },
    {
      question: "What does RAM stand for?",
      answers: [
        "Random Access Memory",
        "Read Access Memory",
        "Rapid Action Memory",
        "Remote Access Memory",
      ],
      correct: 0,
    },
    {
      question: "What is the main function of an operating system?",
      answers: [
        "Manage software",
        "Manage hardware",
        "Manage files",
        "All of the above",
      ],
      correct: 3,
    },
    {
      question:
        "Which programming language is primarily used for web development?",
      answers: ["Python", "C++", "JavaScript", "Swift"],
      correct: 2,
    },
    {
      question: "What does URL stand for?",
      answers: [
        "Universal Resource Locator",
        "Uniform Resource Locator",
        "Unlimited Resource Locator",
        "User Resource Locator",
      ],
      correct: 1,
    },
    {
      question: "What is the primary purpose of a firewall?",
      answers: [
        "Block viruses",
        "Control internet speed",
        "Protect from unauthorized access",
        "Manage downloads",
      ],
      correct: 2,
    },
    {
      question: "What is the full form of Wi-Fi?",
      answers: [
        "Wireless Fidelity",
        "Wide Internet Frequency",
        "Wireless Functionality",
        "None of the above",
      ],
      correct: 0,
    },
    {
      question: "What does HTTP stand for?",
      answers: [
        "Hyper Text Transfer Protocol",
        "Hyperlinks Transfer Protocol",
        "Hyper Text Transmission Protocol",
        "Hyper Transfer Text Protocol",
      ],
      correct: 0,
    },
    {
      question: "Who is known as the father of the computer?",
      answers: [
        "Alan Turing",
        "Charles Babbage",
        "John Von Neumann",
        "Bill Gates",
      ],
      correct: 1,
    },
    {
      question: "What type of storage is a Solid State Drive (SSD)?",
      answers: [
        "Mechanical storage",
        "Magnetic storage",
        "Flash storage",
        "Optical storage",
      ],
      correct: 2,
    },
    {
      question: "Which company developed the Android operating system?",
      answers: ["Microsoft", "Apple", "Google", "IBM"],
      correct: 2,
    },
    {
      question: "What is the full form of AI?",
      answers: [
        "Advanced Intelligence",
        "Artificial Intelligence",
        "Automatic Information",
        "Applied Intelligence",
      ],
      correct: 1,
    },
    {
      question: "What does GPU stand for?",
      answers: [
        "Graphical Processing Unit",
        "General Processing Unit",
        "Graphics Processing Unit",
        "General Purpose Unit",
      ],
      correct: 2,
    },
    {
      question: "What is Open Source software?",
      answers: [
        "Free software",
        "Software with open code",
        "Software with paid subscription",
        "None of the above",
      ],
      correct: 1,
    },
    {
      question: "Which protocol is used to send emails?",
      answers: ["HTTP", "SMTP", "FTP", "POP3"],
      correct: 1,
    },
    {
      question: "What does USB stand for?",
      answers: [
        "Universal Serial Block",
        "Universal Serial Bus",
        "Universal Storage Bus",
        "Unified Storage Block",
      ],
      correct: 1,
    },
    {
      question: "What does SQL stand for?",
      answers: [
        "Structured Query Language",
        "Simple Query Language",
        "Special Query Logic",
        "Standard Query Library",
      ],
      correct: 0,
    },
    {
      question: "What is Blockchain used for?",
      answers: [
        "Data storage",
        "Cryptocurrency transactions",
        "File sharing",
        "Operating systems",
      ],
      correct: 1,
    },
    {
      question: "Which programming language is widely used for iOS apps?",
      answers: ["Swift", "Java", "Python", "Ruby"],
      correct: 0,
    },
    {
      question: "What is the name of Microsoft’s cloud computing platform?",
      answers: ["Azure", "AWS", "Google Cloud", "iCloud"],
      correct: 0,
    },
    {
      question: "What does IoT stand for?",
      answers: [
        "Internet of Tools",
        "Internet of Things",
        "Information of Technology",
        "Internet Operational Technology",
      ],
      correct: 1,
    },
    {
      question: "What is the default port for HTTPS?",
      answers: ["443", "80", "21", "25"],
      correct: 0,
    },
    {
      question: "Which company developed Windows?",
      answers: ["Apple", "Microsoft", "Google", "IBM"],
      correct: 1,
    },
    {
      question: "What is a gigabyte (GB)?",
      answers: [
        "1024 megabytes",
        "1000 kilobytes",
        "1000 megabytes",
        "1024 kilobytes",
      ],
      correct: 0,
    },
  ],
  history: [
    {
      question: "Who discovered America?",
      answers: ["Columbus", "Newton", "Einstein", "Tesla"],
      correct: 0,
    },
    {
      question: "When was World War II?",
      answers: ["1914-1918", "1939-1945", "1920-1925", "1800-1850"],
      correct: 1,
    },
    {
      question: "Who was the first President of the United States?",
      answers: [
        "George Washington",
        "Abraham Lincoln",
        "John Adams",
        "Thomas Jefferson",
      ],
      correct: 0,
    },
    {
      question: "In which year did the Titanic sink?",
      answers: ["1910", "1912", "1914", "1920"],
      correct: 1,
    },
    {
      question: "Who was the first person to reach the South Pole?",
      answers: [
        "Robert Falcon Scott",
        "Roald Amundsen",
        "Ernest Shackleton",
        "James Clark Ross",
      ],
      correct: 1,
    },
    {
      question: "Which empire was ruled by Julius Caesar?",
      answers: [
        "Roman Empire",
        "Ottoman Empire",
        "British Empire",
        "Mongol Empire",
      ],
      correct: 0,
    },
    {
      question: "Who wrote the Declaration of Independence?",
      answers: [
        "Benjamin Franklin",
        "John Adams",
        "Thomas Jefferson",
        "Alexander Hamilton",
      ],
      correct: 2,
    },
    {
      question: "When did the Berlin Wall fall?",
      answers: ["1987", "1989", "1991", "1993"],
      correct: 1,
    },
    {
      question:
        "Which war was fought between the North and South regions of the United States?",
      answers: [
        "World War I",
        "World War II",
        "American Civil War",
        "Vietnam War",
      ],
      correct: 2,
    },
    {
      question: "Who was the ruler of France during the French Revolution?",
      answers: ["Napoleon", "Louis XIV", "Louis XVI", "Marie Antoinette"],
      correct: 2,
    },
    {
      question: "Which country gifted the Statue of Liberty to the USA?",
      answers: ["England", "France", "Spain", "Germany"],
      correct: 1,
    },
    {
      question: "Who was known as the Iron Lady?",
      answers: [
        "Angela Merkel",
        "Indira Gandhi",
        "Margaret Thatcher",
        "Golda Meir",
      ],
      correct: 2,
    },
    {
      question: "Which civilization built Machu Picchu?",
      answers: ["Aztec", "Inca", "Maya", "Olmec"],
      correct: 1,
    },
    {
      question:
        "What was the name of the first manned mission to land on the moon?",
      answers: ["Apollo 10", "Apollo 11", "Voyager 1", "Gemini 4"],
      correct: 1,
    },
    {
      question: "In which year did India gain independence?",
      answers: ["1945", "1947", "1950", "1955"],
      correct: 1,
    },
    {
      question: "Who led the Soviet Union during World War II?",
      answers: [
        "Vladimir Lenin",
        "Joseph Stalin",
        "Mikhail Gorbachev",
        "Nikita Khrushchev",
      ],
      correct: 1,
    },
    {
      question: "What was the name of the ship used by Darwin on his voyage?",
      answers: ["Endeavour", "HMS Beagle", "Santa Maria", "Titanic"],
      correct: 1,
    },
    {
      question: "Which king was known as the Sun King?",
      answers: ["Henry VIII", "Louis XIV", "Charles I", "Phillip II"],
      correct: 1,
    },
    {
      question: "In which year did the Soviet Union collapse?",
      answers: ["1989", "1991", "1995", "2000"],
      correct: 1,
    },
    {
      question: "Which event triggered World War I?",
      answers: [
        "Pearl Harbor attack",
        "Assassination of Archduke Franz Ferdinand",
        "Treaty of Versailles",
        "German invasion of Poland",
      ],
      correct: 1,
    },
    {
      question: "Who was the first emperor of China?",
      answers: ["Genghis Khan", "Qin Shi Huang", "Kublai Khan", "Sun Tzu"],
      correct: 1,
    },
    {
      question: "When was the United Nations founded?",
      answers: ["1942", "1945", "1948", "1950"],
      correct: 1,
    },
    {
      question: "Which historical document was signed in 1215?",
      answers: [
        "Bill of Rights",
        "Magna Carta",
        "Constitution",
        "Declaration of Independence",
      ],
      correct: 1,
    },
    {
      question: "Who was the Egyptian queen married to Julius Caesar?",
      answers: ["Nefertiti", "Cleopatra", "Hatshepsut", "Isis"],
      correct: 1,
    },
    {
      question: "Which country was defeated in the Opium Wars?",
      answers: ["China", "India", "Japan", "Korea"],
      correct: 0,
    },
  ],
  sports: [
    {
      question: "How many players in a soccer team?",
      answers: ["9", "10", "11", "12"],
      correct: 2,
    },
    {
      question: "Where were the 2016 Olympics held?",
      answers: ["Tokyo", "London", "Rio de Janeiro", "Beijing"],
      correct: 2,
    },
    {
      question: "Which country won the FIFA World Cup in 2018?",
      answers: ["Brazil", "Germany", "France", "Argentina"],
      correct: 2,
    },
    {
      question: "How many points is a touchdown worth in American football?",
      answers: ["3", "6", "7", "5"],
      correct: 1,
    },
    {
      question: 'Which sport uses the terms "love", "deuce", and "advantage"?',
      answers: ["Badminton", "Tennis", "Squash", "Table Tennis"],
      correct: 1,
    },
    {
      question: "Who is considered the fastest man in the world?",
      answers: ["Usain Bolt", "Mo Farah", "Tyson Gay", "Justin Gatlin"],
      correct: 0,
    },
    {
      question: "How many players are on a basketball team?",
      answers: ["5", "6", "7", "8"],
      correct: 0,
    },
    {
      question: "Which country invented cricket?",
      answers: ["Australia", "India", "England", "South Africa"],
      correct: 2,
    },
    {
      question: "What is the maximum score in a single frame of bowling?",
      answers: ["150", "250", "300", "350"],
      correct: 2,
    },
    {
      question: "Which athlete is known as the “King of Clay” in tennis?",
      answers: [
        "Roger Federer",
        "Rafael Nadal",
        "Novak Djokovic",
        "Andy Murray",
      ],
      correct: 1,
    },
    {
      question: "Which sport uses a pommel horse?",
      answers: ["Gymnastics", "Equestrian", "Pole Vault", "Weightlifting"],
      correct: 0,
    },
    {
      question: "What is the term for scoring three goals in a soccer match?",
      answers: ["Double", "Hat-trick", "Triple", "Goalfest"],
      correct: 1,
    },
    {
      question: "Which country hosted the first Olympic Games?",
      answers: ["Italy", "Greece", "Japan", "France"],
      correct: 1,
    },
    {
      question: "How many holes are played in a standard round of golf?",
      answers: ["9", "12", "18", "20"],
      correct: 2,
    },
    {
      question: "Which team has won the most NBA championships?",
      answers: [
        "Chicago Bulls",
        "Los Angeles Lakers",
        "Boston Celtics",
        "Golden State Warriors",
      ],
      correct: 2,
    },
    {
      question: 'Which sport uses a "shuttlecock"?',
      answers: ["Badminton", "Tennis", "Squash", "Volleyball"],
      correct: 0,
    },
    {
      question: "How long is a marathon?",
      answers: ["25.2 km", "42.2 km", "50.0 km", "60.0 km"],
      correct: 1,
    },
    {
      question: "What is the nickname of the New Zealand rugby team?",
      answers: ["Springboks", "Wallabies", "All Blacks", "Kiwis"],
      correct: 2,
    },
    {
      question: "Which sport involves throwing a heavy spherical object?",
      answers: ["Shot put", "Discus", "Hammer throw", "Javelin"],
      correct: 0,
    },
    {
      question: "Which country won the most medals in the 2020 Olympics?",
      answers: ["China", "USA", "Japan", "Russia"],
      correct: 1,
    },
    {
      question: "What is the size of a standard soccer goal?",
      answers: [
        "7.32m x 2.44m",
        "6.32m x 2.34m",
        "5.32m x 2.44m",
        "7.52m x 2.54m",
      ],
      correct: 0,
    },
    {
      question: "What is the number of players in a volleyball team?",
      answers: ["5", "6", "7", "8"],
      correct: 1,
    },
    {
      question:
        "What is the name of the international cricket championship held every four years?",
      answers: ["The Ashes", "World Series", "Cricket World Cup", "ICC Trophy"],
      correct: 2,
    },
    {
      question: "Which athlete holds the record for the most Olympic medals?",
      answers: ["Usain Bolt", "Michael Phelps", "Carl Lewis", "Simone Biles"],
      correct: 1,
    },
    {
      question: "What do you call a score of zero in tennis?",
      answers: ["Nil", "Zero", "Love", "Blank"],
      correct: 2,
    },
  ],
};

// Event Listeners for Categories
const categoryButtons = document.querySelectorAll(".category-btn");
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => startQuiz(btn.dataset.category));
});

// Event Listener for Restart
restartBtn.addEventListener("click", () => restartQuiz());

function startQuiz(category) {
  currentCategory = category;
  currentQuestions = quizData[category];
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 50;

  timeEl.textContent = timeLeft;

  welcomeScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  startTimer();
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  if (currentQuestionIndex < currentQuestions.length) {
    showQuestion(currentQuestions[currentQuestionIndex]);
    updateProgressBar();
  } else {
    showResult();
  }
}

function showQuestion(questionObj) {
  questionText.textContent = questionObj.question;
  answerButtons.innerHTML = "";

  questionObj.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(answerButtons);
}

function selectAnswer(index) {
  const correct = currentQuestions[currentQuestionIndex].correct;
  const buttons = answerButtons.children;

  for (let i = 0; i < buttons.length; i++) {
    if (i === correct) buttons[i].classList.add("correct");
    else if (i === index) buttons[i].classList.add("wrong");
    buttons[i].disabled = true;
  }

  score += index === correct ? 1 : 0;

  setTimeout(() => {
    currentQuestionIndex++;
    setNextQuestion();
  }, 500);
}

function showResult() {
  clearInterval(timer);

  // Switch to Result Screen
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  scoreDisplay.textContent = score;
  totalQuestionsDisplay.textContent = currentQuestions.length;
  correctAnswersDisplay.textContent = score;

  const previousHigh =
    localStorage.getItem("highscore-" + currentCategory) || 0;
  if (score > previousHigh) {
    localStorage.setItem("highscore-" + currentCategory, score);
  }

  highScoreDisplay.textContent = Math.max(score, previousHigh);
}

function restartQuiz() {
  // Reset variables
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 30;

  // Reset screens
  resultScreen.classList.remove("active");
  welcomeScreen.classList.add("active");
  quizScreen.classList.remove("active");

  // Reset progress bar
  progressFill.style.width = "0%";

  // Clear previous timer
  clearInterval(timer);

  // Reset other UI elements
  timeEl.textContent = timeLeft;
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    updateProgressBar();

    if (timeLeft <= 0) {
      showResult();
    }
  }, 1000);
}

function updateProgressBar() {
  const percent = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
  progressFill.style.width = `${percent}%`;
}

function clearStatusClass(element) {
  Array.from(element.children).forEach((child) => {
    child.classList.remove("correct");
    child.classList.remove("wrong");
  });
}
