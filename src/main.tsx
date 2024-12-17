import { Devvit, useState, useForm, SetStateAction} from '@devvit/public-api';

Devvit.addCustomPostType({
  name: 'Guess the Image Game',
  render: (context) => {
    return (
      <blocks height="tall">
        <GameBoard context={context} />
      </blocks>
    );
  },
});

export const GameBoard = ({ context }) => {
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState('');

  const gamesData = [
    {
      imageUrl: 'Ts.png',
      description: 'Singer known for hits like "Love Story"',
      correctAnswers: ['taylor swift', 'swift', 'taylor'],
    },
    {
      imageUrl: 'selena.jpeg',
      description: 'Singer and actress, known for "Lose You to Love Me"',
      correctAnswers: ['selena gomez', 'selena'],
    },
    {
      imageUrl: 'Cillian Murphy.webp',
      description: 'Actor known for "Peaky Blinders"',
      correctAnswers: ['cillian murphy', 'cillian'],
    },
    {
      imageUrl: 'Anthony Mackie.jpg',
      description: 'Actor known for playing Falcon in Marvel movies',
      correctAnswers: ['anthony mackie', 'mackie', 'anthony'],
    },
    {
      imageUrl: 'Emma D\'Arcy.jpg',
      description: 'Actor from "House of the Dragon"',
      correctAnswers: ['emma d’arcy', 'emma darcy', 'emma'],
    },
    {
      imageUrl: 'Jennifer_Lawrence.jpg',
      description: 'Actress known for "The Hunger Games"',
      correctAnswers: ['jennifer lawrence', 'jennifer', 'lawrence'],
    },
    {
      imageUrl: 'Kaley_Cuoco.webp',
      description: 'Actress known for "The Big Bang Theory"',
      correctAnswers: ['kaley cuoco', 'kaley', 'cuoco'],
    },
    {
      imageUrl: 'Sebastian Stan.webp',
      description: 'Actor known for playing Bucky Barnes in Marvel movies',
      correctAnswers: ['sebastian stan', 'sebastian', 'stan'],
    },
    {
      imageUrl: 'Thomas.jpg',
      description: 'Fictional character often seen in animated shows',
      correctAnswers: ['thomas', 'train', 'thomas the train'],
    },
    {
      imageUrl: 'Ed O\'Neill.jpg',
      description: 'Actor known for "Modern Family" and "Married... with Children"',
      correctAnswers: ['ed o’neill', 'ed oneill', 'ed'],
    },
];


const currentGame = gamesData[tries % gamesData.length];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


const normalizeString = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]/g, '').trim();

const handleGuess =async (userGuess) => {
  const normalizedGuess = normalizeString(userGuess);
  const isCorrect = currentGame.correctAnswers.some((answer) =>
    normalizeString(answer).includes(normalizedGuess)
  );


  if (tries < 10) {
    setGuess(userGuess);
   
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setResult('Correct! 🎉');
    } else {
      setResult(`Incorrect! The correct answer was: ${currentGame.correctAnswers[0]}`);
    }
    //await sleep(2000);
    setTries((prevTries) => prevTries + 1);
   

  }
};

const restartGame = () => {
  setScore(0);
  setTries(0);
  setGuess('');
  setResult('');
};

const guessForm = useForm(
  {
    fields: [
      {
        type: 'string',
        name: 'guess',
        label: 'Your Guess',
        placeholder: 'Enter your guess here',
      },
    ],
  },
  (values) => {
    handleGuess(values.guess);
  }
);

const isNarrow = context.dimensions?.width < 500;

return (
  <vstack gap="medium" alignment="center middle">
    {/* Score Section */}
    <hstack alignment="middle center" gap="medium" padding="medium">
      <text size="large">Score:</text>
      <text size="large">{score}</text>
      <text size="large">Tries:</text>
      <text size="large">{tries}/10</text>
    </hstack>

    {/* Game Layout: Responsive based on width */}
    {isNarrow ? (
      <vstack alignment="center middle" gap="large" padding="medium">
        {/* Image Section */}
        <image
          url={currentGame.imageUrl}
          description={currentGame.description}
          height="100px"
          width="100px"
          borderRadius="20%"
          resizeMode="blur"
        />

        {/* Guess Input Section */}
        {tries < 10 && <text size="medium">Guess the Celeb!</text>}
        <button
          appearance="secondary"
          onPress={() => {
            if (tries < 10) {
              context.ui.showForm(guessForm);
            } else {
              setResult('Game Over! Restart to play again.');
            }
          }}
        >
          Enter Your Guess
        </button>
        {result && (
          <text size="medium" color={result === 'Correct! 🎉' ? 'green' : 'red'}>
            {result}
          </text>
        )}
        {tries >= 10 && (
          <text size="medium" color="blue" alignment="center middle">
            Game Over! Your score is {score} out of 10.
          </text>
        )}
      </vstack>
    ) : (
      <hstack alignment="center middle" gap="large" padding="medium">
        {/* Image Section */}
        <image
          url={currentGame.imageUrl}
          description={currentGame.description}
          height="300px"
          width="300px"
          borderRadius="20%"
        />

        {/* Guess Input Section */}
        <vstack gap="medium" alignment="center middle">
          <text size="large">Guess the image!</text>
          <button
            appearance="secondary"
            onPress={() => {
              if (tries < 10) {
                context.ui.showForm(guessForm);
              } else {
                setResult('Game Over! Restart to play again.');
              }
            }}
          >
            Enter Your Guess
          </button>
          {result && (
            <text size="medium" color={result === 'Correct! 🎉' ? 'green' : 'red'}>
              {result}
            </text>
          )}
          {tries >= 10 && (
            <text size="large" color="blue" alignment="center middle">
              Game Over! Your score is {score} out of 10.
            </text>
          )}
        </vstack>
      </hstack>
    )}
    {/* Restart Button */}
    <button appearance="primary" onPress={restartGame}>
      Restart Game
    </button>
  </vstack>
);
};

export default Devvit;