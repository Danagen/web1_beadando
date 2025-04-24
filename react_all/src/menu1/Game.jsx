
import React, { useState } from 'react';

export default function Game() {
  const [target] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  const handleGuess = () => {
    const num = parseInt(guess, 10);
    if (num === target) setMessage('Gratulálok, eltaláltad!');
    else if (num < target) setMessage('Túl alacsony!');
    else setMessage('Túl magas!');
  };

  return (
    <div>
      <h2>Számkitalálós játék</h2>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button onClick={handleGuess}>Tippelés</button>
      <p>{message}</p>
    </div>
  );
}
