import { Devvit, useState } from '@devvit/public-api';

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
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState('');

  const gamesData = [
    {
      imageUrl: 'Ts.png',
      description: 'logo',
      options: ['Option A', 'Option B', 'Option C'],
      correctAnswer: 'Option B',
    },
  ];

  const currentGame = gamesData[0];

  const handleGuess = (userGuess) => {
    setGuess(userGuess);
    if (userGuess === currentGame.correctAnswer) {
      setResult('Correct! 🎉');
      setScore(score + 1);
    } else {
      setResult('Try again!');
    }
  };

  const isNarrow = context.dimensions?.width < 500;

  return (
    <vstack gap="medium" alignment="center middle">
      {/* Score Section */}
      <hstack alignment="middle center" gap="medium" padding="medium">
        <text size="large">
          Score:
        </text>
        <text size="large">
          {score}
        </text>
      </hstack>

      {/* Game Layout: Responsive based on width */}
      {isNarrow ? (
        <vstack alignment="center middle" gap="large" padding="medium">
          {/* Image Section */}
          <image
            url={currentGame.imageUrl}
            description={currentGame.description}
            height="200px"
            width="200px"
            borderRadius="20%"
          />

          {/* Options Section */}
          <vstack gap="medium" alignment="center middle">
            <text size="large">Guess the image!</text>
            {currentGame.options.map((option) => (
              <button
                key={option}
                appearance="secondary"
                onPress={() => handleGuess(option)}
              >
                {option}
              </button>
            ))}
            {result && (
              <text size="medium" color={result === 'Correct! 🎉' ? 'green' : 'red'}>
                {result}
              </text>
            )}
          </vstack>
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

          {/* Options Section */}
          <vstack gap="medium" alignment="center middle">
            <text size="large">Guess the image!</text>
            {currentGame.options.map((option) => (
              <button
                key={option}
                appearance="secondary"
                onPress={() => handleGuess(option)}
              >
                {option}
              </button>
            ))}
            {result && (
              <text size="medium" color={result === 'Correct! 🎉' ? 'green' : 'red'}>
                {result}
              </text>
            )}
          </vstack>
        </hstack>
      )}
    </vstack>
  );
};

export default Devvit;