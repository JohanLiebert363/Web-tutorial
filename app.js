import { useState } from "react";

function MyButton({ onClick }) {
  return <button onClick={onClick}>Next</button>;
}

function BackButton({ onClick }) {
  return <button onClick={onClick}>Back</button>;
}

function Css() {
  return <h6>For your website to look better, use CSS for style</h6>;
}

const lessons = [
  {
    level: "Beginner",
    steps: [
      "Learn HTML: Structure your website (e.g., headings, paragraphs, links).",
      "Learn CSS: Style your content (e.g., colors, layout, fonts).",
      "Learn JavaScript: Add logic and interactivity (clicks, inputs, animations).",
      "Learn React: Build interactive web apps with components and state.",
    ],
  },
  {
    level: "Intermediate",
    steps: [
      "Learn Git & GitHub: Save and share your code with version control.",
      "Deploy Your Website: Put your site online (e.g., GitHub Pages, Netlify).",
      "Make It Responsive: Ensure it looks good on phones & tablets (media queries, flexbox).",
      "Bonus – Learn Web Security: Protect forms and data (input validation, HTTPS).",
      "More will be added in the near future",
    ],
  },
];

function TutorialStep({ level, step, currentIndex, total }) {
  return (
    <div className="tutorial">
      <h2>📚 {level} Level Tutorial</h2>
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

  function handleClick() {
    setText("You can use js for actions and functions");
  }
  function getClick() {
    setText("This is my React JS app, learn HTML on this website");
  }

  function nextStep() {
    const steps = lessons[levelIndex].steps;
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else if (levelIndex < lessons.length - 1) {
      setLevelIndex(levelIndex + 1);
      setStepIndex(0);
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

  const currentLesson = lessons[levelIndex];
  const currentStepText = currentLesson.steps[stepIndex];

  return (
    <div className="container">
      <h1>{text}</h1>
      <MyButton onClick={handleClick} />
      <BackButton onClick={getClick} />
      <Css />
      <TutorialStep
        level={currentLesson.level}
        step={currentStepText}
        currentIndex={stepIndex}
        total={currentLesson.steps.length}
      />
      <div>
        <BackButton onClick={prevStep} />
        <MyButton onClick={nextStep} />
      </div>
    </div>
  );
}
