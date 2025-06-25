import { useState } from "react";

function MyButton({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function Css() {
  return <h6>Pro tip: For your website to look better, use CSS for style</h6>;
}

const lessons = [
  {
    level: "Beginner 🟢",
    color: "limegreen",
    steps: [
      "Learn HTML: Structure your website.",
      "Learn CSS: Style your content.",
      "Learn JavaScript: Add interactivity.",
      "Learn React: Build apps with components.",
    ],
  },
  {
    level: "Intermediate 🟡",
    color: "gold",
    steps: [
      "Use Git & GitHub: Save and share your code.",
      "Deploy your site with GitHub Pages.",
      "Make it responsive with Flexbox & media queries.",
      "Secure forms and data with HTTPS.",
    ],
  },
  {
    level: "Master 🔴",
    color: "crimson",
    steps: [
      "Understand Node.js and APIs.",
      "Use databases like MongoDB or SQL.",
      "Build Full Stack apps.",
      "Use React Context and custom hooks.",
      "Write tests with Jest.",
      "Optimize performance with memoization.",
      "Secure apps with Auth & JWT.",
      "Go beyond: Next.js, TypeScript, AI APIs.",
    ],
  },
];

const quizzes = [
  {
    question: "What is HTML used for?",
    options: ["Styling", "Structure", "Interactivity"],
    answer: "Structure",
  },
  {
    question: "What is Git used for?",
    options: ["Hosting", "Version control", "Making apps fast"],
    answer: "Version control",
  },
  {
    question: "What is Node.js primarily used for?",
    options: ["Styling pages", "Running JavaScript on server", "Making HTML"],
    answer: "Running JavaScript on server",
  },
];

function TutorialStep({ level, step, currentIndex, total, color }) {
  return (
    <div className="tutorial">
      <h2 style={{ color }}>{level} Tutorial</h2>
      <p>
        Step {currentIndex + 1} of {total}: {step}
      </p>
    </div>
  );
}

export default function MyApp() {
  const [text, setText] = useState(
    "Learn Html, Css and JavaScript all in one place for free !!!"
  );
  const [levelIndex, setLevelIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState("");

  const currentLesson = lessons[levelIndex];
  const currentStepText = currentLesson.steps[stepIndex];

  function handleClick() {
    setText("You can use JS for actions and functions");
  }

  function getClick() {
    setText("Learn Html, Css and JavaScript all in one place for free !!!");
  }

  function nextStep() {
    const steps = currentLesson.steps;
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else if (levelIndex < lessons.length - 1) {
      setShowQuiz(true);
    } else {
      setCompleted(true);
    }
  }

  function prevStep() {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    } else if (levelIndex > 0) {
      const prevLevel = levelIndex - 1;
      setLevelIndex(prevLevel);
      setStepIndex(lessons[prevLevel].steps.length - 1);
    }
  }

  function restartTutorial() {
    setLevelIndex(0);
    setStepIndex(0);
    setCompleted(false);
    setShowQuiz(false);
    setQuizFeedback("");
  }

  function checkAnswer(option) {
    if (option === quizzes[levelIndex].answer) {
      setQuizFeedback("✅ Correct! Moving on...");
      setTimeout(() => {
        setQuizFeedback("");
        setShowQuiz(false);
        setLevelIndex(levelIndex + 1);
        setStepIndex(0);
      }, 1000);
    } else {
      setQuizFeedback("❌ Incorrect. Try again.");
    }
  }

  return (
    <div className="container">
      <h1>{text}</h1>
      <MyButton onClick={handleClick}>Next</MyButton>
      <MyButton onClick={getClick}>Back</MyButton>
      <Css />

      {completed ? (
        <>
          <h2 style={{ color: "aqua" }}>
            🎉 Congratulations! You finished the tutorial!
          </h2>
          <MyButton onClick={restartTutorial}>🔄 Restart</MyButton>
        </>
      ) : showQuiz ? (
        <div className="quiz">
          <h3>🧠 Quiz time!</h3>
          <p>{quizzes[levelIndex].question}</p>
          {quizzes[levelIndex].options.map((option, i) => (
            <button key={i} onClick={() => checkAnswer(option)}>
              {option}
            </button>
          ))}
          {quizFeedback && <p>{quizFeedback}</p>}
        </div>
      ) : (
        <>
          <TutorialStep
            level={currentLesson.level}
            step={currentStepText}
            currentIndex={stepIndex}
            total={currentLesson.steps.length}
            color={currentLesson.color}
          />
          <div>
            <MyButton onClick={prevStep}>⬅ Back</MyButton>
            <MyButton onClick={nextStep}>➡ Next</MyButton>
          </div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${
                  ((stepIndex + 1) / currentLesson.steps.length) * 100
                }%`,
                backgroundColor: currentLesson.color,
              }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
}

}
